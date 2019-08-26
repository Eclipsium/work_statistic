from rest_framework import serializers

from .models import EventModel


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventModel
        fields = ('id', 'date', 'workType', 'workTime', 'name')


class EventDetailSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = EventModel
        fields = ('owner', 'date', 'workType', 'workTime', 'name')
