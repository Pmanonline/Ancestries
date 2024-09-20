// Helper function to register the user
export const registerUser = async (backendURL, body) => {
  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    // Ensure you invoke response.json() to parse the JSON response
    const data = await response.json();

    if (!response.ok) {
      // You might want to include the actual error message from the response
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error) {
    console.error("Error in registerUser function:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};

export const getRequest = async (backendURL) => {
  try {
    const response = await fetch(backendURL);

    const data = await response.json();

    if (!response.ok) {
      let message = "An error occurred while fetching";

      if (data?.message) {
        message = data.message;
      }

      return { error: true, message };
    }

    // Success: Return the data with an indication that there's no error
    return { error: false, data };
  } catch (error) {
    // Handle fetch errors (e.g., network issues)
    return { error: true, message: error.message || "Network error" };
  }
};

export const PostRequest = async (backendURL, body) => {
  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      let message = "An error occurred while fetching";

      if (data?.message) {
        message = data.message;
      }

      return { error: true, message };
    }

    return { error: false, data };
  } catch (error) {
    return { error: true, message: error.message || "Network error" };
  }
};
