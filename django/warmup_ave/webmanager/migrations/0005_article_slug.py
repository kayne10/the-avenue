# Generated by Django 2.0.7 on 2018-07-12 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webmanager', '0004_homeimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='slug',
            field=models.SlugField(default='', unique=True),
            preserve_default=False,
        ),
    ]
