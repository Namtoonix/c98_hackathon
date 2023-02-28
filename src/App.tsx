import { Route, Routes } from "react-router-dom";
import FormCreate from "./Components/FormCreate";
import WagmiProvider from "./providers/WagmiProvider";
import "@rainbow-me/rainbowkit/styles.css";
declare const window: any;

function App() {
  return (
    <WagmiProvider>
      <Routes>
        <Route index element={<FormCreate />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </WagmiProvider>
  );
}

export default App;
