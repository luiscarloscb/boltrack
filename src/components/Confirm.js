import React from "react";
import { Modal } from "react-native";
import { Card, Text, CardItem, Button, Content } from "native-base";
export const Confirm = ({ children, onAccept, onDecline, visible }) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {}}
      transparent
      visible={visible}
    >
      <Card
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          position: "relative",
          flex: 1,
          justifyContent: "center"
        }}
      >
        <CardItem style={{ justifyContent: "center" }}>
          <Text>{children}</Text>
        </CardItem>
        <CardItem>
          <Button style={{ margin: 10 }} onPress={onAccept} success>
            <Text>Si</Text>
          </Button>
          <Button style={{ margin: 10 }} onPress={onDecline} danger>
            <Text>No</Text>
          </Button>
        </CardItem>
      </Card>
    </Modal>
  );
};
