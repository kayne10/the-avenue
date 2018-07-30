from django.contrib import admin
from .models import Article, Track, HomeImage, MultimediaObject

# Register your models here.
admin.site.register(Article)
admin.site.register(Track)
admin.site.register(HomeImage)
admin.site.register(MultimediaObject)

admin.site.site_header = 'Warm Up Avenue'
