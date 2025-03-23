from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    DeleteUserView,
    AdminPanelView,
    AdminRemovePostView,
    PostListCreateView,
    PostRetrieveUpdateDestroyView,
)

urlpatterns = [
    # Registration and login
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('delete-user/', DeleteUserView.as_view(), name='delete_user'),

    # Admin routes
    path('admin-panel/', AdminPanelView.as_view(), name='admin_panel'),
    path('admin-panel/<int:user_id>/', AdminPanelView.as_view(), name='admin_delete_user'),
    path('admin-remove-post/<int:post_id>/', AdminRemovePostView.as_view(), name='admin_remove_post'),

    # Post endpoints for normal users
    path('posts/', PostListCreateView.as_view(), name='posts_list_create'),
    path('posts/<int:pk>/', PostRetrieveUpdateDestroyView.as_view(), name='posts_rud'),
]