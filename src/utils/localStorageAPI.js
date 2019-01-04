import { AsyncStorage } from "react-native";

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

export const guardarPlanLocal = async (plan, cb) => {
  try {
    const PLANES = await obtenerDato("PLANES");
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
