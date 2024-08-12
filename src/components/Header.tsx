import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {cartSlice} from "../redux/reducers/CartSlice.ts";
import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function Header() {
  const {openCart} = cartSlice.actions;
  const dispatch = useAppDispatch()
  const totalPrice = useAppSelector((state) => state.cartReducer.totalPrice)

  return (
    <header className="header">
      <div className="header__container">
        <Link to='/' className="header__left">
          <img src="/logo.png" width="40px" height="40px" alt="logo" />
          <div className="header__logo-text">
            <h1 className="header__title">REACT SNEAKERS</h1>
            <p className="header__subtitle">Магазин лучших кроссовок</p>
          </div>
        </Link>
        <div className="header__right">
          <ul className="header__menu">
            <li className="header__item"><a className="header__link" onClick={() => dispatch(openCart())}><img src="/svg/cart.svg" width="20" height="20" alt="" /> <p>{totalPrice} руб.</p> </a></li>
            <li className="header__item"><Link to='/favorites' className="header__link"><img src="/svg/heart.svg" width="19" height="17" alt="" /> <p>Закладки</p></Link></li>
            <li className="header__item"><a className="header__link" href="#"><img src="/svg/profile.svg" width="18" height="18" alt="" /><p>Профиль</p></a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
