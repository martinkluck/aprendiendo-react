import { createSlice } from "@reduxjs/toolkit";

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserState extends User {
  id: string;
}

const initialState: UserState[] = [
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

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

export default userSlice.reducer;
