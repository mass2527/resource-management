import styled from '@emotion/styled';
import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {useState} from 'react';
import {flexColumn, flexRow} from 'styles/flex';

export interface Resource {
  type: 'image' | 'url';
  name: string;
  source: string;
}

interface ResourceListItemProps {
  resource: Resource;
  setResourceList: Dispatch<SetStateAction<Resource[]>>;
}

const ResourceListItem = ({
  resource,
  setResourceList,
}: ResourceListItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [resourceName, setResourceName] = useState(resource.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus();
      return;
    }

    if (resourceName) {
      setResourceList((prevResourceList) =>
        prevResourceList.map((item) => {
          if (item.source === resource.source) {
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
      onClick={() => {
        console.log('working');
      }}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditMode(false);
        }}>
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div {
    ${flexRow('flex-end')};
    button:first-of-type {
      margin-right: ${({theme}) => theme.spaces.small};
    }
  }
`;

export default ResourceListItem;
