import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education:{
    school,degree,fieldofstudy,current,to,form,description
}})=>(
        <div> 
    <h4 className='text-dark'>{school}</h4> 
    <p>
    <Moment format='YYYY/MM/DD'>{form}</Moment>-
    {!to?'Now':<Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p> 
    <p>
        <strong>Degree:</strong>{degree}
    </p>  
    <p>
        <strong>Fieldofstudy:</strong>{fieldofstudy}
    </p>  
    <p>
        <strong>Description:</strong>{description}
    </p>    
        </div>
)

ProfileEducation.propTypes = {
education:PropTypes.object.isRequired,
}

export default ProfileEducation
