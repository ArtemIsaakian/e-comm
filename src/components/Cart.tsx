import {FC, useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {cartAPI} from "../services/CartService.ts";
import {cartSlice} from "../redux/reducers/CartSlice.ts";

const Cart: FC = () => {
    const wrapperRef = useRef(null);
    const {getTotalPrice} = cartSlice.actions;
    const dispatch = useAppDispatch();
    const {closeCart} = cartSlice.actions;
    const {isOpenCart} = useAppSelector(state => state.cartReducer)
    const totalPrice = useAppSelector((state) => state.cartReducer.totalPrice)
    const {data: cart, isLoading, error } = cartAPI.useGetCartQuery();
    const [removeFromCart] = cartAPI.useRemoveFromCartMutation();

    useEffect(() => {
        if (cart) dispatch(getTotalPrice(cart));
    }, [cart, dispatch]);

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (isOpenCart && ref.current && !ref.current.contains(event.target)) {
                    dispatch(closeCart())
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isOpenCart]);
    }

    useOutsideAlerter(wrapperRef);

    const handleRemoveFromCart = async (item: void) => {
        await removeFromCart(item);
    };


    return (
        <div ref={wrapperRef} className={isOpenCart ? "cart active" : "cart"}>
            <div className="cart__container">
                <h2 className="cart__title">Корзина</h2>
                <div className="cart__list">
                    {error ? (
                        <>Error message here...</>
                    ) : isLoading ? (
                        <>Loading...</>
                    ) : cart ?
                        cart.map(item => (
                            <div className="cart__item" key={item.id}>
                                <img className="cart__img" src={item.imageUrl} alt=""/>
                                <div className="cart__info">
                                    <p className="cart__name">{item.title}</p>
                                    <p className="cart__price">{item.price} руб</p>
                                    <button className="cart__delete-btn" onClick={() => handleRemoveFromCart(item)}>
                                        <img src="/svg/delete.svg" alt="delete-btn"/>
                                    </button>
                                </div>
                            </div>
                        ))
                        : null}
                </div>
                <div className="cart__bottom">
                    <p className="cart__total-price">Итого: {totalPrice}</p>
                    <p className="cart__vat">Налог 20%: </p>
                    <button>Оформить заказ</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
