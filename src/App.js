import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import Scene from "./pages/Scene";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Scene />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
