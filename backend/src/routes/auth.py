from flask import Blueprint, request
from src.middleware.jwt import encode_auth_token
from src.middleware.jwt import token_required
from src.config.db import User, session
from src.config.firebase import verifyGoogleAccessToken
from src.utils import calorieCalculator

auth = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth.get('/me')
@token_required
def me(current_user):
    maxCalories = 0
    if current_user.is_login_process_complete:

        maxCalories = calorieCalculator(
            w=current_user.weight, h=current_user.height, age=current_user.age, gender=current_user.gender, activity=current_user.activity)
    return {
        'userInfo': {
            'ID': current_user.id,
            'USERNAME': current_user.username,
            'ACTIVITY': current_user.activity,
            'AGE': current_user.age,
            'EMAIL': current_user.email,
            'GENDER': current_user.gender,
            'HEIGHT': current_user.height,
            'IS_LOGIN_PROCESS_COMPLETE': current_user.is_login_process_complete,
            'WEIGHT': current_user.weight,

        },
        'maxCalories': maxCalories
    }


@auth.post('/login')
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if email is None or password is None:
            return {
                'msg': "Please provide all keys. KEYS=['email','password']"
            }, 400

        user: User = session.query(User).filter(User.email == email).first()

        if user is None:
            return {
                'msg': 'Email not registered. Please signup.'
            }, 404

        if user.login_password is None:
            return {
                'msg': 'Please sign in using google account'
            }, 400
        if password != user.login_password:
            return {
                'msg': 'Invalid credentials'
            }, 400

        token = encode_auth_token(user_id=user.id)

        if token is None:
            return {
                "msg": "Something went wrong. Try again"
            }, 500

        if user.is_login_process_complete:

            maxCalories = calorieCalculator(
                w=user.weight, h=user.height, age=user.age, gender=user.gender, activity=user.activity)

            return {
                'user': {
                    'USERNAME': user.username,
                    'ID': user.id,
                    'EMAIL': user.email,
                    'IS_LOGIN_PROCESS_COMPLETE': user.is_login_process_complete,
                    'WEIGHT': user.weight,
                    'HEIGHT': user.height,
                    'AGE': user.age,
                    'GENDER': user.gender,
                    'ACTIVITY': user.activity
                },
                'token': token,
                'maxCalories': maxCalories
            }
        else:
            return {
                'user': {
                    'USERNAME': user.username,
                    'ID': user.id,
                    'EMAIL': user.email,
                    'IS_LOGIN_PROCESS_COMPLETE': user.is_login_process_complete,
                    'WEIGHT': user.weight,
                    'HEIGHT': user.height,
                    'AGE': user.age,
                    'GENDER': user.gender,
                    'ACTIVITY': user.activity
                },
                'token': token,
            }

    except:
        return {
            'msg': 'Something went wrong'
        }, 500


@auth.post('/signup')
def signup():
    try:
        data = request.json
        username = data['username']
        email = data['email']
        password = data['password']

        user: User = session.query(User).filter(User.email == email).first()

        if user:
            return{
                'msg': 'User already exist'
            }, 400

        newuser = User(username, email, password)
        session.add(newuser)
        session.commit()

        token = encode_auth_token(user_id=newuser.id)
        if token is None:
            return {
                "msg": "Something went wrong. Try again"
            }, 500

        return {"token": token}
    except Exception as e:
        print(e)
        return{
            'msg': 'Something went wrong. Try again'
        }, 500


@auth.post('/google-oauth')
def googleOauth():
    try:

        data = request.json
        accessToken = data.get('accessToken', None)

        if accessToken is None:
            return{
                'msg': 'Please provide "accessToken"'
            }, 400

        info = verifyGoogleAccessToken(accessToken)
        name = info.get('name')
        email = info.get('email')

        user: User = session.query(User).filter(User.email == email).first()

        if user is None:
            newuser = User(name, email)
            session.add(newuser)
            session.commit()

            token = encode_auth_token(user_id=newuser.id)
            if token is None:
                return {
                    "msg": "Something went wrong. Try again"
                }, 500

            return {"token": token,
                    "user": {
                        'USERNAME': newuser.username,
                        'ID': newuser.id,
                        'EMAIL': newuser.email,
                        'IS_LOGIN_PROCESS_COMPLETE': newuser.is_login_process_complete,
                    }}

        else:
            token = encode_auth_token(user_id=user.id)
            if token is None:
                return {
                    "msg": "Something went wrong. Try again"
                }, 500

            if user.is_login_process_complete:

                maxCalories = calorieCalculator(
                    w=user.weight, h=user.height, age=user.age, gender=user.gender, activity=user.activity)

                return {
                    'user': {
                        'USERNAME': user.username,
                        'ID': user.id,
                        'EMAIL': user.email,
                        'IS_LOGIN_PROCESS_COMPLETE': user.is_login_process_complete,
                        'WEIGHT': user.weight,
                        'HEIGHT': user.height,
                        'AGE': user.age,
                        'GENDER': user.gender,
                        'ACTIVITY': user.activity
                    },
                    'token': token,
                    'maxCalories': maxCalories
                }
            else:
                return {
                    'user': user,
                    'token': token,
                }
    except:
        return{
            'msg': 'Something went wrong'
        }, 500


@auth.post('/user-info')
@token_required
def userInfo(current_user):
    try:
        data = request.json

        height = float(data.get('height'))
        weight = float(data.get('weight'))
        age = float(data.get('age'))
        gender = data.get('gender')
        activity = float(data.get('activity'))

        if height is None or weight is None or age is None or gender is None or activity is None:
            return{
                'msg': 'Invalid data. Required data [height,weight,age,gender,activity]'
            }, 400

        user: User = session.query(User).filter(
            User.id == current_user.id).first()
        user.height = height
        user.activity = activity
        user.age = age
        user.weight = weight
        user.gender = gender
        user.is_login_process_complete = True

        session.commit()

        maxCalories = calorieCalculator(
            w=weight, h=height, age=age, gender=gender, activity=activity)

        return{
            'msg': 'User info updated',
            'userInfo': {
                'USERNAME': user.username,
                'ID': user.id,
                'EMAIL': user.email,
                'IS_LOGIN_PROCESS_COMPLETE': user.is_login_process_complete,
                'WEIGHT': user.weight,
                'HEIGHT': user.height,
                'AGE': user.age,
                'GENDER': user.gender,
                'ACTIVITY': user.activity
            },
            'maxCalories': maxCalories
        }

    except TypeError:
        return {
            'msg': 'Invalid data'
        }, 400
    except Exception as e:
        print(e)
        return{
            'msg': 'Something went wrong. Try again'
        }, 500
