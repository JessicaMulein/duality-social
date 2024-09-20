
## Icon Markup

- Basic Icon: `{{heart}}` renders as a regular heart icon
- Styled Icon: `{{solid heart}}` renders as a solid heart icon

### Available Styles
classic, duotone, light, regular, solid, thin, brands, sharp solid

### Sizes
xs, sm, lg, xl, 2xl, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x

Size Example: `{{solid heart lg}}` renders a large solid heart icon

### Animations
spin, spin-pulse, spin-reverse, pulse, beat, fade, beat-fade, flip, flip-both, flip-horizontal, flip-vertical, rotate-90, rotate-180, rotate-270, rotate-by

Animation Example: `{{solid heart spin}}` renders a spinning solid heart icon

### Combined Usage
`{{solid heart lg spin}}` renders a large, spinning, solid heart icon

### Custom Styled Icon
`{{solid heart; color: red; font-size: 20px;}}` renders as a red, 20px solid heart icon. CSS styles are added after a semicolon.

### Custom Style Order
When using icons, follow this order:

1. Icon style (optional, e.g., solid, regular)
2. Icon name (required, e.g., heart)
3. Additional properties (optional, e.g., lg, spin)
4. Semicolon (;) - only if adding CSS styles
5. CSS styles (optional)

Examples:
- Basic: `{{heart}}`
- With style: `{{solid heart}}`
- With properties: `{{heart lg spin}}`
- With CSS: `{{heart; color: red; font-size: 20px;}}`
- Full example: `{{solid heart lg spin; color: red; font-size: 20px;}}`

Remember: Only the icon name is required. All other elements are optional.

## Character Counting

- Emoji: Each emoji counts as 1 character
- Unicode Characters: Each Unicode character counts as 1 character
- Icon Markup: Valid icon markup (e.g., {{heart}}) counts as 1 character
- Newlines: Each newline (CR/LF) counts as 1 character
- Links: Each link counts as 1 character, plus the visible text

## Blog Post Formatting

Blog posts support full Markdown syntax in addition to the custom icon markup. This includes:

- Headers (# H1, ## H2, etc.)
- Code blocks (``` code ```)
- Tables
- And more!

Note: HTML tags are stripped for security reasons. Use Markdown and icon markup for formatting.

For more detailed styling options, refer to the [FontAwesome Style Cheatsheet](https://docs.fontawesome.com/web/style/style-cheatsheet). Our markup is a custom shorthand for this.