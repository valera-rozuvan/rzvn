import { configureStore } from '@reduxjs/toolkit';
import keysReducer from './userAuthKey/keysSlice';

export default configureStore({
    reducer: {
        keys: keysReducer
    }
})
