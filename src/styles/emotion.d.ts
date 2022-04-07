import {theme} from './theme';

export type MyTheme = typeof theme;

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
