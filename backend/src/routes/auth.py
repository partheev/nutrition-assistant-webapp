from flask import Blueprint, request
from src.middleware.jwt import encode_auth_token
from src.middleware.jwt import token_required
from src.config.db import conn
import ibm_db

auth = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth.get('/me')
@token_required
def me(current_user):
    return current_user


@auth.post('/login')
def login():
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
    return {
        'user': user,
        'token': token
    }


@auth.post('/signup')
def signup():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']
    print(data)
    sql = "INSERT INTO users (username,email,login_password,is_login_process_complete) VALUES ( ?, ? ,?,false)"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, username)
    ibm_db.bind_param(stmt, 2, email)
    ibm_db.bind_param(stmt, 3, password)
    ibm_db.execute(stmt)
    print('data:', ibm_db.fetch_assoc(stmt))
    token = encode_auth_token(user_id=1)
    if token is None:
        return {
            "msg": "Something went wrong. Try again"
        }, 500

    return {"result": token}


@auth.post('/user-info')
@token_required
def userInfo(current_user):
    try:
        data = request.json

        height = data.get('height')
        weight = data.get('weight')
        age = data.get('age')

        stmt = ibm_db.prepare(
            conn, 'UPDATE users SET (height,weight,age,is) = (?,?,?) WHERE id = ?')

        ibm_db.bind_param(stmt, 1, height)
        ibm_db.bind_param(stmt, 2, weight)
        ibm_db.bind_param(stmt, 3, age)
        ibm_db.bind_param(stmt, 4, current_user.get('id'))

        ibm_db.execute(stmt)

        return{
            'msg': 'User info updated'
        }

    except:
        return{
            'msg': 'Something went wrong. Try again'
        }, 500
