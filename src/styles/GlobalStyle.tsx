import {Global, css} from '@emotion/react';
import {MyTheme} from './emotion';

const GlobalStyle = () => {
  return (
    <Global
      styles={(theme: MyTheme) => css`
        /* https://velog.io/@teo/2022-CSS-Reset-%EB%8B%A4%EC%8B%9C-%EC%8D%A8%EB%B3%B4%EA%B8%B0 */
        * {
          margin: 0;
          padding: 0;
          font: inherit;
          color: inherit;
        }
        *,
        :after,
        :before {
          box-sizing: border-box;
          flex-shrink: 0;
        }
        :root {
          -webkit-tap-highlight-color: transparent;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
          cursor: default;
          line-height: 1.5;
          overflow-wrap: break-word;
          -moz-tab-size: 4;
          tab-size: 4;
        }
        html,
        body {
          height: 100%;
          font-family: 'Roboto', sans-serif;
          font-size: ${theme.fontSizes.medium};
        }
        img,
        picture,
        video,
        canvas,
        svg {
          display: block;
          max-width: 100%;
        }
        button {
          background: none;
          border: 0;
          cursor: pointer;
        }
        a {
          text-decoration: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
      `}
    />
  );
};

export default GlobalStyle;
