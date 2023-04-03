import { Provider } from './context/provider';
import './style/global/style.css'
import Header from './view/header'
import Navbar from './view/navbar';
import Product from './view/product'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {


  return (
    <Provider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className='container-content-field'>
            <Navbar />
            <Routes>
              <Route path="/" element={<Product />} />
              <Route path="/produtos" element={<Product />} />
              <Route path="/clientes" element={<Product />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
