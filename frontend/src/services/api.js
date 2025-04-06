// The base URL for the Django backend
const BASE_URL = "http://127.0.0.1:8000/api";

/*
  request():
   - endpoint: string (e.g. "/register/")
   - method: HTTP method ("GET", "POST", "PUT", "DELETE")
   - body: data to send in JSON form
   - returns: the raw fetch() response object
*/
const request = async (endpoint, method = "GET", body = null) => {
  const options = {
    method: method,
    credentials: "include", // Send cookies for session-based auth
  };

  // Only add Content-Type header if body is not FormData
  if (body && !(body instanceof FormData)) {
    options.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    options.body = JSON.stringify(body);
  } else if (body) {
    options.body = body; // Send FormData as is
  }

  console.log(`Making ${method} request to ${BASE_URL}${endpoint}`);
  if (body) {
    console.log('Request body:', body);
  }

  try {
    // Make the fetch call to Django
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    console.log(`Response status: ${response.status}`);
    return response;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};

export default request;