import { eliminarVisita } from "./localStorageAPI";

const URL = "http://192.175.109.132:4000";
const URL_TEST = "http://192.175.109.132:4001";

export const login = async (username, password) => {
  const rawResponse = await fetch(`${URL}/login2`, {
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
  console.log(rawResponse);
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

export const registrarOrden = async orden => {
  const rawResponse = await fetch(`${URL}/registrarOrden`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orden)
  });
  return await rawResponse.json();
};
export const getClientes = async () => {
  const rawResponse = await fetch(`${URL}/obtener_clientes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await rawResponse.json();
};
