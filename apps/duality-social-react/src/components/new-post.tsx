import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { isAxiosError } from 'axios';
import ImagePreview from './image-preview.tsx';
import LivePostPreview from './live-post-preview.tsx';
import ImageCropDialog from './image-crop-dialog.tsx';
import authenticatedApi from '../services/authenticated-api.ts';
import {
  AppConstants,
  getCharacterCount,
  IApiNewPostResponse,
} from '@duality-social/duality-social-lib';

interface NewPostProps {
  isBlogPost?: boolean;
  parentViewpointId?: string;
  parentPostId?: string;
  onPostSuccess?: (post: IApiNewPostResponse) => void;
}

const NewPost: React.FC<NewPostProps> = ({
  isBlogPost = false,
  parentViewpointId,
  parentPostId,
  onPostSuccess,
}) => {
  const maxLength = isBlogPost
    ? AppConstants.MaxBlogPostLength
    : AppConstants.MaxPostLength;
  const [images, setImages] = useState<File[]>([]);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<string | null>(null);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null,
  );
  const [postError, setPostError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .required('Content is required')
        .test(
          'character-count',
          `Content must be at most ${maxLength} characters`,
          (value) => {
            if (value) {
              return getCharacterCount(value, isBlogPost) <= maxLength;
            }
            return false;
          },
        ),
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
          if (onPostSuccess) {
            onPostSuccess(response.data as IApiNewPostResponse);
          }
        }
      } catch (err) {
        if (isAxiosError(err) && err.response && err.response.data) {
          setErrors({ content: err.response.data });
          setPostError(err.response.data.message);
        } else {
          setErrors({ content: 'Failed to create post. Please try again.' });
          setPostError('An error occurred. Please try again.');
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
          },
        );
        return newImages;
      });
      setCropDialogOpen(false);
      setCurrentEditingIndex(null);
    }
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          {isBlogPost ? 'New Blog Post' : 'New Post'}:
        </Typography>
      </Box>
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
      <Box display="flex" alignItems="center" gap={2} mt={2}>
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
          disabled={formik.isSubmitting}
        >
          {parentPostId ? 'Reply' : 'Post'}
        </Button>
      </Box>
      {postError && (
        <Typography color="error" sx={{ mt: 2 }}>
          {postError}
        </Typography>
      )}
      <ImageCropDialog
        open={cropDialogOpen}
        image={imageToEdit || ''}
        onClose={() => setCropDialogOpen(false)}
        onSave={handleCropSave}
      />
      <LivePostPreview
        content={formik.values.content}
        isBlogPost={isBlogPost}
      />
      <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
        {getCharacterCount(formik.values.content, isBlogPost)}/
        {isBlogPost
          ? AppConstants.MaxBlogPostLength
          : AppConstants.MaxPostLength}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
        Need help with formatting? Check out our{' '}
        <Link to="/help/post-format" target="_blank" rel="noopener noreferrer">
          post formatting guide
        </Link>
        .
      </Typography>
    </Box>
  );
};

export default NewPost;
