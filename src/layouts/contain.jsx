import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import routes from "@/routes";

export function Contain() {
  return (
    <div className="relative min-h-screen w-full"
     style={{ background: 'rgba(246, 246, 246, 1)' }}>
      <Navbar />
      <div className="container mx-auto py-8"
       
      >
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "contain" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
    </div>
  );
}

Contain.displayName = "/src/layout/Contain.jsx";

export default Contain;
