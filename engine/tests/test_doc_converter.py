from test_utils import set_python_path
set_python_path()

from doc_converter import DocConverter
import requests


doc_conv = DocConverter()

# pdf_url = 'https://nonimos-media.s3.ap-northeast-2.amazonaws.com/dev/sharebot/groups/1/files/user_1_1730042641514.pdf'
# rsp = requests.get(pdf_url)
# pdf_bytes = rsp.content



# doc_conv.pdf_byte2text(pdf_bytes)


pdf_path = '/home/kimhyunw/Downloads/현진건-운수좋은날.pdf'

text = doc_conv.pdf2text(pdf_path)

print(text)