from flask import Blueprint, request, current_app
import uuid
import os
import ibm_db
import requests
from src.utils import getFileStorageURL
from src.config.db import conn
from src.middleware.jwt import token_required
from src.constants import AI_SERVICE_ENDPOINT
from src.config.firebase import upload_image_to_firebase
food = Blueprint('food', __name__, url_prefix='/api/food')


@food.post('/capture-food')
# @token_required
def capture_food():
    try:

        if not request.files:
            return{
                'msg': 'Please send image file with [name=foodImage]'
            }, 400
        image = request.files.get('foodImage')
        ext = image.filename.split(".")[-1]
        filename = str(uuid.uuid4()) + '.'+ext

        filepath = os.path.join(
            str(current_app.config.get('IMAGE_UPLOADS')), filename)
        image.save(filepath)

        # Upload image to ibm object storage and get image public url
        upload_image_to_firebase(filename, filepath)
        # send image url to identify food item using ai food detection service
        image_url = getFileStorageURL(filename)
        foodItemsResponse = requests.post(AI_SERVICE_ENDPOINT+'/clarifai/detect-food', json={
            'image_url': image_url
        })

        foodItems = foodItemsResponse.json()['foodItems']

        # return identified food items

        if os.path.exists(filepath):
            os.remove(filepath)
        return {
            'image_url': image_url,
            'foodItems': foodItems
        }
    except:
        if os.path.exists(filepath):
            os.remove(filepath)
        return{
            'msg': 'Something went wrong'
        }, 500


@food.post('/nutrition-details')
@token_required
def intakeFood(current_user):
    try:
        data = request.json
        food_item = data.get('food_item')
        image_url = data.get('image_url')

        # fetch food item nutrition details using ai service
        nutrientsResponse = requests.post(AI_SERVICE_ENDPOINT+'/nutrition/food-nutrients', json={
            'food': food_item
        })
        nutrients = nutrientsResponse.json().get('nutrients')
        nutriMap = {}
        for nutri in nutrients:
            nutriMap[nutri.get('title')] = nutri.get('value')

        # create food document in db with nutrition details

        sql = "SELECT ID FROM NEW TABLE (INSERT INTO CONSUMED_FOODS (user_id,name,image,calorie,carbohydrates,fat,proteins,calcium) values(?,?,?,?, ?,?,?,?))"

        stmt = ibm_db.prepare(conn, sql)
        ibm_db.bind_param(stmt, 1, current_user.get('ID'))
        ibm_db.bind_param(stmt, 2, food_item)
        ibm_db.bind_param(stmt, 3, image_url)
        ibm_db.bind_param(stmt, 4, nutriMap.get('Calorie'))
        ibm_db.bind_param(stmt, 5, nutriMap.get('Carbohydrates'))
        ibm_db.bind_param(stmt, 6, nutriMap.get('Fat'))
        ibm_db.bind_param(stmt, 7, nutriMap.get('Proteins'))
        ibm_db.bind_param(stmt, 8, nutriMap.get('Calcium'))
        ibm_db.execute(stmt)

        consumedFoodId = ibm_db.fetch_assoc(stmt).get('ID')

        return{
            'consumed_food_id': consumedFoodId,
            'nutrients': nutrients
        }

    except Exception as e:
        print(e)
        return{
            'msg': 'Something went wrong. Try again'
        }, 500


@food.post('/intake')
@token_required
def intake(current_user):
    try:

        data = request.json

        consumed_food_id = data.get('consumed_food_id')

        stmt = ibm_db.prepare(
            conn, 'UPDATE CONSUMED_FOODS SET IS_INTAKE = ? WHERE ID= ?')
        ibm_db.bind_param(stmt, 1, True)
        ibm_db.bind_param(stmt, 2, consumed_food_id)
        ibm_db.execute(stmt)

        return {
            'msg': 'Food intake successful'
        }
    except:
        return{
            'msg': 'Something went wrong'
        }, 500


@food.get('/todays-consumption')
@token_required
def todaysConsumption(current_user):
    sql = 'SELECT * FROM CONSUMED_FOODS WHERE IS_INTAKE = true USER_ID = ? AND current_date  = date(consumed_on)'
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, current_user.get('ID'))
    ibm_db.execute(stmt)

    foodList = []
    totalNutris = {
        'CALORIE': 0,
        'CALCIUM': 0,
        'CARBOHYDRATES': 0,
        'FAT': 0,
        'PROTEINS': 0
    }
    while(True):
        foodItem = ibm_db.fetch_assoc(stmt)
        if foodItem:
            foodList.append(foodItem)
            totalNutris['CALORIE'] += (foodItem.get('CALORIE') or 0)
            totalNutris['CALCIUM'] += (foodItem.get('CALCIUM') or 0)
            totalNutris['CARBOHYDRATES'] += (
                foodItem.get('CARBOHYDRATES') or 0)
            totalNutris['FAT'] += (foodItem.get('FAT') or 0)
            totalNutris['PROTEINS'] += (foodItem.get('PROTEINS') or 0)
        else:
            break

    print(foodList)

    return {
        'total_nutrients': totalNutris,
        'food_items': foodList
    }
