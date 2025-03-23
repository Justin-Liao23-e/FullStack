from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    """
    A "Post" entity:
      - user: which user created the post
      - title: a short title for the post
      - description: the content of the post
      - image: optional (requires Pillow if used)
      - created_at: automatically set to the current date/time when created
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # Used in the admin panel or shell to identify the post
        return f'{self.title} by {self.user.username}'