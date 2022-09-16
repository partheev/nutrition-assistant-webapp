from ibm_botocore.client import Config
import ibm_boto3
import os

ibm_api_key_id = os.environ.get('apikey')
ibm_service_instance_id = os.environ.get('iam_serviceid_crn')
endpoint_url = os.environ.get('endpoints')
cos = ibm_boto3.client(service_name='s3',
                       ibm_api_key_id=ibm_api_key_id,
                       ibm_service_instance_id=ibm_service_instance_id,
                       config=Config(signature_version='oauth'),
                       endpoint_url=endpoint_url)


for bucket in cos.list_buckets()['Buckets']:
    print(bucket['Name'])
