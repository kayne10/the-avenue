from django.shortcuts import render, get_object_or_404, redirect
from .models import Article, Track

# Create your views here.
def index(request):
    most_recent_article = Article.objects.all().order_by('-created_at')[:1]
    playlist = Track.objects.all()
    return render(request, 'web/index.html', {
        'article': most_recent_article,
        'playlist': playlist,
    })

def blog(request):
    articles = Article.objects.all().order_by('-created_at')
    return render(request, 'web/blog.html', {'articles': articles})

# maybe included, maybe not
def multimedia(request):
    return render(request, 'web/multimedia.html')
