import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const ImageContext = createContext();

const useImages = () => useContext(ImageContext);

const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [noResultsToShow, setNoResultsToShow] = useState(false);
  useEffect(() => {
    const apiKey = '10e39868768af1480b8aa89c3efe73fa';
    let url;
    if (searchText.length === 0)
      url =
        'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&safe_search=3&api_key=10e39868768af1480b8aa89c3efe73fa&format=json&nojsoncallback=1';
    else
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10e39868768af1480b8aa89c3efe73fa&text=${searchText}&safe_search=3&format=json&nojsoncallback=1`;

    const fetchImages = async () => {
      const { data } = await axios.get(url);
      if (data) setImages(data.photos.photo);
      data.photos.photo.length === 0
        ? setNoResultsToShow(true)
        : setNoResultsToShow(false);
      setLoading(false);
    };
    fetchImages();
  }, [searchText]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <ImageContext.Provider
      value={{ images, loading, searchText, setSearchText, noResultsToShow }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { useImages, ImageProvider };
