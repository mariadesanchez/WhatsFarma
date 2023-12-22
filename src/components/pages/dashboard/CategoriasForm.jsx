/* eslint-disable no-undef */
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { db, uploadFile } from "../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const CategoriasForm = ({
  handleCloseCategoria,
  setIsChangeCategoria,
  categoriaSelected,
  setCategoriaSelected,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const [newCategoria, setNewCategoria] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [url, setUrl] = useState(null)
  const [file, setFile] = useState(null);

  const handleImage = async () => {
    setIsLoading(true);
    let url = await uploadFile(file);
    setUrl(url)
    //aca yo tendria que acortar la url
    

    if (categoriaSelected) {
      setCategoriaSelected({ ...categoriaSelected, image: url });
    } else {
      setNewCategoria({ ...newCategoria, image: url });
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    if (categoriaSelected) {
      setCategoriaSelected({
        ...categoriaSelected,
        [e.target.name]: e.target.value,
      });
    } else {
      setNewCategoria({ ...newCategoria, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoriasCollection = collection(db, "categorias");

    if (categoriaSelected) {
      let obj = {
        ...categoriaSelected,
        // unit_price: +productSelected.unit_price,
        // stock: +productSelected.stock,
      };
      updateDoc(doc(categoriasCollection,
         categoriaSelected.id), obj).then(() => {
        setIsChangeCategoria(true);
        handleCloseCategoria();
      });
    } else {
      let obj = {
        ...newCategoria,
        // unit_price: +newProduct.unit_price,
        // stock: +newProduct.stock,
      };
      addDoc(categoriasCollection, obj).then(() => {
        setIsChangeCategoria(true);
        handleCloseCategoria();
      });
    }
 
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1>Nueva Categoría</h1>
        <TextField
          variant="outlined"
          defaultValue={categoriaSelected?.title}
          label="nombre"
          name="title"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={categoriaSelected?.description}
          label="descripcion"
          name="description"
          onChange={handleChange}
        />
     
        <div >
          {url && (
          <img
          src={url}
          alt=""
          style={{ width: "80px", height: "80px", border :'none' }}
        />)}
                  <img
                    src={categoriaSelected?.image}
                    alt=""
                    style={{ width: "80px", height: "80px", border :'none' }}
                  />
      
        </div>
        <TextField type="file" onChange={(e) => setFile(e.target.files[0])} multiple />
        {file && (
          <Button onClick={handleImage} type="button">
            Cargar imagen
          </Button>
         )}
        {/* {file && !isLoading && ( */}
          <Button variant="contained" type="submit" color="secondary">
            {categoriaSelected? "modificar" : "crear"}
          </Button>
        {/* )} */}
      </form>
    </div>
  );
};

export default CategoriasForm;
