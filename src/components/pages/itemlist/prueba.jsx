import React, { useState } from "react";

const ItemListContainer = () => {
  const [categoriasVisible, setCategoriasVisible] = useState(false);

  const toggleCategorias = () => {
    setCategoriasVisible(!categoriasVisible);
  };

  return (
    <div className="flex justify-center">
      <div
        id="categoriasCards"
        style={{ width: "100%", height: "80px" }} // Ancho de pantalla y altura de 80px
      >
        <div
          id="categorias"
          className="lg:col-span-1"
          style={{
            marginTop: "1rem",
            position: "absolute",
            top: 0,
            left: "120px",
            display: categoriasVisible ? "block" : "none",
          }}
        >
          <h2 className="text-2xl">CATEGORIAS:</h2>
          {/* Resto del contenido de tu desplegable de categorías */}
        </div>
      </div>
      {/* Resto de tu componente */}
      <button onClick={toggleCategorias}>Categorías</button>
    </div>
  );
};

export default ItemListContainer;


<div id="categorias" className="lg:col-span-1" style={{ marginTop: '1rem', position: 'absolute', top: 0, left: '120px' }}>
<div
          id="categorias"
          className="lg:col-span-1"
          style={{
            marginTop: "1rem",
            position: "absolute",
            top: 0,
            left: "120px",
            display: categoriasVisible ? "block" : "none",
          }}
        >
    <h2 className="text-2xl">CATEGORIAS:</h2>
    <IconButton onClick={handleDeleteAllCategories}>
      <DeleteForeverIcon color="primary" />
    </IconButton>
  
    {categorias.map((categoria) => (
      <div key={categoria.id}>
        <label className="text-2xl">
          <input
            style={{
              width: '20px',
              height: '20px',
            }}
            type="checkbox"
            value={categoria.id}
            checked={productState.categoriasSeleccionadas.some(c => c.id === categoria.id)}
            onChange={() => handleCheckboxChange(categoria.id, categoria.title)}
          />
          {categoria.title}
        </label>
      </div>
    ))}
  </div>
  <button onClick={toggleCategorias}>Categorías</button>

  </div>

