import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({experience:{
    company,title,location,current,to,form,description
}})=>(
        <div> 
    <h4 className='text-dark'>{company}</h4> 
    <p>
    <Moment format='YYYY/MM/DD'>{form}</Moment>-
    {!to?'Now':<Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p> 
    <p>
        <strong>Position:</strong>{title}
    </p>  
    <p>
        <strong>Description:</strong>{description}
    </p>    
        </div>
)

ProfileExperience.propTypes = {
experience:PropTypes.object.isRequired,
}

export default ProfileExperience