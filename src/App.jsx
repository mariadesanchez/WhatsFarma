import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import AuthContextComponent from "./context/AuthContext";
import './index.css'; // Importa tu archivo de estilos si tienes uno


function App() {
  return (
    <BrowserRouter>
      <CartContextComponent>
        <AuthContextComponent>
        <div className="app-container">
          <AppRouter />
       </div>
        </AuthContextComponent>
      </CartContextComponent>
    </BrowserRouter>
  );
}

export default App;
