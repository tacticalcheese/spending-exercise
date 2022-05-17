# Generated by Django 3.2.13 on 2022-05-16 08:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spendings', '0006_auto_20220516_1022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spending',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='spending',
            name='spent_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 16, 10, 50, 37, 481079), verbose_name='Time spent'),
        ),
    ]