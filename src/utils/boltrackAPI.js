import { eliminarVisita } from "./localStorageAPI";

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

export const registrarVisita = async (visita, cb) => {
  const rawResponse = await fetch(`${URL}/registrarVisita`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(visita)
  });
  await eliminarVisita(visita.IDVISITA);
  cb();
  return await rawResponse.json();
};

export const registrarPlan = async (plan, cb) => {
  const rawResponse = await fetch(`${URL}/registrarPlan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(plan)
  });
  cb();
  return await rawResponse.json();
};
