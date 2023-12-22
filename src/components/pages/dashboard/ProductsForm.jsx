/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { db, uploadFile } from "../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import MenuItem from '@mui/material/MenuItem';
const ProductsForm = ({
  handleClose,
  setIsChange,
  productSelected,
  setProductSelected,
  categorias
  
}) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    unit_price: 0,
    stock: 0,
    category: "",
    image: "",
  });
  const [url, setUrl] = useState(null)
  const [file, setFile] = useState(null);

  const handleImage = async () => {
    setIsLoading(true);
    let url = await uploadFile(file);
    setUrl(url)
   

    if (productSelected) {
      setProductSelected({ ...productSelected, image: url });
    } else {
      setNewProduct({ ...newProduct, image: url });
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    if (productSelected) {
      setProductSelected({
        ...productSelected,
        [e.target.name]: e.target.value,
      });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productsCollection = collection(db, "products");

    if (productSelected) {
      let obj = {
        ...productSelected,
        //con el + le indicamos que es numérico tanto precio como stock
        unit_price: +productSelected.unit_price,
        stock: +productSelected.stock,
      };
      updateDoc(doc(productsCollection, productSelected.id), obj).then(() => {
        setIsChange(true);
        handleClose();
      });
    } else {
      let obj = {
        ...newProduct,
                //con el + le indicamos que es numérico tanto precio como stock

        unit_price: +newProduct.unit_price,
        stock: +newProduct.stock,
      };
      addDoc(productsCollection, obj).then(() => {
        setIsChange(true);
        handleClose();
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
        <h1>Nuevo Producto</h1>
        <TextField
          variant="outlined"
          defaultValue={productSelected?.title}
          label="nombre"
          name="title"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.description}
          label="descripcion"
          name="description"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.unit_price}
          label="precio"
          name="unit_price"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.stock}
          label="stock"
          name="stock"
          onChange={handleChange}
        />
        <TextField
         select
         variant="outlined"
         defaultValue={productSelected?.category}
         label="Categoría"
         name="category"
         onChange={handleChange}
        >
       {categorias.map((categoria) => (
       <MenuItem key={categoria.id} value={categoria.title}>
       {categoria.title}
       </MenuItem>
        ))}
      </TextField>
        <div >
          {url && (
          <img
          src={url}
          alt=""
          style={{ width: "80px", height: "80px", border :'none' }}
        />)}
                  <img
                    src={productSelected?.image}
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
          <Button variant="contained" type="submit">
            {productSelected ? "modificar" : "crear"}
          </Button>
        {/* )} */}
      </form>
    </div>
  );
};

export default ProductsForm;
