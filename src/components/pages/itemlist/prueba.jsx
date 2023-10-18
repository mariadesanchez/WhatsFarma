import React from 'react';

function ItemListContainer() {
  return (
    <>
      {/* Tu código JSX existente del componente ItemListContainer */}
      <div id='categoriasCards' className="flex flex-col md:flex-row" style={{ marginTop: '100px', position: 'relative' }}>
        {/* ...otros elementos y lógica de tu componente... */}
      </div>

      {/* Sección de la cartera que proporcionaste */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Portfolio</h2>
            <h3>Check our <span>Portfolio</span></h3>
            <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
          </div>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <li data-filter="*" className="filter-active">All</li>
                <li data-filter=".filter-app">App</li>
                <li data-filter=".filter-card">Card</li>
                <li data-filter=".filter-web">Web</li>
              </ul>
            </div>
          </div>
          <div className="row portfolio-container">
            {/* Aquí debes incluir tus elementos de cartera */}
          </div>
        </div>
      </section>
    </>
  );
}

export default ItemListContainer;
