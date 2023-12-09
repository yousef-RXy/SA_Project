/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		token: "",
		subjects: {},
		totalHours: 0,
		totalGpa: 0,
		points: 0,
		isAdmin: false,
	},
	reducers: {
		setUser(state, action) {
			state.token = action.payload.token;
			state.subjects = action.payload.subjects;
			state.totalHours = action.payload.totalHours;
			state.totalGpa = action.payload.totalGpa;
			state.isAdmin = action.payload.isAdmin;
		},
		rmvUser(state, action) {
			state.token = "";
			state.subjects = {};
			state.totalHours = 0;
			state.totalGpa = 0;
			state.isAdmin = false;
		},
		updateGpa(state, action) {
			state.totalHours = action.payload.totalHours;
			state.totalGpa = action.payload.totalGpa;
		},
		updateSubjects(state, action) {
			state.subjects = action.payload;
		},
		updatePoints(state, action) {
			state.subjects = action.payload;
		},
	},
});

export const userActions = userSlice.actions;

export default userSlice;
