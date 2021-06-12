import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  const {
    status,
    company,
    location,
    skills,
    contact,
  } = profile;
  return (
    <div className="profile bg-light">
      <img src={contact&&contact.avatar} alt="" className="round-img" />
      <div>
        <h4>{contact&&contact.name}</h4>
        <p>
          {" "}
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="my-1"> {location && <span> {location}</span>}</p>
        <Link to={`profile/${contact&&contact._id}`} className="btn btn-primary">
          {" "}
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i class="fa fa-check"></i>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
