export const extractPublicId = (url: string) => {
  const match = url.match(/upload\/\w+\/(.*?).\w+$/);
  if (!match) {
    return null;
  }
  return match[1];
};
