import { Marked, Renderer } from '@ts-stack/markdown';
import { parseIconMarkup } from '../font-awesome/font-awesome';

Marked.setOptions
({
  renderer: new Renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

export function parsePostContent(content: string): string {
  // Phase 1: Strip HTML
  // we strip the html first because we don't really support HTML in posts,
  // but our syntax is too close to markdown so it gets parsed as HTML

  content = Marked.parse(content);

  // Phase 3: Parse our custom icon syntax
  content = parseIconMarkup(content);
  return content;
}
