from django.contrib import admin
from .models import Article, Track

# Register your models here.
admin.site.register(Article)
admin.site.register(Track)
admin.site.site_header = 'Warm Up Avenue'
