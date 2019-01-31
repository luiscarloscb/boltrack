import React, { Component } from "react";
import PinView from "react-native-pin-view";
import { View, Text } from "react-native";
import { fontStyles } from "../styles";
import { aquaGreen } from "../utils/colors";

export class PinAuth extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: aquaGreen,
          justifyContent: "center"
        }}
      >
        <Text style={fontStyles.brandTitle}>Boltrack</Text>
        <Text style={fontStyles.brandSubtitle}>Logistica Satelital</Text>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          {this.props.info}
        </Text>
        <PinView onComplete={this.props.onComplete} pinLength={4} />
      </View>
    );
  }
}
