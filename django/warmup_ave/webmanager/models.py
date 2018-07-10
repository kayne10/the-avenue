from django.db import models
# import validator for images and tracks

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=250)
    author = models.CharField(max_length=25)
    # tags = ArrayField(models.CharField(max_length=10), blank=True, null=True, default=[])
    content = models.TextField(max_length=2000)
    image = models.FileField(blank=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Title: ' + self.title + ' | Author: ' + self.author


class Track(models.Model):
    name = models.CharField(max_length=100)
    audio_file = models.FileField(upload_to='tracks/')

    def __str__(self):
        return self.name
