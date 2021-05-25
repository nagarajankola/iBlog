import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    id: '',
    userName: '',
    email: '',
    profilePicture: '',
  },
  isLoggedIn: false
}

const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    "userLogged": (state, action) => {
      return {
        ...state,
        profile: {
          id: action.payload.id,
          userName: action.payload.userName,
          email: action.payload.email,
          profilePicture: action.payload.profilePicture,
        },
        isLoggedIn: true,
      }
    },
    "userLoggedOut":(state,action)=>{
      return {
        ...state,
        profile:{
          id: '',
          userName: '',
          email: '',
          profilePicture: '',
        },
        isLoggedIn:false
      }
    }
  }
})


export const { userLogged ,userLoggedOut} = slice.actions;
export const reducer = slice.reducer;
