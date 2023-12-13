/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useContext, useEffect } from "react"
import { useState } from "react"
import { db } from "../../../firebaseConfig"
import {getDocs, collection, query, where} from "firebase/firestore"
import { AuthContext } from "../../../context/AuthContext"
import { usecontextGlobal } from '../../../context/GlobalContext'
import { Button } from "@mui/material";



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
<div id='card' style={{ marginTop: '20px' }} className="block rounded-lg w-100 md:w-1/2 lg:w-1/3 mx-auto mx-4 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
    {myOrders.map((order) => {
      return (
        <div key={order.id}>
          {order?.items?.map((product) => {
            return (
              <div key={product.id} className="flex md:flex-row">
            <div id='imagen' className="w-1/3 md:w-full text-center flex justify-center items-center">
          <img
           style={{ width: '20%', height: 'auto' }}
           className="rounded-lg object-cover"
           src={product.image}
           alt=""
          />
        </div>

           <div id='descripcion' className="w-1/3 md:w-full mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center flex flex-col justify-center">
                <h5 className="font-medium">{product.title}</h5>
               <h3 className="font-medium">${product.unit_price}</h3>
               <h5 className="font-medium">{product.quantity} unidad</h5>
          </div>

          <div id='puntuacion' className="w-1/3 md:w-full mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center flex justify-center items-center">
           <Button
            className="rounded bg-primary w-auto h-auto p-1 text-base font-medium uppercase leading-normal text-white shadow-md hover:shadow-2xl transition duration-300 focus:bg-primary-600 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary dark:shadow-md dark:hover:shadow-2xl dark:focus:shadow-2xl dark:ring-primary"
            color="success"
            style={{ width: '80%' }}
           >
          Puntuación
          </Button>
          </div>

        </div>
            );
          })}
        </div>
      );
    })}
  </div>
  
  )
}

export default UserOrders