import React from 'react';
import css from './ImageModal.module.css';
import Modal from "react-modal";

type ImageModalProps = {
    image: {
        urls: {
            regular: string;
        };
        alt_description: string;
    } | null;
    isOpen: boolean;
    onRequestClose: () => void;
};

const customStyles = {
    content: {
        padding: "0",
        background: "unset",
        overflow: "unset",
        border: "none",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onRequestClose }) => {
    if (!image) {
        return null;
    }

    const appElement = document.getElementById("root") || undefined;

    return (
        <div>
            <Modal
                style={customStyles}
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                overlayClassName={css.overlay}
                contentLabel="Image Modal"
                appElement={appElement}
            >
                <img src={image.urls.regular} alt={image.alt_description} />
            </Modal>
        </div>
    );
};

export default ImageModal;