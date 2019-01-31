export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export const convertTime = unix_timestamp => {
  const a = new Date(unix_timestamp);
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  return `${date} ${month} ${year}`;
};

export const obtenerClienteById = (CLIENTES, clienteID) => {
  let cliente = CLIENTES.find(item => item.clienteID == clienteID);
  return cliente;
};

export const obtenerSucursalById = (SUCURSALES, sucursalID) => {
  let sucursal = SUCURSALES.find(item => item.sucursalId == sucursalID);
  return sucursal;
};

export const formatearVisitaPlaneada = (VISITA, CLIENTES, TEMAVISITAS) => {
  const { clienteNom, sucursales } = CLIENTES.find(
    item => item.clienteID == VISITA.IDCLIENTE
  );
  const { sucursalNom, sucursalContacto } = sucursales.find(
    item => item.sucursalId == VISITA.IDSUCURSAL
  );
  let temaNombre;
  if (VISITA.IDTEMAVISITA > 0) {
    temaNombre = TEMAVISITAS.find(item => item.temaID == VISITA.IDTEMAVISITA)
      .temaNombre;
  }

  return {
    clienteNom,
    sucursalNom,
    sucursalContacto,
    fechaPlanificada: VISITA.FECHAPLANIFICADA
      ? convertTime(VISITA.FECHAPLANIFICADA)
      : "La visita no fue planeada",
    temaNombre: temaNombre ? temaNombre : "No asignado"
  };
};

export const formatearVisitaDetallada = (VISITA, CLIENTES, TEMAVISITAS) => {
  const { clienteNom, sucursales } = CLIENTES.find(
    item => item.clienteID == VISITA.IDCLIENTE
  );
  const { sucursalNom, sucursalContacto } = sucursales.find(
    item => item.sucursalId == VISITA.IDSUCURSAL
  );
  let temaNombre =
    VISITA.IDTEMAVISITAS <= 0
      ? TEMAVISITAS.find(item => item.temaID == VISITA.IDTEMAVISITA)
      : "No tema seleccionado";
  return `
    NOMBRE CLIENTE: ${clienteNom} \n
    SUCURSAL: ${sucursalNom} \n
    CONTACTO: ${sucursalContacto} \n
    FECHA PLANEADA: ${convertTime(VISITA.FECHAPLANIFICADA)} \n
    TEMA VISITA: ${temaNombre} \n
    `;
};

export const encontrarSucursal = (IDCLIENTE, CLIENTES) => {
  const cliente = CLIENTES.find(cliente => cliente.clienteID == IDCLIENTE);
  return cliente ? cliente.sucursales : [];
};

export const encontrarContacto = (SUCURSALES, IDSUCURSAL) => {
  const sucursal = SUCURSALES.find(sucur => sucur.sucursalId == IDSUCURSAL);
  return sucursal ? sucursal.sucursalContacto : "SUCURSAL NO SELECCIONADA";
};
