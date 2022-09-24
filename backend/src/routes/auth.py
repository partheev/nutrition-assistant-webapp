from flask import Blueprint, request
from src.middleware.jwt import encode_auth_token
from src.middleware.jwt import token_required
from src.config.db import conn
from src.config.firebase import verifyGoogleAccessToken
from src.utils import calorieCalculator
import ibm_db

auth = Blueprint('auth', __name__, url_prefix='/api/auth')


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

        sql = "SELECT * FROM users WHERE email = ?"

        stmt = ibm_db.prepare(conn, sql)
        ibm_db.bind_param(stmt, 1, email)
        ibm_db.execute(stmt)

        user = ibm_db.fetch_assoc(stmt)

        if user is False:
            return {
                'msg': 'Email not registered. Please signup.'
            }, 404

        if user.get('LOGIN_PASSWORD', None) is None:
            return {
                'msg': 'Please sign in using google account'
            }, 400
        if password != user['LOGIN_PASSWORD']:
            return {
                'msg': 'Invalid credentials'
            }, 400

        token = encode_auth_token(user_id=user.get('ID'))

        if token is None:
            return {
                "msg": "Something went wrong. Try again"
            }, 500

        del user['LOGIN_PASSWORD']

        if user.get('IS_LOGIN_PROCESS_COMPLETE'):

            maxCalories = calorieCalculator(
                w=user['WEIGHT'], h=user['HEIGHT'], age=user['AGE'], gender=user['GENDER'], activity=user['ACTIVITY'])

            return {
                'user': user,
                'token': token,
                'maxCalories': maxCalories
            }
        else:
            return {
                'user': user,
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

        finduser_stmt = ibm_db.prepare(
            conn, 'SELECT * FROM USERS WHERE EMAIL = ?')
        ibm_db.bind_param(finduser_stmt, 1, email)
        ibm_db.execute(finduser_stmt)
        if ibm_db.fetch_assoc(finduser_stmt) is not False:
            return{
                'msg': 'User already exist'
            }, 400

        sql = "SELECT * FROM NEW TABLE(INSERT INTO users (username,email,login_password,is_login_process_complete) VALUES ( ?, ? ,?,false))"
        stmt = ibm_db.prepare(conn, sql)
        ibm_db.bind_param(stmt, 1, username)
        ibm_db.bind_param(stmt, 2, email)
        ibm_db.bind_param(stmt, 3, password)
        ibm_db.execute(stmt)

        user = ibm_db.fetch_assoc(stmt)
        token = encode_auth_token(user_id=user.get('ID'))
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

        stmt = ibm_db.prepare(conn, 'SELECT * FROM USERS WHERE EMAIL=?')
        ibm_db.bind_param(stmt, 1, email)
        ibm_db.execute(stmt)
        user = ibm_db.fetch_assoc(stmt)

        if not user:
            sql = "SELECT * FROM NEW TABLE(INSERT INTO users (username,email,is_login_process_complete) VALUES ( ?, ? ,false))"
            newuser_stmt = ibm_db.prepare(conn, sql)
            ibm_db.bind_param(newuser_stmt, 1, name)
            ibm_db.bind_param(newuser_stmt, 2, email)
            ibm_db.execute(newuser_stmt)
            newuser = ibm_db.fetch_assoc(newuser_stmt)
            del newuser['LOGIN_PASSWORD']
            token = encode_auth_token(user_id=newuser.get('ID'))
            if token is None:
                return {
                    "msg": "Something went wrong. Try again"
                }, 500

            return {"token": token,
                    "user": newuser}

        else:
            del user['LOGIN_PASSWORD']
            token = encode_auth_token(user_id=user.get('ID'))
            if token is None:
                return {
                    "msg": "Something went wrong. Try again"
                }, 500

            if user.get('IS_LOGIN_PROCESS_COMPLETE'):

                maxCalories = calorieCalculator(
                    w=user['WEIGHT'], h=user['HEIGHT'], age=user['AGE'], gender=user['GENDER'], activity=user['ACTIVITY'])

                return {
                    'user': user,
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

        height = data.get('height')
        weight = data.get('weight')
        age = data.get('age')
        gender = data.get('gender')
        activity = data.get('activity')

        if height is None or weight is None or age is None or gender is None or activity is None:
            return{
                'msg': 'Invalid data. Required data [height,weight,age,gender,activity]'
            }, 400

        stmt = ibm_db.prepare(
            conn, 'UPDATE users SET (height,weight,age,IS_LOGIN_PROCESS_COMPLETE,GENDER,ACTIVITY) = (?,?,?,?,?,?) WHERE id = ?')

        ibm_db.bind_param(stmt, 1, height)
        ibm_db.bind_param(stmt, 2, weight)
        ibm_db.bind_param(stmt, 3, age)
        ibm_db.bind_param(stmt, 4, True)
        ibm_db.bind_param(stmt, 5, gender)
        ibm_db.bind_param(stmt, 6, activity)
        ibm_db.bind_param(stmt, 7, current_user.get('ID'))

        ibm_db.execute(stmt)

        user_stmt = ibm_db.prepare(conn, 'SELECT * FROM USERS WHERE ID = ?')
        ibm_db.bind_param(user_stmt, 1, current_user.get('ID'))
        ibm_db.execute(user_stmt)

        userInfo = ibm_db.fetch_assoc(user_stmt)
        del userInfo['LOGIN_PASSWORD']

        maxCalories = calorieCalculator(
            w=weight, h=height, age=age, gender=gender, activity=activity)

        return{
            'msg': 'User info updated',
            'userInfo': userInfo,
            'maxCalories': maxCalories
        }

    except:
        return{
            'msg': 'Something went wrong. Try again'
        }, 500
