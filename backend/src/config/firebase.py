import os
import firebase_admin
from firebase_admin import credentials, auth, storage


cred = credentials.Certificate(os.path.abspath('./serviceAccount.json'))
firebase_admin.initialize_app(cred)
bucket = storage.bucket('nutricheck-app.appspot.com')


def upload_image_to_firebase(filename, file_path):
    blob = bucket.blob('images/'+filename)
    blob.upload_from_filename(filename=file_path)


def verifyGoogleAccessToken(token):
    return auth.verify_id_token(token)
