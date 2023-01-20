import datetime
from datetime import date, timedelta
from typing import List
from flask import Blueprint, request, current_app
import uuid
import os
import requests
from sqlalchemy import func
from src.utils import getFileStorageURL
from src.config.db import ConsumedFood, session
from src.middleware.jwt import token_required
from src.constants import AI_SERVICE_ENDPOINT, DAY_OF_WEEK
from src.config.firebase import upload_image_to_firebase
food = Blueprint('food', __name__, url_prefix='/api/food')


@food.post('/capture-food')
@token_required
def capture_food(current_user):
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
    except Exception as e:
        if os.path.exists(filepath):
            os.remove(filepath)
        return{

            'msg': 'Something went wrong',
            'error': str(e)
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
        consumedFood = ConsumedFood(user_id=current_user.id, name=food_item, calcium=nutriMap.get('Calcium'), calorie=nutriMap.get(
            'Calorie'), carbohydrates=nutriMap.get('Carbohydrates'), proteins=nutriMap.get('Proteins'), fat=nutriMap.get('Fat'), image=image_url)
        session.add(consumedFood)
        session.commit()
        consumedFoodId = consumedFood.id

        return{
            'consumed_food_id': consumedFoodId,
            'nutrients': nutrients
        }

    except Exception as e:
        print(e)
        return{
            'msg': 'Something went wrong. Try again'
        }, 500


@ food.post('/intake')
@ token_required
def intake(current_user):
    try:

        data = request.json

        consumed_food_id = data.get('consumed_food_id')

        session.query(ConsumedFood).filter(ConsumedFood.id == consumed_food_id).update({
            ConsumedFood.is_intake: True
        })
        session.commit()

        return {
            'msg': 'Food intake successful'
        }
    except:
        return{
            'msg': 'Something went wrong'
        }, 500


@ food.get('/todays-consumption')
@ token_required
def todaysConsumption(current_user):
    foodItems: List[ConsumedFood] = session.query(
        ConsumedFood
    ).filter(
        ConsumedFood.user_id == current_user.id,
        ConsumedFood.is_intake == True,
        func.DATE(ConsumedFood.consumed_on) == date.today()
    ).all()
    foodList = []
    totalNutris = {
        'CALORIE': 0,
        'CALCIUM': 0,
        'CARBOHYDRATES': 0,
        'FAT': 0,
        'PROTEINS': 0
    }

    for foodItem in foodItems:
        if foodItem:
            foodList.append({
                'ID': foodItem.id,
                'USER_ID': foodItem.user_id,
                'NAME': foodItem.name,
                'IMAGE': foodItem.image,
                'CALORIE': foodItem.calorie,
                'CARBOHYDRATES': foodItem.carbohydrates,
                'FAT': foodItem.fat,
                'PROTEINS': foodItem.proteins,
                'CALCIUM': foodItem.calcium,
                'IS_INTAKE': foodItem.is_intake,
                'CONSUMED_ON': foodItem.consumed_on
            })
            totalNutris['CALORIE'] += (foodItem.calorie or 0)
            totalNutris['CALCIUM'] += (foodItem.calcium or 0)
            totalNutris['CARBOHYDRATES'] += (
                foodItem.carbohydrates or 0)
            totalNutris['FAT'] += (foodItem.fat or 0)
            totalNutris['PROTEINS'] += (foodItem.proteins or 0)
        else:
            break

    return {
        'total_nutrients': totalNutris,
        'food_items': foodList
    }


@ food.get('/last-week-nutrition-details')
@ token_required
def lastWeek(current_user):
    sql = 'SELECT date(consumed_on) as consumed_on,dayname(date(consumed_on)) as day, sum(calorie) as calories  FROM CONSUMED_FOODS WHERE IS_INTAKE = ? and USER_ID = ? AND (consumed_on > current date - 7 days) group by date(consumed_on) limit 7'
    weeks = session.query(func.DATE(ConsumedFood.consumed_on).label('consumed_on'),
                          func.extract(
        'dow',func.DATE( ConsumedFood.consumed_on)).label('day'),
        func.sum(ConsumedFood.calorie).label('calories')
    ).filter(
        ConsumedFood.is_intake == True,
        ConsumedFood.user_id == current_user.id,
        ConsumedFood.consumed_on > (date.today()-timedelta(days=7))
    ).group_by(
        func.DATE(ConsumedFood.consumed_on)
    ).limit(7)

    weekData = []
    for week in weeks:
        weekData.append({
            'CONSUMED_ON': week.consumed_on,
            'DAY': DAY_OF_WEEK.get(int(week.day)),
            'CALORIES': week.calories,
        })

    return {
        'weekData': weekData
    }


@ food.post('/consumption-on')
@ token_required
def consumptionOn(current_user):
    try:

        data = request.json
        consumed_on = data.get('consumed_on', None)
        if consumed_on is None:
            return{
                'msg': 'Invalid data. [consumed_on] field missing'
            }, 400

        foodsData: List[ConsumedFood] = session.query(ConsumedFood).filter(func.DATE(ConsumedFood.consumed_on) == datetime.date.fromtimestamp(
            int(consumed_on)/1000.0), ConsumedFood.user_id == current_user.id, ConsumedFood.is_intake == True).all()

        foods = []

        for food in foodsData:
            foods.append({
                'ID': food.id,
                'CALCIUM': food.calcium,
                'CALORIE': food.calorie,
                'CARBOHYDRATES': food.carbohydrates,
                'FAT': food.fat,
                'CONSUMED_ON': food.consumed_on,
                'IMAGE': food.image,
                'IS_INTAKE': food.is_intake,
                'PROTEINS': food.proteins,
                'NAME': food.name,
            })

        return {
            'food_items': foods
        }
    except Exception as e:
        return{
            'msg': 'Something went wrong',
            'error': str(e)
        }, 500
