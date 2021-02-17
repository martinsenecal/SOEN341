import React from 'react'

const UserTag = (props) => {
    return (
        <div className="row align-items-center">
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
        </div>
    )
}

export default UserTag
