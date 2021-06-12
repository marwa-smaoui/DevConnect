import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "../../js/actions/profileAction";
import { Fragment } from "react";
import ProfileItem from "./ProfileItem";
const Profiles = ({ getAllProfiles, profile: { profiles, loading }, auth }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h3 className="large text-primary">Developers</h3>
          <p className="lead">
            <i class="fa fa-connectdevelop">
              {" "}
              Browse and connect with developers
            </i>
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem
                  key={profile._id}
                  profile={profile}
                  auth={auth}
                ></ProfileItem>
              ))
            ) : (
              <h5>No Profiles found... ! </h5>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
