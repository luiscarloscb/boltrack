import { AsyncStorage } from "react-native";
import { uuidv4 } from "../utils/helpers";

export const guardarDato = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error salvando la informacion: " + error);
  }
};

export const obtenerDato = async key => {
  try {
    dato = await AsyncStorage.getItem(key);

    return await JSON.parse(dato);
  } catch (error) {
    console.log("Error obteniendo la informacion: " + error);
  }
};

export const eliminarDatos = async keys => {
  try {
    return await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.log("Error Eliminando la informacion: " + error);
  }
};
export const eliminarDato = async key => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error Eliminando la informacion: " + error);
  }
};
export const guardarPlanLocal = async (plan, cb) => {
  try {
    const PLANES = await obtenerDato("PLANES");
    plan.IDVISITA = uuidv4();
    plan.ESTADO = "PENDIENTE";
    if (Array.isArray(PLANES)) {
      await guardarDato("PLANES", [...PLANES, plan]);
      cb();
      alert("200 OK");
    } else {
      await guardarDato("PLANES", [plan]);
      cb();
      alert("200 OK");
    }
  } catch (e) {
    alert("400 error");
  }
};

export const obtenerPlanesLocal = async (plan, cb) => {
  try {
    const PLANES = await obtenerDato("PLANES");
    return Array.isArray(PLANES) ? PLANES : [];
  } catch (e) {
    alert("Error obteniendo la lista de planes");
  }
};

export const guardarVisitaRealizada = async (visita, cb) => {
  try {
    visita.ESTADO = "COMPLETADA";
    const PLANES = await obtenerDato("PLANES");
    await eliminarDato("PLANES");
    const visitas = PLANES.filter(plan => plan.IDVISITA !== visita.IDVISITA);
    await guardarDato("PLANES", visitas.concat(visita));
    alert("200 OK");
    cb();
  } catch (e) {
    alert("400 error");
  }
};

export const eliminarVisita = async IDVISITA => {
  try {
    const PLANES = await obtenerDato("PLANES");
    await eliminarDato("PLANES");
    const visitas = PLANES.filter(plan => plan.IDVISITA !== IDVISITA);
    await guardarDato("PLANES", visitas);
    alert("La visita se elimino correctamente");
  } catch (e) {
    alert("400 error");
  }
};
