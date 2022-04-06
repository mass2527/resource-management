import {theme} from './theme';

type MyTheme = typeof theme;

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
