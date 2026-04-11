const API_URL = import.meta.env.VITE_API_URL || "/api";

console.log("API_URL configured as:", API_URL);

export const apiRequest = async (path, options = {}, token) => {
  const fullUrl = `${API_URL}${path}`;
  console.log("Making request to:", fullUrl, "with options:", options);
  
  try {
    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      },
      ...options
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      let errorMessage = "Request failed";
      try {
        const error = await response.json();
        errorMessage = error.message || `Server error: ${response.status}`;
      } catch (e) {
        errorMessage = `Server error: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    // Check if it's a network error or fetch error
    if (error instanceof TypeError) {
      throw new Error(`Unable to connect to API. Make sure both frontend and backend servers are running.`);
    }
    throw error;
  }
};
