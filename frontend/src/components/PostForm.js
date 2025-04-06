import React, { useState } from 'react';

function PostForm({ initialTitle = '', initialDescription = '', onSubmit, buttonLabel }) {
  // We'll store title and description in local state
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    // Call the parent callback with the FormData
    onSubmit(formData);
    // Reset the form
    setTitle('');
    setDescription('');
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div>
        <label>Title:</label>
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="3"
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <div style={{ marginTop: '1rem' }}>
            <img 
              src={previewUrl} 
              alt="Preview" 
              style={{ maxWidth: '200px', maxHeight: '200px' }} 
            />
          </div>
        )}
      </div>
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default PostForm;