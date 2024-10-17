// components/Common/Unauthorized.js
import React from "react";

function Unauthorized() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 text-center">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="display-4 text-danger mb-4">
                <i className="bi bi-shield-lock-fill"></i> Access Denied
              </h1>
              <p className="lead mb-4">
                You do not have permission to access this page.
              </p>
              {/* <a href="/" className="btn btn-primary btn-lg">
                Return to Home
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
