const { useSelector } = require("react-redux");

function useAuthorizedHeaders() {
    const dataLogin = useSelector(state => state.auth);
    return {
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${dataLogin.token}`
        }
    }
}

export default useAuthorizedHeaders;