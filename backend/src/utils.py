
def getFileStorageURL(filename):
    return f'https://firebasestorage.googleapis.com/v0/b/nutricheck-app.appspot.com/o/images%2F{filename}?alt=media'


def calorieCalculator(w, h, age, gender, activity):
    bmr = 0
    if(gender == 'male'):
        bmr = 66.47 + (13.75 * w) + (5.003 * h) - (6.755 * age)
    else:
        bmr = 655.1 + (9.563 * w) + (1.850 * h) - (4.676 * age)
    return int(bmr*activity)
