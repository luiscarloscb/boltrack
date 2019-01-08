import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon, Spinner } from "native-base";
import { Camera, Permissions } from "expo";

export class Camara extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  componentWillUnmount() {
    this.setState({
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    });
  }
  render() {
    const { hasCameraPermission, type } = this.state;
    const { isLoading, snap } = this.props;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <Text>No tiene acceso a la camera porfavor revise sus permisos.</Text>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => snap(this.camera)}
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Icon
                    name="ios-camera"
                    style={{ fontSize: 100, color: "white" }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
