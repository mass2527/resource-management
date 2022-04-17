import {Resource} from 'components/ResourceListItem';

export const INITIAL_RESOURCE_LIST: Resource[] = [
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

export const VALID_FILE_TYPES = ['image/png', 'image/jpeg'];

export const URL_REGEX =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const YOUTUBE_REGEX =
  /^(?:https?:\/\/)(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
