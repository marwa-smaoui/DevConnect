import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../js/actions/profileAction";
const Education = ({ education,deleteEducation }) => {
  const educations = education.map((educ) => (
    <tr key={educ._id}>
      <td className="hide-sm"> {educ.school}</td>
      <td className="hide-sm">{educ.degree}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{educ.from}</Moment>-{" "}
        {educ.to === null ? (
          " Now "
        ) : (
          <Moment format="YYYY/MM/DD">{educ.to}</Moment>
        )}
      </td>
      <td>
          <button className='btn btn-danger' onClick={()=>deleteEducation(educ._id)}>Delete</button>
     </td>
    </tr>
  ));
  return (
    <div>
      <h3 className="my-2">Education Credentials </h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm"></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
};

export default connect(null,{deleteEducation})(Education);
