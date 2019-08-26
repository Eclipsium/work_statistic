from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from event_api.serializers import EventDetailSerializer
from work_statistic.permisions import IsOwner
from .models import EventModel

User = get_user_model()


class EventList(APIView):

    def get(self, request):
        result = []
        events = EventModel.objects.filter(owner=request.user.id).order_by('date')
        for event in events:
            result.append({
                'id': event.id,
                'date': event.date,
                'workTime': event.workTime,
                'workType': event.workType,
                'name': event.name
            })
        return Response(result)


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventDetailSerializer
    queryset = EventModel.objects.all()
    permission_classes = (IsOwner,)


class CreateEvent(generics.CreateAPIView):
    serializer_class = EventDetailSerializer
    queryset = EventModel.objects.all()


