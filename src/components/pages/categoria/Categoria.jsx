// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// import { db } from "./firebaseConfig"; // Importa la configuración de Firebase
// import { useEffect } from "react";

import { db } from "../../../firebaseConfig";
// import { collection, getDocs, updateDoc, doc, } from "firebase/firestore";
// import ProductsList from "./ProductsList";
// import { Box, Button, Modal, TextField } from "@mui/material";
// import { usecontextGlobal } from '../../../context/GlobalContext'
function Categoria() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenURL, setImagenURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Agrega una nueva categoría a Firestore
      await db.collection("categorias").add({
        nombre: nombre,
        descripcion: descripcion,
        imagenURL: imagenURL,
      });

      // Limpia los campos del formulario después de agregar la categoría
      setNombre("");
      setDescripcion("");
      setImagenURL("");
      
      alert("Categoría agregada exitosamente");
    } catch (error) {
      console.error("Error al agregar la categoría: ", error);
    }
  };

  return (
    <div>
      <h2>Crear Nueva Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>URL de la imagen:</label>
          <input
            type="text"
            value={imagenURL}
            onChange={(e) => setImagenURL(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Categoría</button>
      </form>
    </div>
  );
}

export default Categoria;
