{
  productosFavNoFav.map((product) => {
    return (
      <div key={product.id} className="relative overflow-hidden bg-gray-200 rounded shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
        <img
          className="w-full md:w-96 h-80 md:h-96 rounded-lg object-cover"
          src={product.image}
          alt=""
        />
        <div className="flex flex-col justify-center items-center p-6">
          <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {product.title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Precio: {product.unit_price}
          </p>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Stock: {product.stock}
          </p>
          <Link to={`/itemDetail/${product.id}`}>Ver detalle</Link>
          <button
            type="button"
            id="toggleButton"
            onClick={() => actualizarFavoritos(product.id)}
            href="#"
            className="inline-block rounded bg-primary px-8 py-3 text-base font-medium uppercase leading-normal text-white shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            {product.fav ?
              (
                <>
                  <img src={corazon} id={product.id} style={{ width: '40px', height: '40px', display: 'none' }} />
                  <img src={corazonRojo} id={product.id + 1} style={{ width: '40px', height: '40px', display: 'block' }} />
                </>
              )
              :
              (
                <>
                  <img src={corazon} id={product.id} style={{ width: '40px', height: '40px', display: 'block' }} />
                  <img src={corazonRojo} id={product.id + 1} style={{ width: '40px', height: '40px', display: 'none' }} />
                </>
              )
            }
          </button>
        </div>
      </div>
    );
  })}