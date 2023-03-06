import { Route, Routes } from "react-router-dom";
import WagmiProvider from "./providers/WagmiProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import MyProjectsPage from "./pages/MyProjectsPage";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import MyInvestedProjectsPage from "./pages/MyInvestedProjectPage";

declare const window: any;

function App() {
  return (
    <WagmiProvider>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/my-projects" element={<MyProjectsPage />} />
        <Route path="/my-projects/:id" element={<ProjectDetailPage />} />
        <Route
          path="/my-invest-projects"
          element={<MyInvestedProjectsPage />}
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        position="bottom-right"
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </WagmiProvider>
  );
}

export default App;
