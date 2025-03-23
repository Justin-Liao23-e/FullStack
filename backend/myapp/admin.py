from django.contrib import admin
from .models import Post

# Register the Post model so it's visible in the Django admin.
admin.site.register(Post)