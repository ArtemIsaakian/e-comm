import {baseAPI} from "./BaseService.ts";
import { ICard } from "../models/ICard.ts";

export const cartAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => `cart`,
            providesTags: ['Cart'],
        }),
        addToCart: builder.mutation<ICard, ICard>({
            query: (card) => ({
                url: `cart`,
                method: 'POST',
                body: {
                    title: card.title,
                    price: card.price,
                    imageUrl: card.imageUrl,
                    item_id: card.id
                }
            }),
            invalidatesTags: ['Cart']
        }),
        removeFromCart: builder.mutation({
            query: (card) => ({
                url: `cart/` + card.id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart']
        }),
    })
})
