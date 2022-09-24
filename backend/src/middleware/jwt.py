import datetime
from functools import wraps
import jwt
from flask import request
from flask import current_app
import ibm_db
from src.config.db import conn


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")
        if len(token) < 2 and not token[1]:
            return {
                "msg": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        token = token[1]
        try:
            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"])

            stmt = ibm_db.prepare(conn, 'SELECT * FROM USERS WHERE ID = ?')
            ibm_db.bind_param(stmt, 1, data.get('user_id'))
            ibm_db.execute(stmt)
            current_user = ibm_db.fetch_assoc(stmt)
            if current_user is False:
                return {
                    "message": "Invalid Authentication token!",
                    "data": None,
                    "error": "Unauthorized"
                }, 401

        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f(current_user, *args, **kwargs)

    return decorated


def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'iat': datetime.datetime.utcnow(),
            'user_id': user_id
        }
        encoded_jwt = jwt.encode(payload, current_app.config.get(
            'SECRET_KEY'), algorithm="HS256")
        return encoded_jwt
    except Exception as e:
        print(e)
        return None
