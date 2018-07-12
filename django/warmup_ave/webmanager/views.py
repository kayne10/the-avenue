from django.shortcuts import render, get_object_or_404, redirect
from .models import Article, Track, HomeImage

# Create your views here.
def index(request):
    most_recent_article = Article.objects.all().order_by('-created_at')[0]
    playlist = Track.objects.all()
    slides = HomeImage.objects.all()
    return render(request, 'web/index.html', {
        'article': most_recent_article,
        'playlist': playlist,
        'slides': slides,
    })

def blog(request):
    articles = Article.objects.all().order_by('-created_at')
    return render(request, 'web/blog.html', {'articles': articles})

def detail(request, article_title):
    article = get_object_or_404(Article, title=article_title)
    return render(request, 'web/detail.html', {'article': article})

def episodes(request):
    return render(request, 'web/episodes.html')

# maybe included, maybe not
def multimedia(request):
    return render(request, 'web/multimedia.html')
