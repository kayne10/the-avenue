# Generated by Django 2.0.4 on 2018-07-30 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webmanager', '0006_auto_20180712_1839'),
    ]

    operations = [
        migrations.CreateModel(
            name='MultimediaObject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.FileField(blank=True, upload_to='multimedia/images')),
                ('video', models.FileField(blank=True, upload_to='multimedia/videos')),
                ('youtube_url', models.CharField(max_length=355)),
            ],
        ),
        migrations.AlterField(
            model_name='article',
            name='slug',
            field=models.SlugField(unique=True),
        ),
    ]