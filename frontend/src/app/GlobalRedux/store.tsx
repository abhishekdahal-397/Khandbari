"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import userReducer from "./features/user/userSlice";
const rootReducer = combineReducers({
	counter: counterReducer,
	user: userReducer,
	//add all your reducers here
});

export const store = configureStore({
	reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
