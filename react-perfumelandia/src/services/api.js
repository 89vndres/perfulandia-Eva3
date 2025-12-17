

let token = localStorage.getItem('token') || null;


export const setAuthToken = (newToken) => {
    if (newToken) {
        localStorage.setItem('token', newToken);
        token = newToken;
    } else {
        localStorage.removeItem('token');
        token = null;
    }
};


export const apiFetch = async (url, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

   
    if (token && typeof token === 'string' && token.trim() && token.split('.').length === 3) {
        headers['Authorization'] = `Bearer ${token.trim()}`;
    }

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(url, config);

    
    if (response.status === 401) {
        setAuthToken(null); 
        window.location.href = '/login'; 
    }

    return response;
};