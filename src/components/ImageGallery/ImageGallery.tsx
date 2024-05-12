import React from 'react';
import css from './ImageGallery.module.css';

interface Image {
    id: number;
    urls: {
    regular: string;
    small: string;
    };
    alt_description: string;
}

interface ImageGalleryProps {
    images: Image[];
    onImageClick: (image: Image) => void;
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
