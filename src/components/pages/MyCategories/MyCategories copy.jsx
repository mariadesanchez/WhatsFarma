/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import ButtonGroup from '@mui/material/ButtonGroup';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button } from '@mui/material';


const MyCategories = () => {
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const categoriasPerPage = 6;
  const [maxCardHeight, setMaxCardHeight] = useState(0);

  useEffect(() => {
    let refCollection = collection(db, 'categorias');
    getDocs(refCollection)
      .then((res) => {
        let newArray = res.docs.map((categoria) => {
          return { ...categoria.data(), id: categoria.id };
        });

        setCategorias(newArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Calcula la altura máxima de las tarjetas
    const cardElements = document.querySelectorAll('.categoria-card');
    let maxHeight = 0;

    cardElements.forEach((card) => {
      const cardHeight = card.getBoundingClientRect().height;
      maxHeight = Math.max(maxHeight, cardHeight);
    });

    setMaxCardHeight(maxHeight);
  }, [categorias]);

  const indexOfLastCategoria = (currentPage + 1) * categoriasPerPage;
  const indexOfFirstCategoria = indexOfLastCategoria - categoriasPerPage;
  const currentCategorias = categorias.slice(indexOfFirstCategoria, indexOfLastCategoria);

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
      <ButtonGroup>
        <div className="d-flex justify-content-center mt-4" >
          <Button style={{ width: '100px', height: '100px', marginRight: '30px',borderRadius:'50px' }}
            variant="contained"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastCategoria >= categorias.length}
          >
            <SkipNextIcon />
          </Button>
        </div>
        {currentCategorias.map((categoria) => (
          <div key={categoria.id} className="mb-6 mr-6">
            <div
              className="categoria-card"
              style={{ height: maxCardHeight + 'px' }}
            >
              <img className="w-full h-200 rounded-lg object-cover" src={categoria.image} style={{ borderRadius: '80px' }} alt="" />
              <div className="flex flex-col justify-center items-center p-6">
                <h5 style={{ fontSize: '14px', lineHeight: '1.3' }}>
                  {categoria.title}
                </h5>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-center mt-4" style={{ width: '200px', height: '200px' }}>
        <Button style={{ width: '100px', height: '100px',borderRadius:'50px' }}
            variant="contained"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <SkipPreviousIcon />
          </Button>
        </div>
      </ButtonGroup>
    </div>
  );
};

export default MyCategories;
