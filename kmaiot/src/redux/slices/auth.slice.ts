import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {authApi} from '../api/auth.api';

export interface AuthState {
  isGetStared: boolean;
  isSignedIn: boolean;
  token: any | null;
  user: any | null;
  lang: string;
  isAdmin: boolean;
  isSelectedPersonalizeBoard: boolean;
}

const initialState: AuthState = {
  isGetStared: false,
  isSignedIn: false,
  token: null,
  user: null,
  lang: 'en',
  isAdmin: false,
  isSelectedPersonalizeBoard: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: state => {
      return {
        ...initialState,
        lang: state.lang,
        isGetStared: state.isGetStared,
      };
    },
    /**
     * After users signing up for the first time we want them to complete their
     * information first and then after completing that, we will set `isSignedIn = true`
     * and redirect user to screens for authenticated users (home, profile, etc.).
     * All the requests from completeuser process need token, so it makes sense
     * to have a token, so that we can make requests.
     */
    signUp: (state, action: PayloadAction<any>) => {
      if (action.payload.data) {
        state.isSignedIn = true;
        state.token = action.payload.data?.token;
      }
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      },
    );
  },
});

export const {signOut, signUp, setSignedIn} = authSlice.actions;

export const authReducer = authSlice.reducer;
