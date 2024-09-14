import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const BlogPostGuide: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" mt={2}>
        Blog Post Markdown Syntax:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Bold"
            secondary={
              <Typography component="pre">
                **bold text** or __bold text__
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Italic"
            secondary={
              <Typography component="pre">
                *italic text* or _italic text_
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Links"
            secondary={
              <Typography component="pre">
                [link text](https://example.com)
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Lists"
            secondary={
              <Typography component="pre">
                - Item 1
                <br />
                - Item 2
                <br />- Item 3
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Headings"
            secondary={
              <Typography component="pre">
                # H1
                <br />
                ## H2
                <br />
                ### H3
                <br />
                #### H4
                <br />
                ##### H5
                <br />
                ###### H6
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Code"
            secondary={
              <Typography component="pre">
                Inline `code`
                <br />
                <br />
                ```
                <br />
                Block code
                <br />
                ```
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Horizontal Rules"
            secondary={
              <Typography component="pre">
                ---
                <br />
                ***
                <br />
                ___
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Images"
            secondary={
              <Typography component="pre">
                ![alt text](https://example.com/image.jpg)
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Tables"
            secondary={
              <Typography component="pre">
                | Header 1 | Header 2 |
                <br />
                | -------- | -------- |
                <br />| Cell 1 | Cell 2 |
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Strikethrough"
            secondary={
              <Typography component="pre">~~strikethrough~~</Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Task Lists"
            secondary={
              <Typography component="pre">
                - [x] Completed task
                <br />- [ ] Incomplete task
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Footnotes"
            secondary={
              <Typography component="pre">
                Here is a footnote reference,[^1] and another.[^longnote]
                <br />
                <br />
                [^1]: Here is the footnote.
                <br />
                <br />
                [^longnote]: Here's one with multiple blocks.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;Subsequent paragraphs are indented to show that they
                <br />
                belong to the previous footnote.
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Inline Footnotes"
            secondary={
              <Typography component="pre">
                Here is an inline note.^[Inlines notes are easier to write,
                since you don't have to pick an identifier and move down to type
                the note.]
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Definition Lists"
            secondary={
              <Typography component="pre">
                Term
                <br />: Definition
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Abbreviations"
            secondary={
              <Typography component="pre">
                *[HTML]: Hyper Text Markup Language
                <br />
                <br />
                HTML
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Custom Containers"
            secondary={
              <Typography component="pre">
                ::: info
                <br />
                This is an info container
                <br />
                :::
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default BlogPostGuide;
