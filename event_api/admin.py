from django.contrib import admin
from .models import EventModel


class EventAdmin(admin.ModelAdmin):
    list_display = ('owner', 'date', 'workType', 'workTime')


admin.site.register(EventModel, EventAdmin)
