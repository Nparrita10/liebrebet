import React, { useState } from "react";

const partidosEjemplo = [
  { id: 1, equipos: "River vs Boca", cuotaLocal: 1.9, cuotaVisita: 2.2 },
  { id: 2, equipos: "Independiente vs Racing", cuotaLocal: 2.0, cuotaVisita: 1.8 },
  { id: 3, equipos: "Rosario Central vs Newell's", cuotaLocal: 2.1, cuotaVisita: 2.1 },
];

export default function ApuestasSimuladas() {
  const [usuario, setUsuario] = useState("invitado");
  const [saldo, setSaldo] = useState(1000);
  const [apuestas, setApuestas] = useState([]);

  const apostar = (partido, tipo) => {
    const monto = 100;
    if (saldo < monto) return alert("Saldo insuficiente");

    const cuota = tipo === "local" ? partido.cuotaLocal : partido.cuotaVisita;
    const nuevaApuesta = {
      partido: partido.equipos,
      tipo,
      cuota,
      monto,
      gananciaPosible: monto * cuota,
    };
    setApuestas([...apuestas, nuevaApuesta]);
    setSaldo(saldo - monto);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sitio de Apuestas Deportivas Simulado</h1>
      <p>Usuario: {usuario} | Saldo: ${saldo}</p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {partidosEjemplo.map((partido) => (
          <div key={partido.id} style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
            <p><strong>{partido.equipos}</strong></p>
            <button onClick={() => apostar(partido, "local")}>Local ({partido.cuotaLocal})</button>
            <button onClick={() => apostar(partido, "visita")}>Visita ({partido.cuotaVisita})</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Historial de Apuestas</h2>
        {apuestas.length === 0 && <p>Aún no realizaste apuestas.</p>}
        <ul>
          {apuestas.map((ap, index) => (
            <li key={index}>
              {ap.partido} - {ap.tipo.toUpperCase()} | Monto: ${ap.monto} | Cuota: {ap.cuota} | Posible ganancia: ${ap.gananciaPosible.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
