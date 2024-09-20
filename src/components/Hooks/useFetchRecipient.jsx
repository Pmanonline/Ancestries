import { useState, useEffect, useContext } from "react";
import { getRequest } from "../../features/chatFeature/chatActions";
import { AuthContext } from "../../components/context/AuthContext";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

function useFetchRecipientUser(chat) {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const userId = user?.id;

  const recipientId = chat?.members?.find((id) => id !== userId);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) {
        console.log("No recipientId found");
        return;
      }

      try {
        const response = await getRequest(
          `${backendURL}/api/findUser/${recipientId}`
        );

        if (response.error) {
          setError(response.message || "Failed to fetch recipient user.");
          return;
        }

        setRecipientUser(response.data);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching the recipient user."
        );
      }
    };

    getUser();
  }, [recipientId]);

  return { recipientUser, error };
}

export default useFetchRecipientUser;
