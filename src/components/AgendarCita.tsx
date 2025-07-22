import React, { useEffect, useState } from 'react';

export function AgendarCita({ token, psicologoId }) {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nombreCliente, setNombreCliente] = useState('');
  const [selectedDisponibilidadId, setSelectedDisponibilidadId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch(`/api/disponibilidades?psicologoId=${psicologoId}&estado=libre`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar disponibilidades');
        return res.json();
      })
      .then(data => {
        setDisponibilidades(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [psicologoId, token]);

  const handleAgendar = () => {
    if (!selectedDisponibilidadId || !nombreCliente) {
      setMensaje('Por favor selecciona una disponibilidad y escribe tu nombre.');
      return;
    }

    fetch('/api/citas/agendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        disponibilidadId: selectedDisponibilidadId,
        nombreCliente,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al agendar la cita');
        return res.json();
      })
      .then(data => {
        setMensaje('Cita agendada con éxito!');
        // Opcional: actualizar lista o limpiar selección
        setSelectedDisponibilidadId(null);
        setNombreCliente('');
      })
      .catch(err => setMensaje(err.message));
  };

  if (loading) return <p>Cargando disponibilidades...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Agendar cita</h3>

      <label>
        Tu nombre:
        <input
          type="text"
          value={nombreCliente}
          onChange={e => setNombreCliente(e.target.value)}
        />
      </label>

      <h4>Selecciona una disponibilidad:</h4>
      <ul>
        {disponibilidades.map(d => (
          <li key={d.id}>
            <label>
              <input
                type="radio"
                name="disponibilidad"
                value={d.id}
                checked={selectedDisponibilidadId === d.id}
                onChange={() => setSelectedDisponibilidadId(d.id)}
              />
              {d.fecha} {d.horaInicio} - {d.horaFin}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handleAgendar}>Agendar</button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
