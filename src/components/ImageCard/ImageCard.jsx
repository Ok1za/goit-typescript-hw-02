import css from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
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