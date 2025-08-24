import { useRoutes, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";
import AddCreator from "./pages/AddCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";

function AppRoutes() {
  return useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/new", element: <AddCreator /> },
    { path: "/creators/:id", element: <ViewCreator /> },
    { path: "/creators/:id/edit", element: <EditCreator /> },
  ]);
}

export default function App() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>
          <Link to="/" style={{ textDecoration: "none" }}>Creatorverse</Link>
        </h1>
        <nav>
          <Link to="/new">Add Creator</Link>
        </nav>
      </header>
      <AppRoutes />
    </main>
  );
}
