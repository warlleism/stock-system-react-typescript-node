import './style.scss'
import { Link, useLocation } from "react-router-dom";
import product from '../../image/icons/product.svg'
import client from '../../image/icons/client.svg'
import buy from '../../image/icons/buy.svg'
import sale from '../../image/icons/sale.svg'
import home from '../../image/icons/home.svg'
import { useEffect } from 'react';

const Navbar = () => {

    const location = useLocation();

    function handlerBackground() {
        const field = document.querySelectorAll('#field')
        for (let i = 0; i < field.length; i++) {
            field[i].addEventListener('click', function (this: HTMLElement) {
                for (let j = 0; j < field.length; j++) {
                    field[j].classList.remove('active');
                }
                this.classList.add('active');
            });
        }
    }

    useEffect(() => {
        const field = document.querySelectorAll('#field')
        let rota = location.pathname.replace('/', '')
        if (rota == '') {
            field[0].classList.add('active');
        } else if (rota == "produtos") {
            field[1].classList.add('active');
        }
         else if (rota == "cliente") {
            field[2].classList.add('active');
        } else if (rota == "vendas") {
            field[3].classList.add('active');
        } else if (rota == "compras") {
            field[4].classList.add('active');
        }

        handlerBackground()


    }, [])

    return (
        <div className='navBar'>
            <Link to={'/'} className="field" id="field" >
                <img src={home} alt="" />
                <div>Home</div>
            </Link>
            <Link to={'/produtos'} className="field" id="field" >
                <img src={product} alt="" />
                <div>Produtos</div>
            </Link>
            <Link to={'/clientes'} className="field" id="field">
                <img src={client} alt="" />
                <div>Clientes</div>
            </Link>
            <Link to={'/clientes'} className="field" id="field">
                <img src={sale} alt="" />
                <div>Vendas</div>
            </Link>
            <Link to={'/clientes'} className="field" id="field">
                <img src={buy} alt="" />
                <div>Compras</div>
            </Link>
        </div>
    )
}

export default Navbar;