import React from "react";
import banner from "../../assets/pokemon-page-banner.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/providers/AuthProvider";
import { ROUTES } from "../../constants/AppConstants";

const Banner = () => {
  return <img src={banner} alt="Pokemon Banner Image" />;
};

export const handleLogout = (navigate, setUser) => {
  setUser(null);
  navigate(ROUTES.LOGIN_IN);
};

const LogoutButton = (logout) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return (
    <form>
      <button
        onClick={() => {
          handleLogout(navigate, setUser);
        }}
      >
        Logout
      </button>
    </form>
  );
};

const ProfilePage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Banner />
      <h1>Dashboard</h1>
      <LogoutButton logout={logout} />
      <h1>User Account</h1>
    </div>
  );
};

export default ProfilePage;
