from ibm_botocore.client import Config
import ibm_boto3
import os

ibm_api_key_id = os.environ.get('apikey')
ibm_service_instance_id = os.environ.get('resource_instance_id')
endpoint_url = os.environ.get('endpoints')
print(ibm_api_key_id, ibm_service_instance_id, endpoint_url)
cos = ibm_boto3.client(service_name='s3',
                       ibm_api_key_id=ibm_api_key_id,
                       ibm_service_instance_id=ibm_service_instance_id,
                       config=Config(signature_version='oauth'),
                       endpoint_url=endpoint_url)

print('cos connected')
