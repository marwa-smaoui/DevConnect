import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../js/actions/authAction";
import { Fragment } from "react";
const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      
      <li>
            <Link to='/profiles'>
              <i class="fa fa-users"></i>{" "}
              <span className="hide-sm"> Developers</span>
            </Link>
      </li>
      <li>
          <Link to='/posts'>
              <i class="fa fa-comments"></i>{" "}
              <span className="hide-sm"> Posts</span>
          </Link>
       </li>
      <li>
            <Link to='/dashboard'>
              <i class="fa fa-user"></i>{" "}
              <span className="hide-sm">Dashboard</span>
            </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
            <i class="fa fa-sign-out"></i>{" "}
            <span className="hide-sm">Logout</span>
        </a>
      </li>
     
    </ul>
  );

  const guestLinks = (
    <ul> 
     
       <li>
      <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fa fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
