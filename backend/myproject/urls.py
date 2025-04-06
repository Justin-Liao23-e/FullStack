from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Django's own admin interface
    path('admin/', admin.site.urls),
    # Include our app's URLs under the prefix /api/
    path('api/', include('myapp.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)