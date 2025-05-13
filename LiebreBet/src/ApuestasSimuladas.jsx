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
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Sitio de Apuestas Deportivas Simulado</h1>
      <p style={{ fontSize: '0.875rem' }}>Usuario: {usuario} | Saldo: ${saldo}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {partidosEjemplo.map((partido) => (
          <div key={partido.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ fontWeight: '600' }}>{partido.equipos}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button onClick={() => apostar(partido, "local")}>Local ({partido.cuotaLocal})</button>
              <button onClick={() => apostar(partido, "visita")}>Visita ({partido.cuotaVisita})</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Historial de Apuestas</h2>
        {apuestas.length === 0 && <p style={{ fontSize: '0.875rem' }}>Aún no realizaste apuestas.</p>}
        <ul style={{ paddingLeft: '1rem' }}>
          {apuestas.map((ap, index) => (
            <li key={index} style={{ fontSize: '0.875rem' }}>
              {ap.partido} - {ap.tipo.toUpperCase()} | Monto: ${ap.monto} | Cuota: {ap.cuota} | Posible ganancia: ${ap.gananciaPosible.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}