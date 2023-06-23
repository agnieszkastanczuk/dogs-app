import axios from 'axios';
import { API_URL } from '@env'

const api = API_URL;

export async function getBreeds() {
    try {
        const response = await axios.get(`${api}/breeds/list/all`);
        const breeds = response.data.message;
        return breeds;
    } catch (error) {
        throw new Error(error.message);
    }
}


export async function getBreedsPaginated(page) {
    try {
        const response = await axios.get(`${api}/breeds/list/all`, {
            params: { _page: page, _limit: 2 },
        });
        const hasNext = page * 2 <= parseInt(response.headers["x-total-count"]);
        const breedsNames = Object.keys(response.data.message);
        return {
            nextPage: hasNext ? page + 1 : undefined,
            previousPage: page > 1 ? page - 1 : undefined,
            message: breedsNames,
        };
    } catch (error) {
        throw new Error(error.message);
    }
}
