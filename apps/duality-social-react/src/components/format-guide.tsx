import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Divider,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  AppConstants,
  prepareContentForCharacterCount,
} from '@duality-social/duality-social-lib';
import LivePostPreview from './live-post-preview.tsx';
import IconMarkupGuide from './icon-markup-guide.tsx';
import BlogPostGuide from './blog-post-guide.tsx';
import CharacterCountGuide from './character-count-guide.tsx';
import { environment } from '../environments/environment.ts';

const exampleBlurb = `
# Welcome to the Blog Post Guide

## Formatting Features

### Text Styles

You can use **bold** and *italic* text to emphasize your points. You can also combine them for ***bold italic*** text.

### Links

Include links in your posts like this: [Visit FontAwesome](https://fontawesome.com).

### Lists

#### Unordered List
- Item 1
- Item 2
- Item 3

#### Ordered List
1. First item
2. Second item
3. Third item

### Code

Inline code: \`const example = true;\`

Block code:
\`\`\`
function greet() {
  console.log("Hello, world!");
}
\`\`\`

### Horizontal Rules

Use horizontal rules to separate sections:
---
***
___

### Images

![Duality Social](${environment.siteUrl}/assets/DSImageOnlySmall.png)

### Tables

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

### Strikethrough

~~This text is struck through.~~

### Task Lists

- [x] Completed task
- [ ] Incomplete task

### Footnotes

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

### Inline Footnotes

Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]

### Definition Lists

Term
: Definition

### Abbreviations

*[HTML]: Hyper Text Markup Language

HTML

### Custom Containers

::: info
This is an info container.
:::
`;

const iconExampleBlurb = `
# Icon Markup Examples

## Basic Icons

Here is a regular heart icon: {{heart}}

## Styled Icons

Here is a solid heart icon: {{solid heart}}

## Icons with Additional Properties

Here is a large, spinning, solid heart icon: {{solid heart lg spin}}

## Custom Styled Icons

Here is a red, 20px solid heart icon: {{solid heart; color: red; font-size: 20px;}}
`;

const FormatGuide: React.FC = () => {
  const [content, setContent] = useState<string>(
    exampleBlurb + '---\n' + iconExampleBlurb,
  );
  const [isBlogPost, setIsBlogPost] = useState<boolean>(true);
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterCount = isBlogPost
    ? AppConstants.MaxBlogPostLength
    : AppConstants.MaxPostLength;

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharacterCount(
      prepareContentForCharacterCount(newContent, isBlogPost).length,
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        paddingTop: 4,
        maxWidth: 600,
        margin: 'auto',
        marginTop: 8,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Post Formatting Guide
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginBottom: 2 }}>
        Blog posts support Markdown syntax and all posts support a special
        custom FontAwesome powered icon markup in your posts (explained below).
      </Typography>
      <Typography variant="body1" component="div" sx={{ marginBottom: 2 }}>
        Here's a quick guide:
      </Typography>
      <Divider />
      <IconMarkupGuide />
      <Divider />
      <BlogPostGuide />
      <Divider />
      <CharacterCountGuide />
      <Divider />
      <Typography variant="body2" mt={2}>
        Note: HTML tags are stripped for security reasons. Use Markdown and icon
        markup for formatting.
      </Typography>
      <Divider />
      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
        Formatting Playground:
      </Typography>
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          marginBottom: 2,
        }}
      >
        <TextField
          multiline
          fullWidth
          rows={6}
          placeholder="Type your post content here..."
          value={content}
          onChange={handleContentChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: 0,
            },
            '& .MuiInputBase-input': {
              padding: '8px',
            },
          }}
        />
      </Box>
      <Typography
        variant="body2"
        color={characterCount > maxCharacterCount ? 'error' : 'textSecondary'}
      >
        {characterCount}/{maxCharacterCount}
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={isBlogPost}
            onChange={(e) => setIsBlogPost(e.target.checked)}
            color="primary"
          />
        }
        label="Is this a blog post?"
      />
      <LivePostPreview content={content} isBlogPost={isBlogPost} />
    </Paper>
  );
};

export default FormatGuide;
