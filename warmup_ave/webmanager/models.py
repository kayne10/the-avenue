from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.template.defaultfilters import slugify
# import validator for images and tracks

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=250)
    author = models.CharField(max_length=25)
    tags = ArrayField(models.CharField(max_length=50), blank=True, null=True, default=[])
    content = models.TextField(max_length=2000)
    image = models.FileField(blank=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return 'Title: ' + self.title + ' | Author: ' + self.author

    @models.permalink
    def get_absolute_url(self):
        return ('webmanager:detail', (),
                {
                    'slug' :self.slug,
                })

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Article, self).save(*args, **kwargs)


class Track(models.Model):
    name = models.CharField(max_length=100)
    audio_file = models.FileField(upload_to='tracks/')

    def __str__(self):
        return self.name + ' - ' + str(self.audio_file)

class HomeImage(models.Model):
    name = models.CharField(max_length=100)
    image = models.FileField(upload_to='home_slider/', blank=False)

    def __str__(self):
        return self.name + ' - ' + str(self.image)

class MultimediaObject(models.Model):
    name = models.CharField(max_length=100)
    image = models.FileField(upload_to='multimedia/images', blank=True)
    video = models.FileField(upload_to='multimedia/videos', blank=True)
    youtube_url = models.CharField(max_length=355, blank=True)

    def __str__(self):
        return self.name
