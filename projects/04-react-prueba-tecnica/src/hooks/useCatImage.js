import { useEffect, useState } from 'react';
const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com';
export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (!fact) return;
    const threeFirstWord = fact.split(' ', 3).join(' ');

    fetch(
      `https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  return { imageUrl: `${CAT_ENDPOINT_IMAGE_URL}${imageUrl}` };
}
