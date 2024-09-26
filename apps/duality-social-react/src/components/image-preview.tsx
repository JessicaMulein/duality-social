import {
  faPencilAlt,
  faTrash,
} from '@awesome.me/kit-89ec609b07/icons/classic/regular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, IconButton } from '@mui/material';
import React from 'react';

interface ImagePreviewProps {
  image: File;
  onDelete: () => void;
  onEdit: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  onDelete,
  onEdit,
}) => {
  return (
    <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
      <img
        src={URL.createObjectURL(image)}
        alt="Preview"
        style={{ maxWidth: '100%', maxHeight: '200px' }}
      />
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <IconButton onClick={onEdit} size="small">
          <FontAwesomeIcon icon={faPencilAlt} />
        </IconButton>
        <IconButton onClick={onDelete} size="small">
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImagePreview;
