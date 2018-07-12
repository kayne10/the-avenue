from django.shortcuts import render, get_object_or_404, redirect
from .models import Article, Track, HomeImage
from django.db.models import Q


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

def search_blog_by_tag(request, tag):
    articles = Article.objects.filter(Q(tags__icontains=tag)).distinct().order_by('-id')
    return render(request, 'web/search.html', {'articles': articles, 'result': tag})

def detail(request, slug):
    article = get_object_or_404(Article, slug=slug)
    return render(request, 'web/detail.html', {'article': article})

def episodes(request):
    return render(request, 'web/episodes.html')

# maybe included, maybe not
def multimedia(request):
    return render(request, 'web/multimedia.html')
