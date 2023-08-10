import { createSlice } from "@reduxjs/toolkit"

const initialState={
    domain:'home',
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setDomain:(state,action)=>{
            state.domain=action.payload;
        }
    }
})

export const {setDomain} = userSlice.actions
export default userSlice.reducer;