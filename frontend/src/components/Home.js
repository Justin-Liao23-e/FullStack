import React, { useState, useEffect } from 'react';
import request from '../services/api';
import PostForm from './PostForm';

function Home() {
  // Store the user's posts
  const [posts, setPosts] = useState([]);
  // Track which post is being edited (by ID)
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // GET the current user's posts
  const fetchPosts = async () => {
    try {
      const response = await request('/posts/');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Create a new post
  const handleCreatePost = async (title, description) => {
    try {
      const response = await request('/posts/', 'POST', { title, description });
      if (response.ok) {
        // Refresh the posts list
        fetchPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update an existing post
  const handleUpdatePost = async (postId, updatedTitle, updatedDescription) => {
    try {
      const response = await request(`/posts/${postId}/`, 'PUT', {
        title: updatedTitle,
        description: updatedDescription
      });
      if (response.ok) {
        fetchPosts();
        setEditingPost(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    // Confirm with the user
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const response = await request(`/posts/${postId}/`, 'DELETE');
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>My Posts</h2>
      {/* Form to create new posts */}
      <PostForm onSubmit={handleCreatePost} buttonLabel="Create Post" />

      {/* Show list of posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div 
            key={post.id} 
            style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}
          >
            {editingPost === post.id ? (
              // If we're editing this post, show the form with existing data
              <PostForm
                initialTitle={post.title}
                initialDescription={post.description}
                onSubmit={(title, description) => handleUpdatePost(post.id, title, description)}
                buttonLabel="Save Changes"
              />
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                {/* If the backend is set up for image, we could show post.image here */}
                <button onClick={() => setEditingPost(post.id)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
}

export default Home;