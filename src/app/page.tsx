import Image from "next/image";
import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "@/components/TodoItem";
import { redirect } from "next/navigation";
async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length == 0) {
    throw new Error("Invalid Title");
  }
  console.log(data.get("title"));

  await prisma.todo.create({ data: { title, complete: false } });
}

async function getTodo() {
  return await prisma.todo.findMany({});
}

async function toggleTodo(id: number, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id: id }, data: { complete } });
}

async function deleteTodo(data: FormData) {
  "use server";
  const id = data.get("id")?.valueOf();
  if (typeof id !== "string" || id.length == 0) {
    throw new Error("Invalid id");
  }
  await prisma.todo.delete({ where: { id: Number(id) } });
  redirect("/");
}

export default async function Home() {
  const todos = await getTodo();

  return (
    <main className="flex justify-center min-h-screen p-24">
      <header>
        <form action={createTodo} className="flex flex-col justify-center">
          <h1 className="text-2xl text-center text-red-400">Todos</h1>
          <input
            type="text"
            name="title"
            className="bg-gray-50 border border-black text-gray-900  rounded-lg text-center"
          />
          <br />
          <button
            type="submit"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg "
          >
            Create
          </button>
        </form>
        <br />
        <ul className="">
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                complete={todo.complete}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
      </header>
    </main>
  );
}
