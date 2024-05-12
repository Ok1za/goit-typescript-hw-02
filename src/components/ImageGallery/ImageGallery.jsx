import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
    return (
        <div>
            <ul className={css.gallery}>
                {Array.isArray(images) &&
                images.map((image) => (
                    <li key={image.id}>
                        <ImageCard image={image} onClick={() => onImageClick(image)} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ImageGallery;