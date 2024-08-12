import {FC} from "react";
import {ICard} from "../models/ICard.ts";
import {baseAPI} from "../services/BaseService.ts";
interface cardProps {
  card: ICard;
}

const Card: FC<cardProps> = ({card}) => {
  const { data: cartData } = baseAPI.useGetCartQuery();
  const { data: favoriteData } = baseAPI.useGetFavoritesQuery();
  const [addToCart] = baseAPI.useAddToCartMutation();
  const [addToFavorite] = baseAPI.useAddToFavoriteMutation();
  const [removeFromFavorite] = baseAPI.useRemoveFromFavoriteMutation();
  const isInCart = (id: number) => cartData?.some((item) => item.item_id === id)
  const handleAddToCart = async (card: void)   => {
    await addToCart({
      ...card,
      item_id: card.id,
    });
  };

  const isInFavorite = (id: number) => favoriteData?.some((item) => {
    return item.item_id === id
  })

  const handleAddToFavorite = async (card: void) => {
    if (!isInFavorite(card.id)) {
      await addToFavorite({
        ...card,
        item_id: card.id
      })
    } else {
      const findFavoriteEl = favoriteData.filter(item => item.item_id === card.id)
      removeFromFavorite(findFavoriteEl[0])
    }
  }

  return (
      <div className="card">
        <div className="card__container">
          <button className={isInFavorite(card.id) ? `card__favorite-btn is-favorite` : `card__favorite-btn`} onClick={() => handleAddToFavorite(card)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8609 3.07455C13.5204 2.73389 13.1161 2.46365 12.6711 2.27927C12.2261 2.0949 11.7492 2 11.2675 2C10.7859 2 10.3089 2.0949 9.86396 2.27927C9.41898 2.46365 9.0147 2.73389 8.67419 3.07455L7.96753 3.78122L7.26086 3.07455C6.57307 2.38676 5.64022 2.00036 4.66753 2.00036C3.69484 2.00036 2.76199 2.38676 2.07419 3.07455C1.3864 3.76235 1 4.69519 1 5.66788C1 6.64057 1.3864 7.57342 2.07419 8.26122L2.78086 8.96788L7.96753 14.1546L13.1542 8.96788L13.8609 8.26122C14.2015 7.92071 14.4718 7.51643 14.6561 7.07145C14.8405 6.62648 14.9354 6.14954 14.9354 5.66788C14.9354 5.18623 14.8405 4.70929 14.6561 4.26431C14.4718 3.81934 14.2015 3.41505 13.8609 3.07455Z" stroke="#EAEAEA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <img src={card.imageUrl} width="133" height="112" alt="img1" />
          <p className="card__title">{card.title}</p>
          <div className="card__info">
            <div className="card__info-left">
              <span className="card__label">Цена:</span>
              <p className="card__price">{card.price} руб.</p>
            </div>
            <button className="card__add-btn">
              <img src={isInCart(card.id) ? "/svg/added.svg" : "/svg/add.svg"} onClick={() => handleAddToCart(card)} width={32} height={32} alt="" />
            </button>
          </div>
        </div>
      </div>
  )
}

export default Card;
