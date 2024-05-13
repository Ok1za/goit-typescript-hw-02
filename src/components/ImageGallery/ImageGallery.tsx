import React from 'react';
import css from './ImageGallery.module.css';
import { UnsplashImage } from '../App/App';

interface ImageGalleryProps {
    images: UnsplashImage[];
    onImageClick: (image: UnsplashImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
    return (
        <div>
            <ul className={css.gallery}>
                {images.map((image) => (
                    <li key={image.id}>
                        <img src={image.urls.small} alt={image.alt_description} onClick={() => onImageClick(image)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageGallery;