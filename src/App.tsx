import { Route, Routes } from "react-router-dom";
import FormCreate from "./Components/FormCreate";

function App() {
  return (
    <Routes>
      <Route index element={<FormCreate />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

export default App;
