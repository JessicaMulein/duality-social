import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImagePreview from './image-preview';
import ImageCropDialog from './image-crop-dialog';
import authenticatedApi from '../services/authenticated-api';
import { AppConstants } from '@duality-social/duality-social-lib';
import { isAxiosError } from 'axios';

interface NewPostProps {
  isBlogPost?: boolean;
  parentViewpointId?: string;
  parentPostId?: string;
}

const NewPost: React.FC<NewPostProps> = ({
  isBlogPost = false,
  parentViewpointId,
  parentPostId,
}) => {
  const maxLength = isBlogPost
    ? AppConstants.MaxBlogPostLength
    : AppConstants.MaxPostLength;
  const [images, setImages] = useState<File[]>([]);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<string | null>(null);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null
  );

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .required('Content is required')
        .max(maxLength, `Content must be at most ${maxLength} characters`),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('content', values.content);
        formData.append('isBlogPost', isBlogPost.toString());
        if (parentViewpointId)
          formData.append('parentViewpointId', parentViewpointId);
        if (parentPostId) formData.append('parentPostId', parentPostId);
        if (images.length > 0) {
          images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });
        }

        const response = await authenticatedApi.post('/feed', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 200) {
          resetForm();
          setImages([]);
          // Handle successful post creation (e.g., update feed, show success message)
        }
      } catch (err) {
        if (isAxiosError(err) && err.response && err.response.data) {
          setErrors({ content: err.response.data });
        } else {
          setErrors({ content: 'Failed to create post. Please try again.' });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files);
      if (images.length + newImages.length <= AppConstants.MaxPostImages) {
        setImages((prevImages) => [...prevImages, ...newImages]);
        event.target.value = ''; // Clear the input
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleEditImage = (index: number) => {
    if (images[index]) {
      setImageToEdit(URL.createObjectURL(images[index]));
      setCurrentEditingIndex(index);
      setCropDialogOpen(true);
    }
  };

  const handleCropSave = (croppedBlob: Blob) => {
    if (currentEditingIndex !== null) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentEditingIndex] = new File(
          [croppedBlob],
          images[currentEditingIndex].name || 'cropped_image.jpg',
          {
            type: 'image/jpeg',
          }
        );
        return newImages;
      });
      setCropDialogOpen(false);
      setCurrentEditingIndex(null);
    }
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label={parentPostId ? 'Write a reply' : "What's on your mind?"}
        {...formik.getFieldProps('content')}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={
          (formik.touched.content && formik.errors.content) ||
          (parentPostId ? 'Write a reply' : "What's on your mind?")
        }
      />
      {images.map((img, index) => (
        <ImagePreview
          key={index}
          image={img}
          onDelete={() => handleRemoveImage(index)}
          onEdit={() => handleEditImage(index)}
        />
      ))}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        id="image-upload"
        multiple
        disabled={images.length >= AppConstants.MaxPostImages}
      />
      <label htmlFor="image-upload">
        <Button
          component="span"
          variant="contained"
          disabled={images.length >= AppConstants.MaxPostImages}
        >
          Upload Image
        </Button>
      </label>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={formik.isSubmitting}
      >
        {parentPostId ? 'Reply' : 'Post'}
      </Button>
      <ImageCropDialog
        open={cropDialogOpen}
        image={imageToEdit || ''}
        onClose={() => setCropDialogOpen(false)}
        onSave={handleCropSave}
      />
    </Box>
  );
};

export default NewPost;
