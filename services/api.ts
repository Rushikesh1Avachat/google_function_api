import axios from "axios";

const API_BASE_URL = "https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/67e6498a00349285df8c";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
