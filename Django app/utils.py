# In utils.py of your Django app

from django.contrib.auth import authenticate, login

def authenticate_user(request, email, password):
    user = authenticate(request, email=email, password=password)
    if user:
        login(request, user)
        return user
    return None
