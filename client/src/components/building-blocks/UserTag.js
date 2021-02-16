import React from 'react'
import {Link} from 'react-router-dom'

const UserTag = (props) => {
    return (
        <Link to={"/profile/" + props.username}><div className="row align-items-center">
            <div className="col-xs-auto profile-picture-col">
                <div className = "card-profile-picture-container ml-3">
                        <img src={props.profilePicture} alt={props.username} className = "rounded-circle card-profile-picture" />
                </div>
            </div>
            <div className="col">
                <div className="text-muted d-inline-block">
                    {props.username}
                </div>    
            </div>    
        </div></Link>
    )
}

export default UserTag
