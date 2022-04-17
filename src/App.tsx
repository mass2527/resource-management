import {css, ThemeProvider} from '@emotion/react';
import styled from '@emotion/styled';
import Flex from 'components/Flex';
import Sidebar from 'components/Sidebar';
import {useRef} from 'react';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {
  selectedResourceIdState,
  selectedResourceSelector,
} from 'states/resource';
import {ellipsis} from 'styles/ellipsis';

import {flexColumn, flexRow} from 'styles/flex';
import GlobalStyle from 'styles/GlobalStyle';
import {theme} from 'styles/theme';

function App() {
  const selectedResource = useRecoilValue(selectedResourceSelector);
  const resetSelectedResourceId = useResetRecoilState(selectedResourceIdState);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Sidebar />
        <main>
          <header>
            <h1>Resource Management</h1>
          </header>
          <Flex
            css={(theme) => css`
              flex: 1;
              padding: ${theme.spaces.large};
            `}>
            <div
              css={css`
                flex: 1;
              `}>
              hello
            </div>
            {selectedResource && (
              <Flex
                flex={1}
                direction="column"
                css={css`
                  height: 100%;
                `}>
                <ResourceHeader>
                  <h2>{selectedResource.name}</h2>

                  <button onClick={resetSelectedResourceId}>&times;</button>
                </ResourceHeader>
                <ResourceContent>
                  {selectedResource.type === 'url' ? (
                    <iframe
                      ref={iframeRef}
                      src={selectedResource.source}
                      sandbox="allow-forms allow-scripts allow-same-origin"
                      title={selectedResource.name}
                    />
                  ) : (
                    <img
                      src={selectedResource.source}
                      alt={selectedResource.name}
                    />
                  )}
                </ResourceContent>
              </Flex>
            )}
          </Flex>
        </main>
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  main {
    ${flexColumn()}
    flex: 1;

    > header {
      position: relative;
      ${flexRow('space-between', 'center')}
      height: ${({theme}) => theme.constants.headerHeight};
      padding: ${({theme}) => theme.spaces['x-large']};
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    }
    iframe {
      border: none;
    }
  }
`;

const ResourceHeader = styled.header`
  ${flexRow('space-between')};
  width: 100%;
  height: ${({theme}) => theme.constants.headerHeight};
  padding: ${({theme}) => theme.spaces['x-large']};
  border: 1px solid ${({theme}) => theme.colors.gray.default};
  border-bottom: none;

  h2 {
    ${ellipsis}
  }

  button {
    flex-shrink: 0;
  }
`;

const ResourceContent = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  place-items: center;
  border: 1px solid ${({theme}) => theme.colors.gray.default};

  iframe {
    flex: 1;
    width: 100%;
    height: 100%;
  }
`;

export default App;
