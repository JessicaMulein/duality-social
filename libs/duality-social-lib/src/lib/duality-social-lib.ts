import { CreateImageRequestSizeEnum } from 'openai';
import sanitizeHtml from 'sanitize-html';
import { parseIconMarkup, stripIconMarkup } from './font-awesome/font-awesome';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MarkdownIt = require('markdown-it');

/**
 * Makes a data:// URL from a base64 encoded binary blob string containing a PNG image
 * @param imageBase64Json String containing b64_json
 */
export function makeDataUrl(imageBase64Json: string): string {
  return `data:image/png;base64,${imageBase64Json}`;
}

export function closestImageSize(size: number): CreateImageRequestSizeEnum {
  // If size is greater than or equal to 1024, return 1024
  // If size is greater than or equal to 768, return 1024 (round up)
  // If size is greater than or equal to 512, return 512
  // If size is greater than or equal to 256, return 512 (round up)
  // If size is less than or equal to 384, return 256
  if (size >= 1024 || (size >= 768 && size < 1024)) {
    return CreateImageRequestSizeEnum._1024x1024;
  } else if (size >= 512 || (size >= 256 && size < 512)) {
    return CreateImageRequestSizeEnum._512x512;
  }
  return CreateImageRequestSizeEnum._256x256;
}

export function imageDataUrlToFile(imageDataUrl: string, filename = 'image.png'): File {
  if (!imageDataUrl.startsWith('data:image/png;base64,')) {
    throw new Error('Invalid image data URL');
  }
  // Extract the base64 data from the URL
  const base64Data = imageDataUrl.split(',')[1];
  // Convert base64 to binary data
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  // Create a blob from the binary data
  const imageBlob = new Blob([byteArray], { type: 'image/png' });
  // Convert the blob to a file
  const imageFile = new File([imageBlob], filename, { type: 'image/png' });
  return imageFile;
}

export function parsePostContent(content: string): string {
  // Phase 1: Strip HTML
  // we strip the html first because we don't really support HTML in posts,
  // but our syntax is too close to markdown so it gets parsed as HTML

  content = sanitizeHtml(content, {
    allowedTags: [], // Strip all tags
    allowedAttributes: {}, // Strip all attributes
  });

  // Phase 2: Parse markdown
  content = MarkdownIt('default')
    .set({
      breaks: true,
      html: true,
      linkify: true,
      typographer: true,
      xhtmlOut: true,
    })
    .render(content);

  // Phase 3: Parse our custom icon syntax
  content = parseIconMarkup(content);
  return content;
}

export function sanitizeWhitespace(input: string): string {
  // replace all whitespace with a single space
  return input.replace(/\s+/g, ' ').trim();
}

export function sanitizeForAi(input: string): string {
  const sanitized = sanitizeWhitespace(input);
  const stripped = stripIconMarkup(sanitized);
  return stripped;
}