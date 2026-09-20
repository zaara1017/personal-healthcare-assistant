import axios from "axios";

const API_URL = "https://personal-healthcare-assistant.onrender.com/api/ai";

export const sendChatMessage = async (message, history) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/chat`,
    {
      message,
      history,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};