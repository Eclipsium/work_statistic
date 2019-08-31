from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView

from event_api.models import *


class GetYearStats(APIView):

    def get(self, request):
        year = request.GET.get('year')
        month_dict = {
            1: 'Январь',
            2: 'Февраль',
            3: 'Март',
            4: 'Апрель',
            5: 'Май',
            6: 'Июнь',
            7: 'Июль',
            8: 'Август',
            9: 'Сентябрь',
            10: 'Октябрь',
            11: 'Ноябрь',
            12: 'Декабрь'
        }
        events = EventModel.objects.filter(Q(date__year=year), Q(owner=request.user))
        stats_work_time = 0
        work_days = 0
        response = {}
        for event in events:
            month = month_dict[event.date.month]

            try:
                response[month]
            except KeyError:
                stats_work_time = 0
                work_days = 0

            stats_work_time += event.workTime
            if event.date.weekday() != 5 and event.date.weekday() != 6:
                work_days += 1
            payload = {
                'work_time': stats_work_time,
                'work_days': work_days
            }
            response[month] = payload
        return Response(response)
