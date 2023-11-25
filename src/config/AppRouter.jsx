import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteList } from "../utils/RouteList";

const AppRouter = () => (
  <Router>
    <Routes>
      {RouteList.map((elem, ind) => (
        <Route key={ind} path={elem.path} element={elem.element} />
      ))}
    </Routes>
  </Router>
);

export default AppRouter;
