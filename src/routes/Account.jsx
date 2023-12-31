import React from "react";
import SavedCoin from "../components/SavedCoin";
import { UserAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Account = () => {
  // Access user and logout function from AuthContext
  const { user, logout } = UserAuth();

  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle user sign out
  const handleSignOut = async () => {
    try {
      // Call the logout function from AuthContext
      await logout();
      // Redirect to the home page after successful logout
      navigate("/");
    } catch (e) {
      // Log any errors that occur during the sign-out process
      console.log(e.message);
    }
  };

  // If the user is authenticated, render the account information
  if (user) {
    return (
      <div className="max-w-[1140px] mx-auto">
        <div className="flex justify-between items-center my-12 py-8 rounded-div">
          <div>
            <h1 className="text-2xl font-bold">Account</h1>
            <div>
              <p>Welcome, {user?.email}</p>
            </div>
          </div>
          <div>
            {/* Button to trigger the sign-out process */}
            <button
              onClick={handleSignOut}
              className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex justfiy-between items-center my-12 py-8 rounded-div">
          <div className="w-full min-h-[300px]">
            <h1 className="text-2xl font-bold py-4">Watch List</h1>
            {/* Render the SavedCoin component for the user's watch list */}
            <SavedCoin />
          </div>
        </div>
      </div>
    );
  } else {
    // If the user is not authenticated, redirect to the sign-in page
    return <Navigate to="/signin" />;
  }
};

export default Account;
