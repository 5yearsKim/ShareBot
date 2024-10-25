import os
from dotenv import load_dotenv
load_dotenv()

STAGE: str = os.getenv('STAGE', 'dev')

QDRANT_URL: str = os.getenv('QDRANT_URL', 'http://localhost:6333')

QDRANT_NAMESPACE = 'sharebot_prod' if STAGE == 'prod' else 'sharebot_dev'

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY', '')
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY', '')

PORT= 6010 if STAGE == 'prod' else 6020