import {INITIAL_RESOURCE_LIST, Resource} from './constant';

import {atom, selector} from 'recoil';

export const resourceListState = atom<Resource[]>({
  key: 'resourceListState',
  default: INITIAL_RESOURCE_LIST,
});

export const selectedResourceIdState = atom<string | null>({
  key: 'selectedResourceIdState',
  default: null,
});

export const selectedResourceSelector = selector<Resource | null>({
  key: 'selectedResourceSelector',
  get: ({get}) => {
    const resourceList = get(resourceListState);
    const selectedResourceId = get(selectedResourceIdState);

    return (
      resourceList.find((resource) => resource.id === selectedResourceId) ||
      null
    );
  },
});
