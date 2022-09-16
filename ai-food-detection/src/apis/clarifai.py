
from flask import Blueprint, request, current_app
from src.config.ibm_cos import cos
import uuid
import os
from ibm_s3transfer.aspera.manager import AsperaTransferManager

clarifai = Blueprint('clarifai', __name__, url_prefix='/api/clarifai')


@clarifai.post('/detect-food')
def detectFood():
    if not request.files:
        return{
            'msg': 'Please send image file with [name=foodImage]'
        }, 400

    image = request.files.get('foodImage')
    filename = str(uuid.uuid4())
    filepath = os.path.join(current_app.config.get('IMAGE_UPLOADS')+filename)
    image.save(filepath)

    print('image', filepath)
    with AsperaTransferManager(cos) as transfer_manager:

        # Get object with Aspera
        future = transfer_manager.download(filepath, 'nutrition-app', filename)

        # Wait for download to complete
        future.result()
    up = cos.upload_file(Filename=filepath,
                         Bucket='nutrition-app', Key=filename)
    print(up)
    return 'ok'
