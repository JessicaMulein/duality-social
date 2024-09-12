import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { parsePostContent } from '@duality-social/duality-social-lib';

interface LivePostPreviewProps {
  content: string;
  isBlogPost: boolean;
}

const LivePostPreview: React.FC<LivePostPreviewProps> = ({ content, isBlogPost }) => {
  const [parsedContent, setParsedContent] = useState('');

  useEffect(() => {
    setParsedContent(parsePostContent(content, isBlogPost));
  }, [content, isBlogPost]);

  return (
    <Box mt={2}>
      <Typography variant="h6" color="primary" gutterBottom>Preview:</Typography>
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