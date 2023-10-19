<div className="column-derecha" style={{marginTop:'250px'}}> 

<div id='categoriasCards' className="flex justify-center" style={{ marginTop: '100px', position: 'relative' }}>
<div id="cards" className="lg:col-span-1" style={{ display: 'inline-block' }}>
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" style={{ gridAutoRows: "auto" }}>
        {
          productosFavNoFav.map((product) => {
            return (
                <div id='FavNoFav' key={product.id} className="relative overflow-hidden bg-gray-200 rounded shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                  <img
                    className="w-full h-200 rounded-lg object-cover"

                    src={product.image}
                    alt="" />

                  <div className="flex flex-col justify-center items-center p-6">
                  <Link to={`/itemDetail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                    <h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
                      {product.title}
                    </h5>
                    <h3 style={{ fontSize: '18px', lineHeight: '1.2', fontWeight: 'bold' }}>
                      $ {product.unit_price}
                    </h3>
                    <h4 style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 'bold', color: 'green' }}>
                      Stock: {product.stock}
                    </h4>
                    </Link>
                  
                  </div>
                </div>
           

            );
          })}
      </div>
    </div>
  </div>
</div>
</div>