import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPass, Header, Urls, Users } from "./components";
import { AuthProvider } from "./contexts/AuthProvider";
import { DataProvider } from "./contexts/DataProvider";
import { useEffect } from "react";

function App() {
  

  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpass" element={<ForgotPass />} />
              <Route path="/urls" element={<Urls />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
