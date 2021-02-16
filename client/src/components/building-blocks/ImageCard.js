import React from 'react';
//Import components
import {Link} from 'react-router-dom'
import LikeButton from "./LikeButton"
import formatNumber from "./NumberFormat"
import UserTag from "./UserTag"

const ImageCard = (props) => {
    return (
        <div className = "card image-card">
            <div className="card-header p-1 poster-info-display">
                <UserTag profilePicture={props.user.profilePicture} username={props.user.username}  />
            </div>
            <div className="photo-container"> 
                <Link to={"/p/" + props.id} ><img src = {props.image} alt = {props.date} onClick={() => console.log("photo clicked: " + props.id)}/> </Link>
            </div>
            <div className = "card-body">
                <div className="card-text description-display">
                    {props.description.map((line , index) => 
                        <p key={ index }>{line}</p>
                    )}
                </div>
                <div className="card-text"><small className = "text-muted">Posted {props.date} </small></div>
                <div className="card-text">
                    <div className="like-count-display d-inline"><LikeButton liked = {props.liked}/> 
                    <small>{formatNumber(props.likesNumber)}</small> </div>
                    <div className="comment-count-display d-inline"><button className = "comment-button" onClick = {() => console.log("comment button clicked.")}>
                        <i className="fa fa-comment-o"></i>
                    </button> 
                    <small>{formatNumber(props.commentsNumber)}</small></div>
                </div>
            </div>   
            <div className="card-footer add-comment-display">
                <form>
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Leave a comment :) " />
                        </div>
                        <div className="col-xs-auto">
                            <button type="submit" className="btn btn-primary mb-2"><i className="fa fa-send-o"></i></button>
                        </div>
                    </div>
                </form>
                
            </div>
            
        </div>
    )
}

export default ImageCard
