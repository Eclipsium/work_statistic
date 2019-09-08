from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateUserView.as_view()),
    path('get/', GetUserDataView.as_view()),
    path('<int:pk>/', UpdateUser.as_view()),

]
