import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import {deleteExperience}from '../../js/actions/profileAction'
const Experience = ({ experience,deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td className="hide-sm"> {exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{" "}
        {exp.to === null ? (
          " Now "
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
          <button className='btn btn-danger' onClick={()=>deleteExperience(exp._id)}>Delete</button>
     </td>
    </tr>
  ));
  return (
    <div>
      <h3 className="my-2">Experience Credentials </h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm"></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired,
};

export default connect(null,{deleteExperience})(Experience);
