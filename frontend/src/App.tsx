import { BrowserRouter, Routes, Route } from "react-router-dom";
import SampleList from "./components/SampleList";
import Sample from "./components/Sample";
import SampleForm from "./components/SampleForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SampleList />} />
          <Route path="/samples/:id" element={<Sample />} />
          <Route path="/samples/:id/edit" element={<SampleForm />} />
          <Route path="/samples/new" element={<SampleForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
