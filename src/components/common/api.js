// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'https://app.sahmk.sa';

// Modify the apiCall function like so:
async function apiCall(endpoint, method = 'GET', data = null, page = null) {
    let authToken = localStorage.getItem('accessToken'); // Retrieve the authToken from local storage

    const headers = {
        'Content-Type': 'application/json',
    };
    const pagesWithoutAuth = ["signup", "signin", "refresh"];
    if (authToken && !pagesWithoutAuth.includes(page)) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config = {
        method: method,
        headers: headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(data);
    }

    const performFetch = async () => {
        if (method === 'DELETE') {
            delete config.body; // For DELETE requests, no body is sent
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        const result = await response.json();
        console.log(result);
        if (response.ok) {
            return { result: result, status: response.status };
        } else {
            // Check if the token has expired or is invalid
            if (response.status === 401 && result.code === 'token_not_valid') {
                // Attempt to refresh the token
                const refresh = localStorage.getItem('refreshToken');
                const refreshResponse = await fetch(`${BASE_URL}/auth/api/token/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: refresh }),
                }, "refresh");

                const refreshResult = await refreshResponse.json();
                if (refreshResponse.ok) {
                    // If refresh was successful, update tokens in local storage
                    localStorage.setItem('accessToken', refreshResult.access_token);
                    localStorage.setItem('refreshToken', refreshResult.refresh_token);

                    // Update the authToken with the new access token
                    authToken = refreshResult.access_token;
                    config.headers['Authorization'] = `Bearer ${authToken}`;

                    // Retry the original request with the new token
                    return performFetch();
                } else {
                    // If token refresh fails, throw an error
                    // throw new Error(refreshResult.message || 'Unable to refresh the token.');
                    // window.location.href = '/signout';
                    
                }
            } else {
                // For all other errors, throw an error
                throw new Error(result.error || 'Something went wrong!');
            }
        }
    };

    try {
        return await performFetch();
    } catch (error) {
        return {
            error: error.message,
            status: error.response ? error.response.status : null,
        };
    }
}

export default apiCall;

export { BASE_URL };