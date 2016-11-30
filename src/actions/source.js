export const updateSource = (url, title, image) => {
  return {
    type: 'UPDATE_SOURCE',
    url,
    title,
    image,
  }
}

