const BACKEND_URL = "www.putdbackendhere.com";
async function executeAuthRequest(endpoint, data) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });


        const responseData = await response.json().catch(() => ({
            message: 'Failed to parse server response.',
            error: true
        }));

        if (!response.ok) {
            throw new Error(responseData.error || responseData.message || `Request failed with status: ${response.status}`);
        }

        return responseData;

    } catch (error) {
        console.error(`(auth.js) Error in ${endpoint}: `, error.message);
        throw error;

    }
}

function handleToken(token){
    if (!token) {
        throw new Error("No token received.");
    }
    localStorage.setItem('authToken', token);
}

export async function login(identifier, password) {
    const data = await executeAuthRequest('login', { identifier, password });
    const token = data.token;
    handleToken(token);
    return data;
}



export function logout() {
    localStorage.removeItem("authToken");
    // when user logs out, we clear the auth token so that we do not grant access to account after logging out
}

export async function register(email, password){
    const data = await executeAuthRequest('register', {email, password });
    const token = data.token;
    handleToken(token);
    return data;
}

export function getCurrentToken(){
    return localStorage.getItem("authToken");
}