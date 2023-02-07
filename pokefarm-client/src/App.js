import { ROUTES } from "./constants/AppConstants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage/LoginPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import CreateAccountPage from "./pages/createaccountpage/CreateAccountPage";
import LayoutPage from "./pages/layoutpage/LayoutPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const App = () => {
  const Routing = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutPage />} />
          <Route index element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<CreateAccountPage />} />
          <Route
            path={ROUTES.USER_ACCOUNT}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  };

  return (
    <div className="App">
      <Routing />
    </div>
  );
};

export default App;
