import { getCharacterCount, parseMarkdown, parsePostContent, prepareContentForCharacterCount } from './duality-social-lib';

describe('DualitySocialLib', () => {
    describe('parseMarkdown', () => {
        it('should process abbreviations correctly', () => {
            const testMarkdown = `
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheets

This is an example of HTML and CSS abbreviations.
            `;
            const expectedHtml = `
<p>This is an example of <a href="#HTML"><abbr title="Hyper Text Markup Language">HTML</abbr></a> and <a href="#CSS"><abbr title="Cascading Style Sheets">CSS</abbr></a> abbreviations.</p>
            `.trim();

            const result = parseMarkdown(testMarkdown).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle bold text', () => {
            const testMarkdown = '**Bold Text**';
            const expectedHtml = '<p><strong>Bold Text</strong></p>';

            const result = parseMarkdown(testMarkdown).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle italic text', () => {
            const testMarkdown = '*Italic Text*';
            const expectedHtml = '<p><em>Italic Text</em></p>';

            const result = parseMarkdown(testMarkdown).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle code blocks', () => {
            const testMarkdown = '```\nCode Block\n```';
            const expectedHtml = '<pre><code>Code Block\n</code></pre>';

            const result = parseMarkdown(testMarkdown).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle ordered lists', () => {
            const testMarkdown = '1. First Item\n2. Second Item';
            const expectedHtml = '<ol>\n<li>First Item</li>\n<li>Second Item</li>\n</ol>';

            const result = parseMarkdown(testMarkdown).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle GFM tables', () => {
            const testMarkdown = `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
            `;
            const expectedHtml = '<table>\n<thead>\n<tr>\n<th>Header 1</th>\n<th>Header 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Cell 1</td>\n<td>Cell 2</td>\n</tr>\n<tr>\n<td>Cell 3</td>\n<td>Cell 4</td>\n</tr>\n</tbody>\n</table>';

            const result = parseMarkdown(testMarkdown.trim()).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle GFM task lists', () => {
            const testMarkdown = `
 - [ ] Task 1
 - [x] Task 2
            `;
            const expectedHtml = '<ul class="todo-list-container">\n<li class="todo-list-item enabled"><input class="todo-list-item-checkbox" type="checkbox"  /> Task 1</li>\n<li class="todo-list-item enabled"><input class="todo-list-item-checkbox" type="checkbox" checked  /> Task 2</li>\n</ul>';

            const result = parseMarkdown(testMarkdown.trim()).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle GFM strikethrough', () => {
            const testMarkdown = '~~Strikethrough~~';
            const expectedHtml = '<p><s>Strikethrough</s></p>';

            const result = parseMarkdown(testMarkdown).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle unordered lists', () => {
            const testMarkdown = '- First Item\n- Second Item';
            const expectedHtml = '<ul>\n<li>First Item</li>\n<li>Second Item</li>\n</ul>';

            const result = parseMarkdown(testMarkdown).trim();
            expect(result).toBe(expectedHtml);
        });

        it('should handle mixed markdown features', () => {
            const testMarkdown = '# Title\n**Bold** and *Italic* text\n```\nCode Block\n```\n1. First Item\n2. Second Item\n- List Item';
            const expectedHtml = '<h1>Title</h1>\n<p><strong>Bold</strong> and <em>Italic</em> text</p>\n<pre><code>Code Block\n</code></pre>\n<ol>\n<li>First Item</li>\n<li>Second Item</li>\n</ol>\n<ul>\n<li>List Item</li>\n</ul>';

            const result = parseMarkdown(testMarkdown).trim();
            expect(result).toBe(expectedHtml);
        });
    });

    describe('parsePostContent', () => {
        it('should do markdown and our cool icons', () => {
            const testMarkdown = '# Hello World\nThis is a test of our markdown parser.\n' +
                'This should be a red heart with a zig-zag through it -> {{duotone heart-pulse; color: red;}}';
            const expectedHtml = '<h1>Hello World</h1>\n<p>This is a test of our markdown parser.<br />\n' +
                'This should be a red heart with a zig-zag through it -&gt; <i class="fa-duotone fa-heart-pulse" style="display: inline-block; color: red;"></i></p>';

            const result = parsePostContent(testMarkdown, true).trim();
            expect(result).toEqual(expectedHtml);
        });

        it('should support MD links', () => {
            const testMarkdown = 'This should be a link -> [https://www.google.com](https://www.google.com)';
            const expectedHtml = '<p>This should be a link -&gt; <a href="https://www.google.com">https://www.google.com</a></p>';

            const result = parsePostContent(testMarkdown, true).trim();
            expect(result).toEqual(expectedHtml);
        });

        it('should linkify plaintext links', () => {
            const testMarkdown = 'This should be a link -> https://www.google.com';
            const expectedHtml = '<p>This should be a link -&gt; <a href="https://www.google.com">https://www.google.com</a></p>';

            const result = parsePostContent(testMarkdown, true).trim();
            expect(result).toEqual(expectedHtml);
        });

        it('should handle plain text when isBlogPost is false', () => {
            const testMarkdown = '# Title\n**Bold** and *Italic* text\n```\nCode Block\n```\n1. First Item\n2. Second Item\n- List Item';
            const expectedHtml = '# Title<br />**Bold** and *Italic* text<br />```<br />Code Block<br />```<br />1. First Item<br />2. Second Item<br />- List Item';

            const result = parsePostContent(testMarkdown, false).trim();
            expect(result).toEqual(expectedHtml);
        });

        it('should preserve newlines when isBlogPost is false', () => {
            const testMarkdown = 'Line 1\nLine 2\nLine 3';
            const expectedHtml = 'Line 1<br />Line 2<br />Line 3';

            const result = parsePostContent(testMarkdown, false).trim();
            expect(result).toEqual(expectedHtml);
        });

        it('should handle a two-line post with one letter per line correctly when isBlogPost is false', () => {
            const input = 'x\nx';
            const isBlogPost = false;
            const expected = 'x<br />x';

            const result = parsePostContent(input, isBlogPost).trim();
            expect(result).toEqual(expected);
            expect(result).not.toContain('<p>');
        });

        it('should handle a two-line post with one letter per line correctly when isBlogPost is true', () => {
            const input = 'x\nx';
            const isBlogPost = true;
            const expected = '<p>x<br />\nx</p>';

            const result = parsePostContent(input, isBlogPost).trim();
            expect(result).toEqual(expected);
        });
    });

    describe('prepareContentForCharacterCount', () => {
        it('should replace valid icon markup with a bullet character', () => {
            const input = 'Hello {{heart}}';
            const expected = 'Hello •';

            const result = prepareContentForCharacterCount(input, false);
            expect(result).toEqual(expected);
        });

        it('should replace <br> tags with newline characters', () => {
            const input = 'Hello<br>World';
            const expected = 'Hello\nWorld';

            const result = prepareContentForCharacterCount(input, false);
            expect(result).toEqual(expected);
        });

        it('should replace <a> tags with their URLs', () => {
            const input = 'Link: <a href="https://www.google.com">Google</a>';
            const expected = 'Link: •Google';

            const result = prepareContentForCharacterCount(input, false);
            expect(result).toEqual(expected);
        });

        it('should replace <img> tags with their alt text or a bullet character', () => {
            const input = 'Image: <img src="image.png" alt="Sample Image" />';
            const expected = 'Image: Sample Image';

            const result = prepareContentForCharacterCount(input, false);
            expect(result).toEqual(expected);
        });

        it('should strip all other HTML tags and attributes', () => {
            const input = '<div>Hello <span>World</span></div>';
            const expected = 'Hello World';

            const result = prepareContentForCharacterCount(input, false);
            expect(result).toEqual(expected);
        });

        it('should replace CRLF pairs with a single newline character', () => {
            const input = 'Hello\r\nWorld';
            const expected = 'Hello\nWorld';

            const result = prepareContentForCharacterCount(input, false);
            expect(result).toEqual(expected);
        });

        it('should handle mixed content correctly', () => {
            const input = 'Hello {{heart}}<br>Link: <a href="https://www.google.com">Google</a>\r\n<div>World</div>';
            const expected = 'Hello •\nLink: •Google\nWorld';

            const result = prepareContentForCharacterCount(input, false);
            expect(result).toEqual(expected);
        });
    });

    describe('getCharacterCount', () => {
        it('should count basic ASCII characters correctly', () => {
            const input = 'Hello World';
            expect(getCharacterCount(input, false)).toBe(11);
        });

        it('should count emojis as one character each', () => {
            const input = 'Hello 🌍';
            expect(getCharacterCount(input, false)).toBe(7);
        });

        it('should count Unicode characters (e.g., Kanji) as one character each', () => {
            const input = 'こんにちは';
            expect(getCharacterCount(input, false)).toBe(5);
        });

        it('should count valid Font Awesome icon markup as one character', () => {
            const input = 'Hello {{heart}}';
            expect(getCharacterCount(input, false)).toBe(7);
        });

        it('should ignore invalid Font Awesome icon markup', () => {
            const input = 'Hello {{invalid}}';
            expect(getCharacterCount(input, false)).toBe(17);
        });

        it('should handle mixed content correctly', () => {
            const input = 'Hello {{heart}} World 🌍 こんにちは';
            expect(getCharacterCount(input, false)).toBe(21);
        });

        it('should count multiple valid Font Awesome icon markups correctly', () => {
            const input = 'Icons: {{heart}} {{star}} {{smile}}';
            expect(getCharacterCount(input, false)).toBe(12);
        });

        it('should count multiple emojis correctly', () => {
            const input = 'Emojis: 😀😁😂🤣😃';
            expect(getCharacterCount(input, false)).toBe(13);
        });

        it('should count a mix of emojis, Unicode characters, and valid icon markups correctly', () => {
            const input = 'Mix: 😀 こんにちは {{heart}}';
            expect(getCharacterCount(input, false)).toBe(14);
        });

        it('should count text with CRLF pairs correctly', () => {
            const input = 'Hello\r\nWorld';
            expect(getCharacterCount(input, false)).toBe(11);
        });

        it('should count text with <br> tags correctly', () => {
            const input = 'Hello<br>World';
            expect(getCharacterCount(input, false)).toBe(11);
        });

        it('should count text with links correctly', () => {
            const input = 'Link: <a href="https://www.google.com">Google</a>';
            expect(getCharacterCount(input, false)).toBe(13);
        });

        it('should count text with mixed HTML tags correctly', () => {
            const input = '<div>Hello <span>World</span></div>';
            expect(getCharacterCount(input, false)).toBe(11);
        });

        it('should count markdown links correctly', () => {
            const input = '[Google](https://www.google.com)';
            expect(getCharacterCount(input, true)).toBe(7);
        });

        it('should count multi-line examples correctly', () => {
            const input = '[Google](https://www.google.com)\nt';
            expect(getCharacterCount(input, true)).toBe(9);
        });
    });
});
