import { Route, Routes } from "react-router-dom";
import FormCreate from "./Components/FormCreate";

declare const window: any;

function App() {
  //Connect wallet
  if (!window.ethereum) {
    console.log("install metamask extension!!");
  } else {
    window.ethereum.request({
      method: "eth_requestAccounts",
    });
  }

  return (
    <Routes>
      <Route index element={<FormCreate />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

export default App;
