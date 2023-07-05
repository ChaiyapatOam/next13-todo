"use client";
type Props = {
  id: number;
  title: string;
  complete: boolean;
  toggleTodo: (id: number, complete: boolean) => void;
  deleteTodo: (data: FormData) => void;
};

export const TodoItem = ({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
}: Props) => {
  return (
    <li className="flex gap-1 items-center border">
      <input
        id={id.toString()}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label htmlFor={id.toString()} className="peer-checked:line-through ">
        {title}
      </label>
      <form action={deleteTodo} className="flex justify-end w-full ">
        <input type="hidden" value={id} name="id" />
        {/* <input type="submit" className="w-4 border text-center border-black">
          X
        </input> */}
      </form>
    </li>
  );
};
