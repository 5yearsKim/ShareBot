import argparse
from dotenv import load_dotenv
from qdrant_client import QdrantClient 
from qdrant_client.http.models import Distance, VectorParams
import os

def create_qdrant_collection(collection_name):
    # Load environment variables
    load_dotenv()
    
    # Retrieve Qdrant URL from environment
    qdrant_url = os.getenv('QDRANT_URL')
    print('Qdrant host:', qdrant_url)
    
    # Initialize Qdrant client
    client = QdrantClient(url=qdrant_url)
    
    # Create the collection
    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
    )
    print(f'Collection "{collection_name}" created successfully.')

def main():
    # Set up argument parsing
    parser = argparse.ArgumentParser(description='Create a Qdrant collection.')
    parser.add_argument('collection_name', type=str, help='The name of the collection to create')
    
    # Parse arguments
    args = parser.parse_args()
    
    # Create the collection with the provided name
    create_qdrant_collection(args.collection_name)

if __name__ == "__main__":
    main()
