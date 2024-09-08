import React from 'react';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@awesome.me/kit-89ec609b07/icons/classic/solid';
import { faHeart as faHeartRegular } from '@awesome.me/kit-89ec609b07/icons/classic/regular';

const FormatGuide: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Post Formatting Guide
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginBottom: 2 }}>
        <p>
          You can use Markdown syntax and a special custom FontAwesome powered
          icon markup in your posts.
        </p>
        <p>
          A complete list of icons available (we're using a complete Pro set)
          can be found here{' '}
          <a
            href="https://fontawesome.com/icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://fontawesome.com/icons
          </a>
        </p>
        <p>Here's a quick guide:</p>
      </Typography>
      <Divider />
      <Typography variant="h6" mt={2}>
        Markdown Syntax:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Bold"
            secondary="**bold text** or __bold text__"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Italic"
            secondary="*italic text* or _italic text_"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Links"
            secondary="[link text](https://example.com)"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Lists"
            secondary="- Item 1\n- Item 2\n- Item 3"
          />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h6" mt={2}>
        Icon Markup:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHeartRegular} />
          </ListItemIcon>
          <ListItemText
            primary="Basic Icon"
            secondary="{{heart}} renders as a regular heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHeartSolid} />
          </ListItemIcon>
          <ListItemText
            primary="Styled Icon"
            secondary="{{solid heart}} renders as a solid heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Available Styles"
            secondary="classic, duotone, light, regular, solid, thin, brands, sharp solid"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Sizes"
            secondary="xs, sm, lg, xl, 2xl, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHeartSolid} size="lg" />
          </ListItemIcon>
          <ListItemText
            primary="Size Example"
            secondary="{{solid heart lg}} renders a large solid heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Animations"
            secondary="spin, spin-pulse, spin-reverse, pulse, beat, fade, beat-fade, flip, flip-both, flip-horizontal, flip-vertical, rotate-90, rotate-180, rotate-270, rotate-by"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHeartSolid} spin />
          </ListItemIcon>
          <ListItemText
            primary="Animation Example"
            secondary="{{solid heart spin}} renders a spinning solid heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FontAwesomeIcon icon={faHeartSolid} size="lg" spin />
          </ListItemIcon>
          <ListItemText
            primary="Combined Usage"
            secondary="{{solid heart lg spin}} renders a large, spinning, solid heart icon"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FontAwesomeIcon
              icon={faHeartSolid}
              style={{ color: 'red', fontSize: '20px' }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Custom Styled Icon"
            secondary="{{solid heart; color: red; font-size: 20px;}} renders as a red, 20px solid heart icon. CSS styles are added after a semicolon."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Custom Style Order"
            secondary={
              <React.Fragment>
                <Typography variant="body2">
                  When using icons, follow this order:
                  <ol>
                    <li>Icon style (optional, e.g., solid, regular)</li>
                    <li>Icon name (required, e.g., heart)</li>
                    <li>Additional properties (optional, e.g., lg, spin)</li>
                    <li>Semicolon (;) - only if adding CSS styles</li>
                    <li>CSS styles (optional)</li>
                  </ol>
                </Typography>
                <Typography variant="body2">Examples:</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faHeartRegular} />
                    </ListItemIcon>
                    <ListItemText primary="Basic: {{heart}}" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faHeartSolid} />
                    </ListItemIcon>
                    <ListItemText primary="With style: {{solid heart}}" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faHeartSolid} size="lg" spin />
                    </ListItemIcon>
                    <ListItemText primary="With properties: {{heart lg spin}}" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon
                        icon={faHeartSolid}
                        style={{ color: 'red', fontSize: '20px' }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="With CSS: {{heart; color: red; font-size: 20px;}}" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FontAwesomeIcon
                        icon={faHeartSolid}
                        size="lg"
                        spin
                        style={{ color: 'red', fontSize: '20px' }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Full example: {{solid heart lg spin; color: red; font-size: 20px;}}" />
                  </ListItem>
                </List>
                <Typography variant="body2">
                  Remember: Only the icon name is required. All other elements
                  are optional.
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Typography variant="body2" mt={2}>
        Note: HTML tags are stripped for security reasons. Use Markdown and icon
        markup for formatting.
      </Typography>
      <Typography variant="body2" mt={2}>
        For more detailed styling options, refer to the{' '}
        <a
          href="https://docs.fontawesome.com/web/style/style-cheatsheet"
          target="_blank"
          rel="noopener noreferrer"
        >
          FontAwesome Style Cheatsheet
        </a>
        . Our markup is a custom shorthand for this.
      </Typography>
    </Paper>
  );
};

export default FormatGuide;
