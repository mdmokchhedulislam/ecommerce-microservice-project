import { configureStore } from '@reduxjs/toolkit'
import user from './slice/userSlice.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import cart from "./slice/cartSlice.js"
 
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, user)

export const store = configureStore({
  reducer: {
    user:persistedReducer,
    cart

  },

})
export const persistor = persistStore(store)