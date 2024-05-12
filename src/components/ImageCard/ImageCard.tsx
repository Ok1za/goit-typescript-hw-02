import React from 'react';
import css from './ImageCard.module.css';

type Image = {
    id: number;
    urls: {
        small: string;
    };
    alt_description: string;
};

type ImageCardProps = {
    image: Image;
    onClick: (image: Image) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
    const handleClick = () => {
        onClick(image);
    };

    return (
        <div className={css.container}>
            <img
                src={image.urls.small}
                alt={image.alt_description}
                onClick={handleClick}
                className={css.image}
            />
        </div>
    );
};

export default ImageCard;