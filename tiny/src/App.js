import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPass, Header } from "./components";
import { AuthContext, AuthProvider } from "./contexts/AuthProvider";
import { useContext } from "react";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpass" element={<ForgotPass />} />\
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;