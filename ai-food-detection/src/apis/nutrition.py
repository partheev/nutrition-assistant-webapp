
from flask import Blueprint, request, current_app
import requests
import os
nutrition = Blueprint('nutrition', __name__, url_prefix='/api/nutrition')

nutritionix_appId = os.environ.get('nutritionix_appId')
nutritionix_key = os.environ.get('nutritionix_key')

NUTRI_ATTRI = [{
    'title': 'Calorie',
    'units': 'cal',
    'attri': 208
}, {
    'title': 'Carbohydrates',
    'units': 'g',
    'attri': 205
},
    {
    'title': 'Proteins',
    'units': 'g',
    'attri': 203
},
    {
    'title': 'Iron',
    'units': 'mg',
    'attri': 303
},
    {
    'title': 'Cholesterol',
    'units': 'mg',
    'attri': 601
},
    {
    'title': 'Fiber',
    'units': 'mg',
    'attri': 291
},
    {
    'title': 'Calcium',
    'units': 'mg',
    'attri': 301
},
    {
    'title': 'Fat',
    'units': 'g',
    'attri': 204
},

]


@nutrition.post('/food-nutrients')
def foodNutrients():
    try:
        data = request.json
        food = data.get('food')
        if food is None:
            return{
                'msg': 'Invalid data. request body should contains [food] attributes'
            }, 400

        nutritionResponse = requests.post('https://trackapi.nutritionix.com/v2/natural/nutrients', json={
            'query': food
        }, headers={'x-app-id': nutritionix_appId, 'x-app-key': nutritionix_key, 'x-remote-user-id': '1'})

        nutrientsList = nutritionResponse.json()['foods'][0]['full_nutrients']
        requiredNutrients = []
        for nutri in nutrientsList:
            for req in NUTRI_ATTRI:
                if req.get('attri') == nutri.get('attr_id'):
                    requiredNutrients.append({
                        'attri_id': nutri.get('attr_id'),
                        'title': req.get('title'),
                        'units': req.get('units'),
                        'value': nutri.get('value')
                    })
                    break

        return {
            'nutrients': requiredNutrients
        }
    except Exception as e:
        print(e)
        return {
            'msg': 'Something went wrong. Try again'
        }, 500
