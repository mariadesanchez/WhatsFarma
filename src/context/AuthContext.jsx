import { useState } from "react";
import { createContext } from "react";
import { db } from "../firebaseConfig";
import {addDoc, collection} from "firebase/firestore";
import { usecontextGlobal } from '../context/GlobalContext'

export const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
  const { productState} = usecontextGlobal();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("isLogged")) || false
  );

  const handleLogin = (userLogged) => {
    setUser(userLogged);
    setIsLogged(true);
    localStorage.setItem("userInfo", JSON.stringify(userLogged));
    localStorage.setItem("isLogged", JSON.stringify(true));
  };

  const logoutContext = () => {
    const ordersCollection = collection(db, "favoritos");

    for (const productId in productState) {
      if (Object.hasOwnProperty.call(productState, productId)) {
        const fav = productState[productId];
        // Suponiendo que user.email contiene el correo electrónico del usuario
        const userEmail = user.email;
    addDoc(ordersCollection, { ...fav, userEmail });
      }
    }
    localStorage.clear();


  // borrar favoritos, armar case en contextGlobal

      // clearFav()

    setUser({});
    setIsLogged(false);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLogged");
  };

  let data = {
    user,
    isLogged,
    handleLogin,
    logoutContext,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextComponent;
