import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api/v1';

function useMutation(options) {
    const defaultOptions = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };

    async function mutate(url, data) {
        return axios({
            url,
            baseURL: API_URL,
            method: 'POST',
            ...defaultOptions,
            ...options,
            data: JSON.stringify(data)
        });
    }
    return {
        mutate
    }
}

export default useMutation;