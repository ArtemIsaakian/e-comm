import {FC} from "react";
import {favoritesAPI} from "../services/FavoritesService.ts";


const Favorites: FC = () => {
    const { data: favorites, isLoading, error } = favoritesAPI.useGetFavoritesQuery();
    const [removeFromFavorite] = favoritesAPI.useRemoveFromFavoriteMutation();

    const handleRemoveFromFavorite = async (item: void) => {
        await removeFromFavorite(item);
    };

    return (
        <div className="favorites">
            <div className="favorites__container">
                <div className="title-page">
                    <h2 className="title-page">Закладки</h2>
                    <div className="catalog__items">
                        {error ? (
                            <>Error message here...</>
                        ) : isLoading ? (
                            <>Loading...</>
                        ) : favorites ? favorites.map(card => (
                            <div className="card" key={card.id}>
                                <div className="card__container">
                                    <button className="card__favorite-btn is-favorite" onClick={() => handleRemoveFromFavorite(card)}>
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
                                    </div>
                                </div>
                            </div>))
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites;
