const URL = "http://192.175.109.132:4000";

export const login = async (username, password) => {
  const rawResponse = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });
  return await rawResponse.json();
};
