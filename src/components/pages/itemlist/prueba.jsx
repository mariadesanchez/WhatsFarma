{modalIsOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 text-black"
    onClick={toggleModal} // Cerrar el modal cuando se hace clic fuera de él
  >
    <div
      className="lg:col-span-1 p-4 rounded-lg shadow-lg"
      style={{ marginTop: '1rem', position: 'absolute', top: 0, left: '120px', zIndex: '100' }}
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
      )}
    </div>
  </div>
)}


