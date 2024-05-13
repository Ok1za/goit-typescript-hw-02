import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '..//Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';
import { accessKey } from '../../api';
import css from './App.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

interface UnsplashResponse {
  results: UnsplashImage[];
  errors?: string[];
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<UnsplashImage | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setIsLoadMore(false);
  };

  const fetchImages = async (): Promise<void> => {
    const perPage = 12;
    const url = `https://api.unsplash.com/search/photos?page=${isLoadMore ? 2 : 1}&per_page=${perPage}&query=${query}`;

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });
      const data: UnsplashResponse = await response.json();
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
      setError('Failed to fetch images');
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setIsLoadMore(true);
    fetchImages();
  };

  const handleImageClick = (image: UnsplashImage) => {
    setModalImage(image);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
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