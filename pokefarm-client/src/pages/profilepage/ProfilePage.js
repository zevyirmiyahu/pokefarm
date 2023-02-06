import React from "react";
import banner from "../../assets/pokemon-page-banner.png";
import { useAuth } from "../../routes/providers/AuthProvider";

const Banner = () => {
  return <img src={banner} alt="Pokemon Banner Image" />;
};

const LogoutButton = (logout) => {
  return (
    <form>
      <button
        onClick={() => {
          logout();
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
