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

export const formatearVisitaPlaneada = (VISITA, CLIENTES, TEMAVISITAS) => {
  const { clienteNom, sucursales } = CLIENTES.find(
    item => item.clienteID == VISITA.IDCLIENTE
  );
  const { sucursalNom, sucursalContacto } = sucursales.find(
    item => item.sucursalId == VISITA.IDSUCURSAL
  );
  const { temaNombre } = TEMAVISITAS.find(
    item => item.temaID == VISITA.IDTEMAVISITA
  );
  return `
    NOMBRE CLIENTE: ${clienteNom} \n
    SUCURSAL: ${sucursalNom} \n
    CONTACTO: ${sucursalContacto} \n
    FECHA PLANEADA: ${convertTime(VISITA.FECHAPLANIFICADA)} \n
    TEMA VISITA: ${temaNombre} \n
    `;
};
