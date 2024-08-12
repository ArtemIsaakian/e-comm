import {baseAPI} from "./BaseService.ts";
import { ICard } from "../models/ICard.ts";

export const favoritesAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getFavorites: builder.query({
            query: () => `favorites`,
            providesTags: ['Favorites'],
        }),
        addToFavorite: builder.mutation<ICard, ICard>({
            query: (card: ICard) => ({
                url: `favorites`,
                method: 'POST',
                body: {
                    title: card.title,
                    price: card.price,
                    imageUrl: card.imageUrl,
                    item_id: card.id
                }
            }),
            invalidatesTags: ['Favorites']
        }),
        removeFromFavorite: builder.mutation({
            query: (card) => ({
                url: `favorites/` + card.id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Favorites']
        }),
    })
})
