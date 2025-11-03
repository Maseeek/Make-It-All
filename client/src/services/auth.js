// const BACKEND_URL = "www.putdbackendhere.com";

const BACKEND_URL = "";
async function executeAuthRequest(endpoint, data) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json().catch(() => ({
      message: "Failed to parse server response.",
      error: true,
    }));

    if (!response.ok) {
      throw new Error(
        responseData.error ||
          responseData.message ||
          `Request failed with status: ${response.status}`
      );
    }

    return responseData;
  } catch (error) {
    console.error(`(auth.js) Error in ${endpoint}: `, error.message);
    throw error;
  }
}

function handleToken(token) {
  if (!token) {
    throw new Error("No token received.");
  }
  localStorage.setItem("authToken", token);
}

export async function login(identifier, password) {
  const data = await executeAuthRequest("login", { identifier, password });
  const token = data.token;
  handleToken(token);
  return data;
}

export function logout() {
  localStorage.removeItem("authToken");
  // when user logs out, we clear the auth token so that we do not grant access to account after logging out
}

export async function register(email, password, accountType) {
  const data = await executeAuthRequest("register", {
    email,
    password,
    accountType,
  });
  const token = data.token;
  handleToken(token);
  return data;
}

export function getCurrentToken() {
  return localStorage.getItem("authToken");
}
export function getCurrentUser() {
  const token = getCurrentToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (e) {
    console.error("Error parsing token payload: ", e);
    return null;
  }
}

export async function getUserRole() {
  const user = getCurrentUser();
  if (!user) throw new Error("401");
  return user.accountType; // assuming the token payload has an 'accountType' field
}
