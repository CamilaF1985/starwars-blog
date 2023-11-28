import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);

  useEffect(() => {
    const obtenerPersonaje = async () => {
      try {
        const response = await axios.get(`https://www.swapi.tech/api/people/${id}`);
        setPersonaje(response.data);
      } catch (error) {
        console.error(`Error al obtener el personaje:`, error);
      }
    };

    obtenerPersonaje();
  }, [id]);

  if (!personaje) {
    return <p>Cargando...</p>;
  }

  const properties = personaje.result?.properties;

  if (!properties) {
    console.error(`Las propiedades del personaje son nulas.`);
    return <p>No se encontraron propiedades para este personaje.</p>;
  }

  const { name, description, ...restProperties } = properties;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna de la imagen */}
        <div className="col-md-4">
          <img src="http://placehold.it/400x300" alt="Imagen de muestra" className="img-fluid" />
        </div>

        {/* Columna del nombre y párrafo */}
        <div className="col-md-8">
          <h2>{name || 'N/A'}</h2>
          <p>{description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
        </div>
      </div>

      {/* Espacio entre filas */}
      <div className="my-4"></div>

      {/* Fila de propiedades */}
      <div className="row">
        {Object.entries(restProperties).map(([key, value]) => (
          <div className="col-md-3" key={key}>
            <strong style={{ color: 'red' }}>{key}:</strong> {value || 'N/A'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetalleProducto;







