from django.conf.urls import url
from . import views

app_name = 'webmanager'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^blog/$', views.blog, name='blog'),
    url(r'^blog/(?P<slug>[-\w]+)$', views.detail, name='detail'),
    url(r'^blog/(?P<tag>[\w\-]+)/$', views.search_blog_by_tag, name='search'),
    url(r'^episodes/$', views.episodes, name='episodes'),
    url(r'^multimedia/$', views.multimedia, name='multimedia'),
]
