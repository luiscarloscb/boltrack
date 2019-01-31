import React, { Fragment } from "react";
import {
  Card,
  CardItem,
  Button,
  H3,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";
import { Modal } from "react-native";
import { obtenerClienteById, obtenerSucursalById } from "../utils/helpers";
import { FORMA_PAGO_DATA } from "../utils/const";
import PropTypes from "prop-types";

const textStyle = { fontSize: 13 };

export const PreOrden = ({
  visible,
  OnToggle = () => {},
  CLIENTES,
  INSUMOS,
  orden
}) => {
  const {
    IDCLIENTE,
    IDSUCURSAL,
    FECHAORDEN,
    FORMAPAGO,
    ARTICULOS,
    CUOTAS,
    CAMPANA,
    FECHAENTREGA
  } = orden;
  const clienteById = obtenerClienteById(CLIENTES, IDCLIENTE);
  const isValid = typeof clienteById === "object";

  return (
    <Fragment>
      <Button onPress={OnToggle} transparent full style={{ flex: 1 }}>
        <Text>Visualizar Orden</Text>
      </Button>
      <Modal
        animationType="slide"
        onRequestClose={() => {}}
        visible={visible}
        transparent
      >
        <Card
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            position: "relative",
            flex: 1,
            justifyContent: "center"
          }}
        >
          <CardItem>
            <Left />
            <Body style={{ flex: 3 }}>
              <H3>Orden de Pedido</H3>
            </Body>
            <Right />
          </CardItem>
          <CardItem>
            <H3>Cliente: </H3>
            <Text style={textStyle}>
              {isValid ? clienteById.clienteNom : ""}
            </Text>
          </CardItem>
          <CardItem>
            <H3>Sucursal: </H3>
            <Text style={textStyle}>
              {isValid && IDSUCURSAL > 0
                ? obtenerSucursalById(clienteById.sucursales, IDSUCURSAL)
                    .sucursalNom
                : ""}
            </Text>
          </CardItem>
          <CardItem>
            <H3>CAMPANA: </H3>
            <Text style={textStyle}>{CAMPANA} </Text>
          </CardItem>
          <CardItem>
            <H3>Forma de Pago: </H3>
            <Text style={textStyle}>
              {isValid && FORMAPAGO > 0
                ? FORMA_PAGO_DATA.find(a => a.formaPagoId === FORMAPAGO)
                    .formaPagoNom
                : ""}
            </Text>
          </CardItem>
          <CardItem>
            <H3># Cuotas:</H3>
            <Text style={textStyle}>{CUOTAS} </Text>
          </CardItem>
          <CardItem>
            <H3>Fecha: </H3>
            <Text style={textStyle}>
              {FECHAORDEN.toString().substr(4, 12)}{" "}
            </Text>
          </CardItem>
          <CardItem>
            <H3>Fecha Entrega: </H3>
            <Text style={textStyle}>
              {FECHAENTREGA.toString().substr(4, 12)}{" "}
            </Text>
          </CardItem>
          <CardItem>
            <List
              dataArray={[
                {
                  articuloID: "Articulo",
                  cantidad: "Cantidad",
                  precioBase: "Precio",
                  precioTotal: "Precio Total"
                },
                ...ARTICULOS
              ]}
              renderRow={item => (
                <ListItem
                  style={{
                    flex: 4,
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={textStyle}>
                    {item.articuloID > 0
                      ? INSUMOS.find(
                          insumo => insumo.insumoID == item.articuloID
                        ).insumoNombre
                      : item.articuloID}
                  </Text>
                  <Text style={textStyle}> {item.cantidad}</Text>
                  <Text style={textStyle}>
                    {parseFloat(item.precioBase) >= 0
                      ? parseFloat(item.precioBase)
                      : item.precioBase}
                  </Text>
                  <Text style={textStyle}>
                    {item.precioTotal
                      ? item.precioTotal
                      : item.cantidad * item.precioBase}
                  </Text>
                </ListItem>
              )}
            />
          </CardItem>
          <CardItem>
            <H3>Total a Pagar: </H3>
            <Text>
              {ARTICULOS.reduce((a, b) => {
                a = a + parseFloat(b.precioBase) * b.cantidad;
                return a;
              }, 0)}
            </Text>
          </CardItem>
          <CardItem>
            <Button success block onPress={OnToggle}>
              <Text>Cerrar</Text>
            </Button>
          </CardItem>
        </Card>
      </Modal>
    </Fragment>
  );
};

PreOrden.propTypes = {
  visible: PropTypes.bool.isRequired,
  OnToggle: PropTypes.func.isRequired,
  CLIENTES: PropTypes.arrayOf(
    PropTypes.shape({
      clienteID: PropTypes.number.isRequired,
      clienteNom: PropTypes.string.isRequired
    })
  ).isRequired,
  INSUMOS: PropTypes.arrayOf(
    PropTypes.shape({
      insumoID: PropTypes.number.isRequired,
      insumoNombre: PropTypes.string.isRequired
    })
  ).isRequired,
  orden: PropTypes.shape({
    IDCLIENTE: PropTypes.number.isRequired,
    IDSUCURSAL: PropTypes.number.isRequired,
    FECHAORDEN: PropTypes.instanceOf(Date).isRequired,
    IDFORMAPAGO: PropTypes.number.isRequired,
    CUOTAS: PropTypes.string.isRequired,
    IDCAMPANA: PropTypes.number.isRequired,
    FECHAENTREGA: PropTypes.instanceOf(Date).isRequired,
    ARTICULOS: PropTypes.arrayOf(
      PropTypes.shape({
        articuloID: PropTypes.number.isRequired,
        cantidad: PropTypes.number.isRequired,
        precioBase: PropTypes.number.isRequired
      })
    )
  }).isRequired
};
