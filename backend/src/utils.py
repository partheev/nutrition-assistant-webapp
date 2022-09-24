
def getFileStorageURL(filename):
    return f'https://firebasestorage.googleapis.com/v0/b/nutricheck-app.appspot.com/o/images%2F{filename}?alt=media'


def calorieCalculator(w, h, age, gender, activity):
    w = w*2.2
    bmr = 0
    if(gender == 'male'):
        bmr = 65 + (6.2 * w) + ((12.7 * h) * w) - (6.8 * age)
    else:
        bmr = 655 + (4.3 * w) + (4.3 * h) - (4.7 * age)
    return int(bmr*activity)
