import {flexColumn, flexRow} from 'styles/flex';
import Button from 'components/Button';
import styled from '@emotion/styled';
import {ChangeEvent, useRef, useState} from 'react';
import {css} from '@emotion/react';
import ResourceListItem, {Resource} from 'components/ResourceListItem';

const URL_REGEX =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const YOUTUBE_REGEX =
  /^(?:https?:\/\/)(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;

const convertToEmbeddedURL = (url: string): string => {
  const match = url.match(YOUTUBE_REGEX);
  const videoId = match ? match[1] || match[2] : undefined;
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

const VALID_FILE_TYPES = ['image/png', 'image/jpeg'];

const isValidFileType = (file: File) => VALID_FILE_TYPES.includes(file.type);

const INITIAL_RESOURCE_LIST: Resource[] = [
  {
    type: 'url',
    name: 'https://medium.com/@tapajyoti-bose/beautify-your-github-profile-like-a-pro-2f7922895953',
    source:
      'https://medium.com/@tapajyoti-bose/beautify-your-github-profile-like-a-pro-2f7922895953',
  },
  {
    type: 'url',
    name: 'https://brunch.co.kr/@carynful/19',
    source: 'https://brunch.co.kr/@carynful/19',
  },
  {
    type: 'url',
    name: 'https://typed.blog/how-to-write-a-better-research-paper-faster/',
    source: 'https://typed.blog/how-to-write-a-better-research-paper-faster/',
  },
];

const Sidebar = () => {
  const [resourceList, setResourceList] = useState(INITIAL_RESOURCE_LIST);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleURLAddClick = async () => {
    const url = prompt('URL을 입력해 주세요.');
    if (url === null) {
      return;
    }
    if (!url || !URL_REGEX.test(url)) {
      alert('올바른 형식의 URL을 입력하세요');
      return;
    }
    if (resourceList.some((resource) => resource.source === url)) {
      alert('이미 등록된 URL입니다.');
      return;
    }

    const convertedURL = convertToEmbeddedURL(url);
    const newResource: Resource = {
      type: 'image',
      name: convertedURL,
      source: convertedURL,
    };
    setResourceList([newResource, ...resourceList]);
    // 성공 토스트
  };

  const handleInputFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const currentFiles = e.target.files!;
    if (currentFiles.length === 0) {
      return;
    }

    for (const file of currentFiles) {
      if (!isValidFileType(file)) {
        return;
      }
      const objectURL = URL.createObjectURL(file);
      if (resourceList.some((resource) => resource.source === objectURL)) {
        return;
      }

      const newResource: Resource = {
        type: 'image',
        name: file.name,
        source: objectURL,
      };
      // TODO
      // 1. 중복 파일 체크
      // 2. URL.revokeObjectURL(objectURL) 필요한지 체크
      setResourceList((prevResourceList) => [newResource, ...prevResourceList]);
      // 성공 토스트
    }

    e.target.value = '';
  };

  return (
    <Wrapper>
      <ResourceAdder>
        <Button onClick={handleURLAddClick}>URL 추가</Button>
        <Button onClick={() => inputFileRef.current?.click()}>
          이미지 추가
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple
          css={css`
            display: none;
          `}
          onChange={handleInputFileChange}
        />
      </ResourceAdder>
      <ResourceListWrapper>
        <ul>
          {resourceList.map((resource) => (
            <ResourceListItem
              key={resource.source}
              resource={resource}
              setResourceList={setResourceList}
            />
          ))}
        </ul>
      </ResourceListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  ${flexColumn()}
  width: 280px;
  background-color: ${({theme}) => theme.colors.gray.light};
  border-right: 1px solid ${({theme}) => theme.colors.gray.dark};
`;

const ResourceAdder = styled.div`
  ${flexRow('space-between')};
  height: ${({theme}) => theme.constants.headerHeight};
  background-color: ${({theme}) => theme.colors.white};
  padding: ${({theme}) => theme.spaces.medium};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ResourceListWrapper = styled.div`
  height: calc(100% - ${({theme}) => theme.constants.headerHeight});
  overflow: auto;
  padding: ${({theme}) => theme.spaces.medium};
`;

export default Sidebar;