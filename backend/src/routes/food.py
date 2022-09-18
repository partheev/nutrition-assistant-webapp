from flask import Blueprint, request, current_app
import uuid
import os
import ibm_boto3
from src.config.ibm_cos import cos
from src.middleware.jwt import token_required
food = Blueprint('food', __name__, url_prefix='/api/food')


@food.get('/capture-food')
# @token_required
def capture_food():
    if not request.files:
        return{
            'msg': 'Please send image file with [name=foodImage]'
        }, 400
    image = request.files.get('foodImage')
    filename = str(uuid.uuid4())

    filepath = os.path.join(
        str(current_app.config.get('IMAGE_UPLOADS')), filename)
    dst = image.save(filepath)

    print('image', filepath)
    s3 = ibm_boto3.resource('s3')
    bucket = s3.Bucket('nutrition-app')
    print(bucket)

    up = bucket.upload_fileobj(image,
                               'nutrition-app', filename)
    # print(up)
    return 'ok'
