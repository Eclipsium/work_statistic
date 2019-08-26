from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class EventModel(models.Model):
    WORK_TYPE = (
        ('day', 'День'),
        ('night', 'Ночь'),
        ('sleep', 'Отсыпной'),
        ('weekend', 'Выходной'),
        ('reserved', 'Резерв'),
        ('studying', 'Занятия'),
        ('order', 'Наряд'),
        ('rp', 'РП'),
        ('sick', 'Больничный'),
        ('vacation', 'Отпуск'),
    )

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(verbose_name='Дата')
    workType = models.CharField('Тип работы', choices=WORK_TYPE, max_length=15)
    workTime = models.IntegerField('Часы работы', null=True)
    name = models.CharField('Название', max_length=20)

    def __str__(self):
        return str(self.owner) + ' ' + str(self.date)

    class Meta:
        verbose_name = 'Рабочий день'
        verbose_name_plural = 'Рабочие дни'
        unique_together = (("owner", "date"),)
