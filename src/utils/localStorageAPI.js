import { AsyncStorage } from "react-native";

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error salvando la informacion: " + error);
  }
};
