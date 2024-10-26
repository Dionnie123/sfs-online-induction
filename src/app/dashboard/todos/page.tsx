import CreateTodo from "./_components/action-buttons/create";
import TodoList from "./_components/table/table";

export default async function TodoPage() {
  return (
    <>
      <div className="flex flex-row justify-start align-middle  space-x-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Create Todo
        </h3>
        <CreateTodo />
      </div>
      <TodoList />
    </>
  );
}
