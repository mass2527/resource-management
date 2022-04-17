import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {useEffect, useRef} from 'react';
import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {resourceListState, selectedResourceIdState} from 'states/resource';
import {ellipsis} from 'styles/ellipsis';

import {flexColumn, flexRow} from 'styles/flex';

const ResourceListItem = ({resourceId}: {resourceId: string}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [resourceList, setResourceList] = useRecoilState(resourceListState);
  const resource = resourceList.find((resource) => resource.id === resourceId)!;
  const [resourceName, setResourceName] = useState(resource.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedResourceId, setSelectedResourceId] = useRecoilState(
    selectedResourceIdState
  );

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus();
      return;
    }

    if (resourceName) {
      setResourceList((prevResourceList) =>
        prevResourceList.map((item) => {
          if (item.id === resource.id) {
            return {...item, name: resourceName};
          }
          return item;
        })
      );
    } else {
      setResourceName(resource.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode]);

  return (
    <Wrapper
      onClick={() =>
        setSelectedResourceId(
          selectedResourceId === resource.id ? null : resource.id
        )
      }>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditMode(false);
        }}
        css={(theme) =>
          css`
            border: 1px solid
              ${resource.id === selectedResourceId
                ? theme.colors.primary
                : 'transparent'};
          `
        }>
        {isEditMode ? (
          <input
            ref={inputRef}
            type="text"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            onBlur={() => setIsEditMode(false)}
          />
        ) : (
          <span>{resource.name}</span>
        )}

        <div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditMode(true);
            }}
            disabled={isEditMode}>
            수정
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setResourceList((prevResourceList) =>
                prevResourceList.filter(
                  (resourceListItem) =>
                    resourceListItem.source !== resource.source
                )
              );
            }}>
            삭제
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  cursor: pointer;
`;

const Form = styled.form`
  ${flexColumn('space-between')}
  min-height: 90px;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${({theme}) => theme.radiuses.large};
  padding: ${({theme}) => theme.spaces.large};
  margin-bottom: ${({theme}) => theme.spaces.medium};

  span {
    ${ellipsis}
  }

  div {
    ${flexRow('flex-end')};
    button:first-of-type {
      margin-right: ${({theme}) => theme.spaces.small};
    }
  }
`;

export default ResourceListItem;
