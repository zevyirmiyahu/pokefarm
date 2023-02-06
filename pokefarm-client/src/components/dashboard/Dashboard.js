import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/pokemon-page-banner.png";
import { handleLogout } from "../../utils/Utils";

const Banner = () => {
  return <img src={banner} alt="Pokemon Banner Image" />;
};

const LogoutButton = ({ navigate, setToken }) => {
  return (
    <form>
      <button
        onClick={() => {
          handleLogout(navigate, setToken);
        }}
      >
        Logout
      </button>
    </form>
  );
};

const Dashboard = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Banner />
      <h1>Dashboard</h1>
      <LogoutButton navigate={navigate} setToken={setToken} />
    </div>
  );
};

export default Dashboard;
