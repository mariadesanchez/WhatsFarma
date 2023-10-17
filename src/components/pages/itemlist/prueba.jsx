/* El código anterior... (no ha cambiado) */

<div id="cards" className="lg:col-span-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', gridAutoRows: 'auto' }}>
  {productosPorCategorias.length === 0 &&
    productosFavNoFav.map((product) => (
      <Link to={`/itemDetail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          id='FavNoFav'
          key={product.id}
          className="relative overflow-hidden bg-gray-200 rounded shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
        >
          <img
            className="w-full h-full rounded-lg object-cover"
            src={product.image}
            alt=""
          />
          <div className="flex flex-col justify-center items-center p-6">
            <h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
              {product.title}
            </h5>
            <h3 style={{ fontSize: '18px', lineHeight: '1.2', fontWeight: 'bold' }}>
              $ {product.unit_price}
            </h3>
            <h4 style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 'bold', color: 'green' }}>
              Stock: {product.stock}
            </h4>
            <button
              type="button"
              id="toggleButton"
              onClick={() => actualizarFavoritos(product.id)}
              href="#"
              className="absolute top-2 right-2 rounded bg-primary w-auto h-auto p-1 text-base font-medium uppercase leading-normal text-white shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              {product.fav ?
                (
                  <>
                    <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'none' }} />
                    <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'block' }} />
                  </>
                )
                :
                (
                  <>
                    <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'block' }} />
                    <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'none' }} />
                  </>
                )
              }
            </button>
          </div>
        </div>
      </Link>
    ))}
  {productState.categoriasSeleccionadas.length > 0 &&
    productosPorCategorias.map((product) => (
      <Link to={`/itemDetail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          id='FavNoFav'
          key={product.id}
          className="relative overflow-hidden bg-gray-200 rounded shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
        >
          <img
            className="w-full h-full rounded-lg object-cover"
            src={product.image}
            alt=""
          />
          <div className="flex flex-col justify-center items-center p-6">
            <h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
              {product.title}
            </h5>
            <h3 style={{ fontSize: '18px', lineHeight: '1.2', fontWeight: 'bold' }}>
              $ {product.unit_price}
            </h3>
            <h4 style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 'bold', color: 'green' }}>
              Stock: {product.stock}
            </h4>
            <button
              type="button"
              id="toggleButton"
              onClick={() => actualizarFavoritos(product.id)}
              href="#"
              className="absolute top-2 right-2 rounded bg-primary w-auto h-auto p-1 text-base font-medium uppercase leading-normal text-white shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              {product.fav ?
                (
                  <>
                    <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'none' }} />
                    <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'block' }} />
                  </>
                )
                :
                (
                  <>
                    <img src={corazon} id={product.id} style={{ width: '20px', height: '20px', display: 'block' }} />
                    <img src={corazonRojo} id={product.id + 1} style={{ width: '20px', height: '20px', display: 'none' }} />
                  </>
                )
              }
            </button>
          </div>
        </div>
      </Link>
    ))}
</div>

