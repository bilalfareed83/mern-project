import axios from "axios";
const API_URL = "/api/goals/";

// Creata new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);
  console.log(response.data);
  return response.data;
};

const goalService = {
  createGoal,
};

export default goalService;
