# Font Awesome Icon Markup Syntax

The icon markup syntax provides a flexible way to insert Font Awesome icons into text with optional styling. The syntax is enclosed in double curly braces `{{ }}`.

## Basic Syntax

```
{{iconName}}
```

- Renders as `fa-regular fa-iconName`
- Example: `{{heart}}` becomes `<i class="fa-regular fa-heart" style="display: inline-block;"></i>`

## Specifying Icon Style

```
{{class iconName}}
```

- `class` can be one of: 
  - classic
  - duotone
  - light
  - regular
  - solid
  - thin
  - brands
  - sharpsolid
- Example: `{{solid heart}}` becomes `<i class="fa-solid fa-heart" style="display: inline-block;"></i>`

## Additional Classes

```
{{class iconName additionalClass1 additionalClass2 ...}}
```

- Additional classes can include:
  - Sizes: xs, sm, lg, xl, 2xl, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x
  - Animations: spin, pulse, beat, fade, flip
- Example: `{{solid heart lg spin}}` becomes `<i class="fa-solid fa-heart fa-lg fa-spin" style="display: inline-block;"></i>`

## Custom Styling

```
{{class iconName additionalClasses; style1; style2; ...}}
```

- CSS styles can be added after a semicolon
- Example: `{{solid heart; color: red; font-size: 20px;}}` becomes `<i class="fa-solid fa-heart" style="display: inline-block; color: red; font-size: 20px;"></i>`

## Important Notes

1. The `display: inline-block;` style is always included and cannot be overridden.
2. Multiple icons can be used in a single string.
3. Invalid markup is left untouched in the output.
4. The parser sanitizes and validates CSS styles for security.