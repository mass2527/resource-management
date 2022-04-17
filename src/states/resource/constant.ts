import {nanoid} from 'nanoid';

export interface Resource {
  id: string;
  type: 'image' | 'url';
  name: string;
  source: string;
}

export const INITIAL_RESOURCE_LIST: Resource[] = [
  {
    id: nanoid(),
    type: 'url',
    name: 'https://medium.com/@tapajyoti-bose/beautify-your-github-profile-like-a-pro-2f7922895953',
    source:
      'https://medium.com/@tapajyoti-bose/beautify-your-github-profile-like-a-pro-2f7922895953',
  },
  {
    id: nanoid(),
    type: 'url',
    name: 'https://medium.com/@ryanflorence/react-inline-functions-and-performance-bdff784f5578',
    source:
      'https://medium.com/@ryanflorence/react-inline-functions-and-performance-bdff784f5578',
  },
  {
    id: nanoid(),
    type: 'url',
    name: 'https://nextjs-blog-gray.vercel.app/',
    source: 'https://nextjs-blog-gray.vercel.app/',
  },
];
