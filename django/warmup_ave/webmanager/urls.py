from django.conf.urls import url
from . import views

app_name = 'webmanager'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^blog/$', views.blog, name='blog'),
    url(r'^blog/(?P<title>[\w|\W.-]+)/$', views.detail, name='detail'),
    url(r'^episodes/$', views.episodes, name='episodes'),
]
