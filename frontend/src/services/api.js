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
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Make the fetch call to Django
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  return response;
};

export default request;