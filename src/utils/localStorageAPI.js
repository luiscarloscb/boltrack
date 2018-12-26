import { AsyncStorage } from "react-native";

export const guardarDatos = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error salvando la informacion: " + error);
  }
};

export const obtenerDatos = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("Error obteniendo la informacion: " + error);
  }
};
