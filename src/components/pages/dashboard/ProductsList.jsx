import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { db } from "../../../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProductsForm from "./ProductsForm";
import CategoriasForm from "./CategoriasForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductsList = ({ products, setIsChange, categorias, setIsChangeCategoria }) => {
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [openCategoria, setOpenCategoria] = useState(false);
  const [categoriaSelected, setCategoriaSelected] = useState(null);
  const [productClick, setProductClick] = useState(false);
  const [categoriaClick, setCategoriaClick] = useState(false);

//eliminar un producto
  const deleteProduct = (id) => {
    deleteDoc(doc(db, "products", id));
    setIsChange(true);
  };

  //eliminar una categoria
  const deleteCategoria = (id) => {
    deleteDoc(doc(db, "categorias", id));
    setCategoriaClick(true);
    setIsChange(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleProductClick = () => {
    setProductClick(true);
    setCategoriaClick(false)
  };

  const handleOpen = (product) => {
    setProductSelected(product);
    setProductClick(true);
    setOpen(true);
  };

   // eslint-disable-next-line no-unused-vars
   const handleCloseCategoria = () => {
    setOpenCategoria(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleOpenCategoria = (categoria) => {
    // eslint-disable-next-line no-undef
    setCategoriaSelected(categoria);
    setOpenCategoria(true);
  };
  const handleCategoriaClick = () => {
   
    setCategoriaClick(true); 
    setProductClick(false);
  };
  return (
    <div>
      
       <Button variant="contained" onClick={() => handleProductClick()}    style={{ marginBottom: '20px', marginRight: '10px' }}>
       Productos
      </Button>
      {productClick&&
      <Button variant="contained" onClick={() => handleOpen(null)}    style={{ marginBottom: '20px', marginRight: '10px' }}>
       Nuevo Producto
      </Button>
}   <Button variant="contained" color="secondary" onClick={() => handleCategoriaClick()}    style={{ marginBottom: '20px', marginRight: '10px' }}>
       Categorias
      </Button>
{categoriaClick&&
      <Button
        variant="contained"
        onClick={() => handleOpenCategoria(null)}
        color="secondary"
        style={{ marginBottom: '20px', marginRight: '10px' }}
      >
        Nueva Categoría
      </Button>}
     
      {/* tabla para mostrar los productos */}
      {productClick&&
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell align="left">id</TableCell> */}
              <TableCell align="left">titulo</TableCell>
              <TableCell align="left">precio</TableCell>
              <TableCell align="left">stock</TableCell>
              <TableCell align="left">imagen</TableCell>
              <TableCell align="left">categoria</TableCell>
              <TableCell align="left"> Editar Producto</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row" align="left">
                  {product.id}
                </TableCell> */}
                <TableCell component="th" scope="row" align="left">
                  {product.title}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.unit_price}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.stock}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.category}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <IconButton onClick={() => handleOpen(product)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <DeleteForeverIcon color="primary" />
                  </IconButton>
                </TableCell>
                </TableRow>
               
            ))}
             </TableBody>
        </Table>
      </TableContainer>}

    {/* tabla para mostrar las categorias   */}
    {categoriaClick&&
      <TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      {/* <TableCell align="left">id</TableCell> */}
      <TableCell align="left">Título</TableCell>
      <TableCell align="left">Descripción</TableCell>
      <TableCell align="left">imagen</TableCell>
      <TableCell align="left">Editar Categoría</TableCell>
   

    </TableRow>
  </TableHead>
  <TableBody>
{categorias.map((categoria) => (
  <TableRow
    key={categoria.id}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
      <TableCell component="th" scope="row" align="left">
                  {categoria.title}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {categoria.description}
                </TableCell> 
                <TableCell component="th" scope="row" align="left">
                  <img
                    src={categoria.image}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell>       
 <TableCell component="th" scope="row" align="left">
                  <IconButton onClick={() => handleOpenCategoria(categoria)}>
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton onClick={() => deleteCategoria(categoria.id)}>
                    <DeleteForeverIcon color="secondary" />
                  </IconButton>
                </TableCell>            
              </TableRow>                       
                ))}
                </TableBody>
        </Table>
      </TableContainer>}

        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProductsForm
            handleClose={handleClose}
            setIsChange={setIsChange}
            productSelected={productSelected}
            setProductSelected={setProductSelected}
            categorias={categorias}
          />
        </Box>
      </Modal>
      <Modal
        open={openCategoria}
        onClose={handleCloseCategoria}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <CategoriasForm
            handleCloseCategoria={handleCloseCategoria}
            setIsChangeCategoria={setIsChangeCategoria}
            categoriaSelected={categoriaSelected}
            setCategoriaSelected={setCategoriaSelected}
            categorias={categorias}
          
          />
        </Box>
      </Modal>
    
    
    </div>
  );
};

export default ProductsList;
