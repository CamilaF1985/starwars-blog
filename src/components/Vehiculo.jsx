import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Vehiculo = ({ vehiculoId }) => {
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    const obtenerVehiculo = async () => {
      try {
        const response = await axios.get(`https://www.swapi.tech/api/vehicles/${vehiculoId}`);
        setVehiculo(response.data);
      } catch (error) {
        console.error('Error al obtener el vehículo:', error);
      }
    };

    obtenerVehiculo();
  }, [vehiculoId]);

  if (!vehiculo) {
    return null;
  }

  const properties = vehiculo.result && vehiculo.result.properties;

  if (!properties) {
    console.error('Las propiedades del vehículo son nulas.');
    return null;
  }

  const { name, model, manufacturer } = properties;

  return (
    <div className="card">
      <img
        src="http://placehold.it/400x200"
        className="card-img-top"
        alt="Placehold.it"
      />
      <div className="card-body">
        <h5 className="card-title">{name || 'N/A'}</h5>
        <p className="card-text">
          <strong>Modelo:</strong> {model || 'N/A'}<br />
          <strong>Fabricante:</strong> {manufacturer || 'N/A'}
        </p>
        <Link to={`/vehiculos/${vehiculoId}`} className="btn btn-outline-primary">
          Acerca de
        </Link>
        <button className="btn btn-outline-warning" type="button">
          <i className="bi bi-heart"></i> Favoritos
        </button>
      </div>
    </div>
  );
};

export default Vehiculo;



