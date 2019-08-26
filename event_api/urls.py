from django.urls import path
from event_api.views import *

urlpatterns = [
    path('list/', EventList.as_view()),
    path('create/', CreateEvent.as_view()),
    path('<int:pk>/', EventDetail.as_view()),

]