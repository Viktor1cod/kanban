import Column from "./Column";

export default function Board({ columns, setColumns }) {
  return (
    <div className="board">
      {columns.map((column) => (
        <Column key={column.id} column={column} setColumns={setColumns} />
      ))}
    </div>
  );
}
