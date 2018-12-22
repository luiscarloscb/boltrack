import { StyleSheet } from "react-native";
import { white } from "../utils/colors";
commonStyle = {
  fontWeight: "bold",
  textAlign: "center"
};
export const fontStyles = StyleSheet.create({
  titleStyle: {
    fontSize: 25,
    textAlign: "center",
    lineHeight: 40
  },
  SubtitleStyle: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 40
  },
  errorStyled: {
    fontSize: 20,
    color: "red",
    backgroundColor: "transparent",
    ...commonStyle
  },
  brandTitle: {
    backgroundColor: "transparent",
    fontSize: 40,
    color: white,
    ...commonStyle
  },
  brandSubtitle: {
    backgroundColor: "transparent",
    fontSize: 25,
    color: white,
    ...commonStyle
  }
});
