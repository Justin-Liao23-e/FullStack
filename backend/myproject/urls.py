from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Django's own admin interface
    path('admin/', admin.site.urls),
    # Include our app's URLs under the prefix /api/
    path('api/', include('myapp.urls')),
]