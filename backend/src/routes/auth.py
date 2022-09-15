from flask import Blueprint

auth = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth.post('/login')
def login():
    return{
        'message': 'User logged in'
    }


@auth.post('/signup')
def signup():
    return {
        'message': 'User signed up'
    }
