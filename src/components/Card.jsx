import { Link } from "react-router-dom";

export default function Card({ issue }) {
  return (
    <Link className="card cardLink" to={`/tasks/${issue.id}`}>
      {issue.name}
    </Link>
  );
}
