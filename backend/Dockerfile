FROM python:3.11-slim as builder
WORKDIR /code
COPY requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install torch==2.0.0 --index-url https://download.pytorch.org/whl/cpu
COPY main.py logging.conf /code/
EXPOSE 5000
ENV INDEX_NAME=pokedex
ENV PINECONE_API_KEY=bf8e0291-0169-4523-a1a0-c7dd6c005948
CMD ["python", "main.py"]