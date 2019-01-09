import React from "react";
import { Container, Text, Body, Card, CardItem } from "native-base";
import { cakeGreen, pale } from "../utils/colors";
import { formatearVisitaDetallada } from "../utils/helpers";

export const VisitaDetalles = ({ visita, CLIENTES, TEMAVISITAS, INSUMOS }) => (
  <Card>
    <CardItem>
      <Body>
        <Text style={{ color: "black" }}>
          {formatearVisitaDetallada(visita, CLIENTES, TEMAVISITAS, INSUMOS)}
        </Text>
      </Body>
    </CardItem>
  </Card>
);
