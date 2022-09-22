
import os
from flask import Blueprint, request, current_app
import requests
clarifai = Blueprint('clarifai', __name__, url_prefix='/api/clarifai')


@clarifai.post('/detect-food')
def detectFood():
    try:
        data = request.json
        imageUrl = data.get('image_url')
        if imageUrl is None:
            return{
                'msg': 'Invalid data. request body should contains [image_url]'
            }, 400

        foodResponse = requests.post('https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs', json={
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": imageUrl
                        }
                    }
                }
            ]
        }, headers={'Authorization': 'Key '+str(os.environ.get('CLARIFAI_API_KEY'))})
        foodItems = foodResponse.json()['outputs'][0]['data']['concepts']
        return {
            'foodItems': foodItems
        }
    except:
        return {
            'msg': 'Something went wrong. Try again'
        }
