import { getCharacterCount, parsePostContent } from './duality-social-lib';

describe('DualitySocialLib', () => {
    describe('parsePostContent', () => {
        it('should do markdown and our cool icons', () => {
            const testMarkdown = '# Hello World\nThis is a test of our markdown parser.\n' +
                'This should be a red heart with a zig-zag through it -> {{duotone heart-pulse; color: red;}}';
            const expectedHtml = '<h1>Hello World</h1>\n<p>This is a test of our markdown parser.<br />\n' +
                'This should be a red heart with a zig-zag through it -&gt; <i class="fa-duotone fa-heart-pulse" style="display: inline-block; color: red;"></i></p>\n';

            const result = parsePostContent(testMarkdown);
            expect(result).toEqual(expectedHtml);
        });
        it('should support MD links', () => {
            const testMarkdown = 'This should be a link -> [https://www.google.com](https://www.google.com)';
            const expectedHtml = '<p>This should be a link -&gt; <a href="https://www.google.com">https://www.google.com</a></p>\n';

            const result = parsePostContent(testMarkdown);
            expect(result).toEqual(expectedHtml);
        });
        it('should linkify plaintext links', () => {
            const testMarkdown = 'This should be a link -> https://www.google.com';
            const expectedHtml = '<p>This should be a link -&gt; <a href="https://www.google.com">https://www.google.com</a></p>\n';

            const result = parsePostContent(testMarkdown);
            expect(result).toEqual(expectedHtml);
        });
    });

    describe('getCharacterCount', () => {
        it('should count basic ASCII characters correctly', () => {
            const input = 'Hello World';
            expect(getCharacterCount(input)).toBe(11);
        });

        it('should count emojis as one character each', () => {
            const input = 'Hello 🌍';
            expect(getCharacterCount(input)).toBe(7);
        });

        it('should count Unicode characters (e.g., Kanji) as one character each', () => {
            const input = 'こんにちは';
            expect(getCharacterCount(input)).toBe(5);
        });

        it('should count valid Font Awesome icon markup as one character', () => {
            const input = 'Hello {{heart}}';
            expect(getCharacterCount(input)).toBe(7);
        });

        it('should ignore invalid Font Awesome icon markup', () => {
            const input = 'Hello {{invalid}}';
            expect(getCharacterCount(input)).toBe(17);
        });

        it('should handle mixed content correctly', () => {
            const input = 'Hello {{heart}} World 🌍 こんにちは';
            expect(getCharacterCount(input)).toBe(21);
        });

        it('should count multiple valid Font Awesome icon markups correctly', () => {
            const input = 'Icons: {{heart}} {{star}} {{smile}}';
            expect(getCharacterCount(input)).toBe(12);
        });

        it('should count multiple emojis correctly', () => {
            const input = 'Emojis: 😀😁😂🤣😃';
            expect(getCharacterCount(input)).toBe(13);
        });

        it('should count a mix of emojis, Unicode characters, and valid icon markups correctly', () => {
            const input = 'Mix: 😀 こんにちは {{heart}}';
            expect(getCharacterCount(input)).toBe(14);
        });
    });
});
