import React from "react";

const Pagination = ({ ordersPerPage, totalOrders, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <div
          class="btn-toolbar mb-3"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div class="btn-group mr-2" role="group" aria-label="First group">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{
                    background: "black",
                    color: "white",
                    borderRadius: "30px",
                  }}
                  onClick={() => {
                    paginate(number);
                  }}
                  // className="page-link"
                >
                  {number}
                </button>
              </li>
            ))}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Pagination;
