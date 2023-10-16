import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// import { BrowserRouter } from 'react-router-dom'
import Globalcontext from './context/GlobalContext.jsx'



ReactDOM.createRoot(document.getElementById("root")).render(


     <Globalcontext>
  
       <App />
   
      </Globalcontext>);



// ReactDOM.createRoot(document.getElementById('root')).render(
//     <BrowserRouter>
//             <Globalcontext>

//                     <App/>

//             </Globalcontext>
//     </BrowserRouter>
// )