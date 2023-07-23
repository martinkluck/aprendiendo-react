import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Peter Doe",
		email: "peter@doe.com",
		github: "perterdoe",
	},
	{
		id: "2",
		name: "John Doe",
		email: "john@doe.com",
		github: "johndoe",
	},
	{
		id: "3",
		name: "Jane Doe",
		email: "janedoe@gmail.com",
		github: "martinkluck",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserState extends User {
	id: string;
}

const initialState: UserState[] = (() => {
	const persistedState = localStorage.getItem("reduxState");
	if (persistedState) return JSON.parse(persistedState).users;
	return DEFAULT_STATE;
})();

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ ...action.payload, id });
			// return [...state, { ...action.payload, id }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			return state.filter((user) => user.id !== action.payload);
		},
		rollBackUser: (state, action: PayloadAction<UserState>) => {
			const isUserAlreadyDefined = state.find(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				// return [...state, action.payload];
        state.push(action.payload);
			}
		},
	},
});

export default userSlice.reducer;

export const { addNewUser, deleteUserById, rollBackUser } = userSlice.actions;
