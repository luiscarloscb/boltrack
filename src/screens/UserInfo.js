import React from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";

export const UserInfo = props => (
  <Container style={{ backgroundColor: "#EEEEEE" }}>
    <Content style={{ paddingHorizontal: 10 }}>
      <Card>
        <CardItem>
          <Text>
            {`NOMBRE: ${props.navigation.state.params.DATA.NOMBREUSUARIO}`}
          </Text>
        </CardItem>
        <CardItem>
          <Text>{`CODIGO: ${props.navigation.state.params.DATA.CODIGO} `}</Text>
        </CardItem>
        <CardItem>
          <Text>
            {`EMPRESA: ${props.navigation.state.params.DATA.EMPRESA}`}
          </Text>
        </CardItem>
      </Card>
    </Content>
    <Footer>
      <FooterTab>
        <Button
          vertical
          onPress={() =>
            props.navigation.navigate("Opciones", {
              ...props.navigation.state.params
            })
          }
        >
          <Icon name="ios-apps" />
        </Button>
        <Button vertical active onPress={() => {}}>
          <Icon name="ios-person" />
        </Button>
      </FooterTab>
    </Footer>
  </Container>
);
