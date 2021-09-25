import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const RestaurantActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/restaurant/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
    </div>
  );
};
export default RestaurantActions;
