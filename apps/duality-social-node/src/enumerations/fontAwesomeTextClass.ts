export const FontAwesomeIconPrefixes = ["fas", "far", "fal", "fat", "fad", "fab", "fak", "fass"] as const;
export type FontAwesomeIconPrefix = typeof FontAwesomeIconPrefixes[number];
export const FontAwesomeIconStyle = ["solid", "regular", "light", "thin", "duotone", "brands" ] as const;
export type FontAwesomeIconStyle = typeof FontAwesomeIconStyle[number];
export const FontAwesomeIconFamilies = ["classic", "sharp", "duotone"] as const;
export type FontAwesomeIconFamily = typeof FontAwesomeIconFamilies[number];
export const FontAwesomeIconCssStyleClasses = ["fa-solid", "fa-regular", "fa-kit", "fa-light", "fa-thin", "fa-duotone", "fa-brands" ] as const;
export type FontAwesomeIconCssStyleClass = typeof FontAwesomeIconCssStyleClasses[number];

export enum FontAwesomeTextStyleTypeEnum {
  Classic = 'classic',
  DuoTone = 'fa-duotone',
  Kit = 'fa-kit',
  Light = 'fa-light',
  Regular = 'fa-regular',
  SharpSolid = 'fa-sharp fa-solid',
  Solid = 'fa-solid',
  Thin = 'fa-thin',
  Brands = 'fa-brands',
}

export enum FontAwesomeTextAbbreviation {
  DuoTone = 'fad',
  Kit = 'fak',
  Light = 'fal',
  Regular = 'far',
  SharpSolid = 'fass',
  Solid = 'fas',
  Thin = 'fat',
  Brands = 'fab',
}

export const FontAbbreviationToClassTable = {
  [FontAwesomeTextAbbreviation.DuoTone]: FontAwesomeTextStyleTypeEnum.DuoTone,
  [FontAwesomeTextAbbreviation.Kit]: FontAwesomeTextStyleTypeEnum.Kit,
  [FontAwesomeTextAbbreviation.Light]: FontAwesomeTextStyleTypeEnum.Light,
  [FontAwesomeTextAbbreviation.Regular]: FontAwesomeTextStyleTypeEnum.Regular,
  [FontAwesomeTextAbbreviation.SharpSolid]: FontAwesomeTextStyleTypeEnum.SharpSolid,
  [FontAwesomeTextAbbreviation.Solid]: FontAwesomeTextStyleTypeEnum.Solid,
  [FontAwesomeTextAbbreviation.Thin]: FontAwesomeTextStyleTypeEnum.Thin,
  [FontAwesomeTextAbbreviation.Brands]: FontAwesomeTextStyleTypeEnum.Brands,
}

export const FontClassToAbbreviationNameTable = {
  [FontAwesomeTextStyleTypeEnum.DuoTone]: FontAwesomeTextAbbreviation.DuoTone,
  [FontAwesomeTextStyleTypeEnum.Kit]: FontAwesomeTextAbbreviation.Kit,
  [FontAwesomeTextStyleTypeEnum.Light]: FontAwesomeTextAbbreviation.Light,
  [FontAwesomeTextStyleTypeEnum.Regular]: FontAwesomeTextAbbreviation.Regular,
  [FontAwesomeTextStyleTypeEnum.SharpSolid]: FontAwesomeTextAbbreviation.SharpSolid,
  [FontAwesomeTextStyleTypeEnum.Solid]: FontAwesomeTextAbbreviation.Solid,
  [FontAwesomeTextStyleTypeEnum.Thin]: FontAwesomeTextAbbreviation.Thin,
  [FontAwesomeTextStyleTypeEnum.Brands]: FontAwesomeTextAbbreviation.Brands,
}

export const FontClassToNameTable = {
  [FontAwesomeTextStyleTypeEnum.DuoTone]: 'DuoTone',
  [FontAwesomeTextStyleTypeEnum.Kit]: 'Kit',
  [FontAwesomeTextStyleTypeEnum.Light]: 'Light',
  [FontAwesomeTextStyleTypeEnum.Regular]: 'Regular',
  [FontAwesomeTextStyleTypeEnum.SharpSolid]: 'SharpSolid',
  [FontAwesomeTextStyleTypeEnum.Solid]: 'Solid',
  [FontAwesomeTextStyleTypeEnum.Thin]: 'Thin',
  [FontAwesomeTextStyleTypeEnum.Brands]: 'Brands',
}