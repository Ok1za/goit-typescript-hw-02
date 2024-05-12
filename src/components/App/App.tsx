import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '..//Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';
import css from './App.module.css';

interface Image {
  id: number;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setIsLoadMore(false);
  };

  const fetchImages = async () => {
    const perPage = 12;
    const url = `https://api.unsplash.com/search/photos?page=${isLoadMore ? 2 : 1}&per_page=${perPage}&query=${query}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Client-ID {YOUR_UNSPLASH_ACCESS_KEY}',
        },
      });
      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0]);
      }
      if (isLoadMore) {
        setImages(prevImages => [...prevImages, ...data.results]);
      } else {
        setImages(data.results);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setIsLoadMore(true);
    setIsLoading(true);
    fetchImages();
  };

  const handleImageClick = (image: Image) => {
    setModalImage(image);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      fetchImages();
    }
  }, [query]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && (
        <ImageModal
          image={modalImage}
          isOpen={isOpen}
          onRequestClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;