from django.urls import path
from .views import *

urlpatterns = [
    path('year/', GetYearStats.as_view()),
    # path('create/', CreateEvent.as_view()),
    # path('<int:pk>/', EventDetail.as_view()),

]