from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import pinecone
from PIL import Image
from transformers import CLIPProcessor, CLIPTokenizer, CLIPModel
import logging
import io
import os

INDEX_NAME = os.getenv("INDEX_NAME")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
TOP_K=10

logging.config.fileConfig('logging.conf', disable_existing_loggers=False)
logger = logging.getLogger(__name__)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def setup_pinecone():
    pinecone.init(api_key=PINECONE_API_KEY, environment="gcp-starter")
    logger.info(f"Connected to Pinecone Vector Db: {INDEX_NAME}")
    return pinecone.Index(INDEX_NAME)

def setup_device():
    # device = 'cuda' if torch.cuda.is_available() else 'cpu'
    # logger.info(f"Device: {device}")
    # return device
    return 'cpu'

def load_model(device, model_id="openai/clip-vit-base-patch32"):
    # Save the model to device
    model = CLIPModel.from_pretrained(model_id).to(device)
    # Get the processor
    processor = CLIPProcessor.from_pretrained(model_id)
    # Get the tokenizer
    tokenizer = CLIPTokenizer.from_pretrained(model_id)
    # Return model, processor & tokenizer
    logger.info(f"Loaded CLIP model, tokenizer and processer")
    return model, processor, tokenizer

device = setup_device()
model, processor, tokenizer = load_model(device)
pinecone_index = setup_pinecone()

def generate_image_embedding(input_image):
  image = processor(
      text=None,
      images=input_image,
      return_tensors='pt'
  )['pixel_values'].to(device)

  return model.get_image_features(image).cpu().detach().numpy().tolist()[0]

def generate_text_embedding(input_text):
  inputs = tokenizer(input_text, return_tensors = "pt").to(device)
  return model.get_text_features(**inputs).cpu().detach().numpy().tolist()[0]

def search_with_text(text):
    # Generate query text embedding
    query_text_embedding = generate_text_embedding(text)
    # Run the text query
    filter_results = pinecone_index.query(query_text_embedding, 
                                          filter={
                                             "name": {"$eq": text}
                                             },
                                            top_k=TOP_K,
                                            include_metadata=True).to_dict()
    # Run the image query
    image_results = pinecone_index.query(query_text_embedding, top_k=TOP_K, include_metadata=True).to_dict()
    # Consolidate results - if can find exact text, ensure it is top result
    results = []
    repeat = False
    for match in filter_results['matches']:
       name = match['metadata']['name']
       logger.info(name)
       if(name==text):
           repeat = True
           results.append(match)
           results.extend(list( filter(lambda x: x['metadata']['name'] != text, image_results['matches'])))
           break
    if(not repeat):
       results = image_results['matches']
    return results

def search_with_id(id):
    return pinecone_index.fetch(ids=[id]).to_dict()['vectors'][id]

def search_with_image(image):
    # Generate query image embedding
    query_image_embedding = generate_image_embedding(image)
    # Run the query
    return pinecone_index.query(query_image_embedding, top_k=TOP_K, include_metadata=True).to_dict()['matches']


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/pokedex")
def search_by_text(text: str=None, id: str=None):
    if(text):
        text = text.lower().strip()
        logger.info(f"Search by text: {text}")
        return search_with_text(text)
    elif(id):
        id = id.lower().strip()
        logger.info(f"Search by id: {id}")
        return search_with_id(id)
    else:
        return []
    
@app.post("/api/pokedex")
async def search_by_image(file: UploadFile= File(...)):
    logger.info(f"Search by image: {file.filename}")
    file_content = await file.read()
    image = Image.open(io.BytesIO(file_content))
    return search_with_image(image)

@app.get("/.well-known/pki-validation/{file_path:path}")
async def read_file(file_path: str):
    return FileResponse(path=file_path, filename=file_path, media_type='text/csv')

if __name__ == "__main__":
    uvicorn.run(
               app,
               host="0.0.0.0",
               port=5000
)