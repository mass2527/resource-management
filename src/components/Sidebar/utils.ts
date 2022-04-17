import {VALID_FILE_TYPES, YOUTUBE_REGEX} from './constants';

export const isValidFileType = (file: File) =>
  VALID_FILE_TYPES.includes(file.type);

export const convertToEmbeddedURL = (url: string): string => {
  const match = url.match(YOUTUBE_REGEX);
  const videoId = match ? match[1] || match[2] : undefined;
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};
