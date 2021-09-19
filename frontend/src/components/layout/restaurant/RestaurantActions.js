import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const RestaurantActions = () => {
  return (
    <div class="dash-buttons">
      <Link to="/restaurant/edit-profile" class="btn btn-light">
        <i class="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
    </div>
  );
};
export default RestaurantActions;
