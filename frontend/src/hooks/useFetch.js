import useAuthorizedHeaders from "./useAuthorizedHeaders";

const { default: axios } = require("axios");
const { useEffect, useReducer, useRef } = require("react");

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api/v1';

function useFetch(url, options, onSuccess, onError) {
    const defaultOptions = {
        ...useAuthorizedHeaders()
    };
    const cache = useRef({})

    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef(false)

    const initialState = {
        isLoading: false,
        error: undefined,
        data: undefined,
    }

    // Keep state logic separated
    const fetchReducer = (state, action) => {
        switch (action.type) {
            case 'loading':
                return { ...initialState, isLoading: true }
            case 'fetched':
                return { ...initialState, data: action.payload, isLoading: false }
            case 'error':
                return { ...initialState, error: action.payload, isLoading: false }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    useEffect(() => {
        // Do nothing if the url is not given
        if (!url) return

        cancelRequest.current = false

        const fetchData = async () => {
            dispatch({ type: 'loading' })

            if (cache.current[url]) {
                console.log('cached')
                dispatch({ type: 'fetched', payload: cache.current[`${url}`] })
                return
            }

            try {
                const response = await axios({
                    url,
                    baseURL: API_URL,
                    method: 'GET',
                    ...defaultOptions,
                    ...options
                });
                const data = response.data;
                cache.current[url] = data
                if (cancelRequest.current) return
                if (onSuccess) onSuccess(data);
                dispatch({ type: 'fetched', payload: data })
            } catch (error) {
                if (cancelRequest.current) return
                if (onError) onError(error);
                dispatch({ type: 'error', payload: error })
            }
        }

        void fetchData()

        return () => {
            cancelRequest.current = true
        }
    }, [url])

    return state
}

export default useFetch;