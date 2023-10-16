/* eslint-disable no-undef */
import { useContext, useEffect } from "react"
import { useState } from "react"
import { db } from "../../../firebaseConfig"
import {getDocs, collection, query, where} from "firebase/firestore"
import { AuthContext } from "../../../context/AuthContext"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { usecontextGlobal } from '../../../context/GlobalContext'


const UserOrders = () => {

  const [myOrders, setMyOrders] = useState([])
  const {user} = useContext(AuthContext)
  const { productState } = usecontextGlobal();

  useEffect(()=>{

    const ordersCollections = collection(db, "orders")
    let ordersFiltered = query( ordersCollections,
       where("email", "==", user.email) )
    getDocs(ordersFiltered).then(res => {
      const newArr = res.docs.map( order => {
        return {...order.data(), id: order.id}
      })
      setMyOrders(newArr)
    }).catch(error => console.log(error))


  },[user.email])

console.log(myOrders)
  return (
    <div>
       
        <TableContainer component={Paper}>
        { myOrders.map( order => {
            return <div key={order.id}>
              {
                order?.items?.map( product => {
            
                  return <div key={product.id} >
        <Table sx={{ minWidth: '650',maxWidth:'100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
        
              <TableCell align="left">Producto</TableCell>
              <TableCell align="left">Cantidad</TableCell>
              <TableCell align="left">Precio</TableCell>
              <TableCell align="left">Costo de Envio</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">imagen</TableCell>
             
            
            </TableRow>
          </TableHead>
          
         
          <TableBody>
         

          <TableRow>
        
        <TableCell align="left">{product.title}</TableCell>
        <TableCell align="left">{product.quantity}</TableCell>
        <TableCell align="left">{product.unit_price}</TableCell>
        <TableCell align="left">{order.subTotal}</TableCell>
        <TableCell align="left">{order.total}</TableCell>
        <TableCell align="left">{order.email}</TableCell>
        <TableCell align="left"><img
                    src={product.image}
                    alt=""
                    style={{ width: "120px", height: "120px" }}
                  /></TableCell>
     
      
      </TableRow>
     
      </TableBody>
        
        </Table>
        </div>
                })
              }
          
            </div>
          })
        }
      </TableContainer>
    </div>
  )
}

export default UserOrders