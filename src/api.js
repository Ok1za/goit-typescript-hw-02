import axios from "axios";

const accessKey = "F1ypMrdilY3mHoC1nQzrj7Khfn6zVOBxLlMMFY1g7ls";
const apiUrl = "https://api.unsplash.com/";

export const requestQuery = async (query = '', page = 1) => {
    try {
        const response = await axios.get(
        `${apiUrl}/search/photos?client_id=${accessKey}&query=${query}&page=${page}`
    );
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
};