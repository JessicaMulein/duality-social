import { AppConstants } from '@duality-social/duality-social-lib';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

const CharacterCountGuide: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" mt={2}>
        Character Counting:
      </Typography>
      <Typography component="div">
        <List>
          <ListItem>
            <ListItemText
              primary={`Blog post entries are limited to ${AppConstants.MaxBlogPostLength} characters.`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Regular posts and replies are limited to ${AppConstants.MaxPostLength} characters.`}
            />
          </ListItem>
        </List>
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Emoji"
            secondary="Each emoji counts as 1 character"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Unicode Characters"
            secondary="Each Unicode character counts as 1 character"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Icon Markup"
            secondary="Valid icon markup (e.g., {{heart}}) counts as 1 character"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Newlines"
            secondary="Each newline (CR/LF) counts as 1 character"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Links"
            secondary="Each link counts as 1 character, plus the visible text"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Images"
            secondary="Each image counts as 1 character, plus the alt text"
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default CharacterCountGuide;
