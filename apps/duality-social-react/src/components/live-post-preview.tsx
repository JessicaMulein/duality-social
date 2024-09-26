import { parsePostContent } from '@duality-social/duality-social-lib';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface LivePostPreviewProps {
  content: string;
  isBlogPost: boolean;
}

const LivePostPreview: React.FC<LivePostPreviewProps> = ({
  content,
  isBlogPost,
}) => {
  const [parsedContent, setParsedContent] = useState('');
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    setParsedContent(
      parsePostContent(content, isBlogPost, 'preview', currentUrl),
    );
  }, [content, isBlogPost, parsedContent, currentUrl]);

  return (
    <Box mt={2}>
      <Typography variant="h6" color="primary" gutterBottom>
        Preview:
      </Typography>
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          minHeight: '100px',
        }}
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
    </Box>
  );
};

export default LivePostPreview;
