import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseAPI } from "../services/BaseService.ts";
import cartReducer from './reducers/CartSlice.ts'

const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
  cartReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
