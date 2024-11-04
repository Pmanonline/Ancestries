const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:30001"
    : "https://gekoda-api.onrender.com";

export default backendURL;
