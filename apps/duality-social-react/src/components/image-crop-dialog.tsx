import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

interface ImageCropDialogProps {
  open: boolean;
  image: string;
  onClose: () => void;
  onSave: (croppedImage: Blob) => void;
}

const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  open,
  image,
  onClose,
  onSave,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const createCroppedImage = useCallback(async () => {
    if (croppedAreaPixels) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const imgElement = new Image();
      imgElement.src = image;
      await new Promise<void>((resolve) => {
        imgElement.onload = () => resolve();
      });
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx?.drawImage(
        imgElement,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );
      canvas.toBlob(
        (blob) => {
          if (blob) onSave(blob);
        },
        'image/jpeg',
        1,
      );
    }
  }, [croppedAreaPixels, image, onSave]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <div style={{ position: 'relative', width: '100%', height: 400 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={createCroppedImage} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropDialog;
