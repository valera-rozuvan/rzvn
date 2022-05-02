import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    private: 'no private',
    public: 'no public'
}

const keysSlice = createSlice({
    name: 'keys',
    initialState,
    reducers: {
        keysUpdated(state, action) {
            state.private = action.payload.private;
            state.public = action.payload.public;
        }
    }
})

export const { keysUpdated } = keysSlice.actions

export default keysSlice.reducer
