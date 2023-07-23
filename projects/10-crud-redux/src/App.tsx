import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import ListOfUsers from "./components/ListOfUsers";
import { Toaster } from "sonner";

function App() {
	return (
		<>
			<h1 className="text-3xl mb-5">Crud de usuarios</h1>
			<div className="grid auto-rows-[192px] grid-cols-3 gap-4">
				<ListOfUsers />
				<CreateNewUser />
				<div className="row-span-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900"></div>
				<div className="row-span-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900"></div>
			</div>
			<Toaster richColors />
		</>
	);
}

export default App;
