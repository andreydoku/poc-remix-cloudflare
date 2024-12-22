
import { LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { todosTable } from "~/server/TodosTable.server";
import { Todo } from "~/server/Todo";
export let loader:LoaderFunction = async ( { request , context , params } : LoaderFunctionArgs ) => {
	
	//return todosTable.getAllTodos();
	
	const allTodos:Todo[] = await todosTable.getAllTodos();
	console.log({ allTodos });
	
	return allTodos;
	
	
}

export default function Page1() {
	
	const allTodos:Todo[] = useLoaderData<typeof loader>();
	
	
	return (
		<div className="w-full max-w-[1440px] mx-auto py-10" >
			<h1 className="text-2xl">Page 1</h1>
			
			<div className="flex flex-col gap-3 mt-5 ">
				
				{ allTodos.map( (todo:Todo) =>
					<p className="bg-gray-800 max-w-80 rounded-md px-4 py-3" key={todo.id}>{todo.title}</p>
				)}
			</div>
			
		</div>
	)
}
