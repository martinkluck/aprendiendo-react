import { type Middleware, configureStore } from "@reduxjs/toolkit";
import usersReducer, { UserState, rollBackUser } from "./users/slice";
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		const result = next(action);
		localStorage.setItem("reduxState", JSON.stringify(store.getState()));
		return result;
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
    const previousState = store.getState();
		next(action);
    
		if (type === "users/addNewUser") {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			})
      .then((res) => {
        if (res.ok) toast.success(`User ${payload.name} added!`);
      })
      .catch((err) => toast.error(err.message));
		}
    
		if (type === "users/deleteUserById") {
      const userIdToRemove = payload;
      const userToRemove = previousState.users.find(
							(user: UserState) => user.id === userIdToRemove,
						);
			fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) toast.success(`User with id ${payload} deleted!`);
          // throw new Error('Error al eliminar el usuario');
				})
				.catch((err) => {
          toast.error(`Error al eliminar el usuario ${userIdToRemove}`);
          if(userToRemove) store.dispatch(rollBackUser(userToRemove));
          console.log(err);
        });
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
