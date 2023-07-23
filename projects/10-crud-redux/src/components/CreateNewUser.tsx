import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";

export function CreateNewUser() {
  const { addUser } = useUserActions();
  const [result, setResult] = useState<'ok' | 'ko' | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    if (!name || !email || !github) return setResult('ko'); // se pueden agregar las validaciones que se quieran

    addUser({ name, email, github });
    setResult('ok');
    form.reset();
  };

	return (
		<Card className="row-span-1 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900 col-span-2 row-span-2 text-white">
			<Title>Crear nuevo usuario</Title>
			<form onSubmit={handleSubmit} className="">
				<TextInput
					type="text"
					name="name"
					autoComplete="name"
					placeholder="Nombre"
					className="mb-2"
				/>
				<TextInput
					type="email"
					name="email"
					autoComplete="email"
					placeholder="Email"
					className="mb-2"
				/>
				<TextInput
					type="text"
					name="github"
					autoComplete="github"
					placeholder="Github"
					className="mb-2"
				/>

				<div>
					<Button type="submit">Crear</Button>
					<span className="ml-5">
						{result === "ok" && (
							<Badge color="green">Usuario creado correctamente</Badge>
						)}
						{result === "ko" && <Badge color="red">Error con los campos</Badge>}
					</span>
				</div>
			</form>
		</Card>
	);
}
