import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser :[],
    isAuthenticated:false,
}

const userSlice = createSlice({
    name:"user", 
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.isAuthenticated = true
        },
        signOut:(state)=>{
            state.currentUser = null,
            state.isAuthenticated = false
        },

        updateUserRole: (state, action) => {
            if (state.currentUser?.data?.data?.user) {
              state.currentUser = {
                ...state.currentUser,
                data: {
                  ...state.currentUser.data,
                  data: {
                    ...state.currentUser.data.data,
                    user: {
                      ...state.currentUser.data.data.user,
                      role: action.payload, 
                    },
                  },
                },
              };
            }
          },
          
    }
})


export const {signInSuccess,signOut,updateUserRole} = userSlice.actions
export default userSlice.reducer