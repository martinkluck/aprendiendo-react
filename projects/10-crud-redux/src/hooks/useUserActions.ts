import { User, UserId, addNewUser, deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

  const addUser = (user: User) => {
    dispatch(addNewUser(user));
  };

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

  return { addUser, removeUser };
};
