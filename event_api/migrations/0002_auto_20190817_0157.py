# Generated by Django 2.2.4 on 2019-08-16 18:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('event_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Дата')),
                ('workType', models.CharField(choices=[('day', 'День'), ('night', 'Ночь'), ('sleep', 'Отсыпной'), ('weekend', 'Выходной'), ('reserved', 'Резерв'), ('studying', 'Занятия'), ('order', 'Наряд'), ('rp', 'РП'), ('sick', 'Больничный'), ('vacation', 'Отпуск')], max_length=15, verbose_name='Тип работы')),
                ('workTime', models.IntegerField(verbose_name='Часы работы')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Рабочий день',
                'verbose_name_plural': 'Рабочие дни',
            },
        ),
        migrations.DeleteModel(
            name='Event',
        ),
    ]
