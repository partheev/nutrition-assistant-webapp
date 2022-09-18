
from flask import Blueprint, request, current_app
import requests
import os
clarifai = Blueprint('nutrition', __name__, url_prefix='/api/nutrition')

nutritionix_appId = os.environ.get('nutritionix_appId')
nutritionix_key = os.environ.get('nutritionix_key')

CALORIE_ATTRI = {
    'title': 'Calorie',
    'units': 'cal',
    'attri': 208
}


@clarifai.post('/food-nutrients')
def foodNutrients():
    try:
        data = request.json
        food = data.get('food')
        if food is None:
            return{
                'msg': 'Invalid data. request body should contains [food] attributes'
            }, 400

        nutritionResponse = requests.post(' https://trackapi.nutritionix.com/v2/natural/nutrients', json={
        }, headers={'x-app-id': nutritionix_appId, 'x-app-key': nutritionix_key, 'x-remote-user-id': '1'})

        nutrients = nutritionResponse.json()['foods'][0]['full_nutrients']

        return {
            'foodItems': nutrients
        }
    except:
        return {
            'msg': 'Something went wrong. Try again'
        }, 500
