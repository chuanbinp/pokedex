# Pokedex Demo: CLIP + Vector Database Search

This repository is a demo for the concepts covered in my presentation, [*Vector DBs Powering the AI Revolution*](./presentation_slides.pdf). It shows how CLIP can map text and images into the same embedding space via contrastive pre-training, and how a vector database can retrieve semantically similar results.   
The concept of contrastive pretraining in CLIP is conceptually similar to Siamese Networks in that both learn to bring matching samples closer in a shared embedding space while pushing non-matching samples apart.

## Overview

https://github.com/user-attachments/assets/e1a8b39b-b0a3-4a94-8968-81cefeb1a694 

In this demo, Pokémon images and text queries are embedded into vectors to support:

- Semantic search (`monster`, `cute`)
- Concept-based search (`dragon`, `lizard`, `squishy`, `kungfu`)
- Exact-name lookup (`Squirtle`, `Hitmonchan`)
- Image similarity search

## What It Demonstrates

- Multimodal embeddings with CLIP (contrastive pre-training)
- Similarity search with cosine similarity
- Vector indexing and retrieval
- Zero-shot text-to-image search

## How It Works

1. Encode Pokémon images with CLIP.
2. Store image embeddings in a vector database.
3. Encode a text or image query into the same vector space.
4. Retrieve the top-k most similar results.

## Flow

```text
Text Query / Image Query
          |
          v
      CLIP Encoder
          |
          v
   Query Embedding
          |
          v
    Vector Database
          |
          v
   Top-K Similar Results
```

## Demo Scenarios

- Semantic search
- Text representation search
- Exact text search
- Image search

## Key Takeaways

- CLIP model allows us to map image and text to the same vector space (multi-modality)
- CLIP model is excellent at zero-shot learning
- VectorDB allows us to store & index embeddings which allows us to quickly search for closest vectors
