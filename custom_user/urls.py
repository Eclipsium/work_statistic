from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateUserView.as_view()),
]
