import { BrowserRouter, Routes, Route } from "react-router-dom";
import SampleList from "./components/SampleList";
import Sample from "./components/Sample";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SampleList />} />
          <Route path="/samples/:id" element={<Sample />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
