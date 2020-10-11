import { ColorSchemeName } from 'react-native';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) return 'dark'

  const light = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  if (light) return 'light'
  return 'light'
}
