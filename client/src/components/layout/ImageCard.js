//Import components
import LikeButton from "./LikeButton"

function formatNumber(number)
{
    if(number<1000)
        return number
    else
    {
        var formattedNum = Math.round(number/100) / 10;
        return formattedNum + "k "
    }

}

const ImageCard = (props) => {
    return (
        <div class = "card image-card">
            <div class="card-header p-1 poster-info-display">
                <div className="row align-items-center">
                    <div className="col-xs-auto">
                        <div className = "card-profile-picture-container ml-3">
                                <img src={props.user.profilePicture} alt={props.user.username} className = "rounded-circle card-profile-picture" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="text-muted d-inline-block">
                            {props.user.username}
                        </div>    
                    </div>    
            </div>
            </div>
            <div className="photo-container"> 
                <img src = {props.image} alt = {props.date} onClick={() => console.log("photo clicked: " + props.id)}/>
            </div>
            <div className = "card-body">
                <div className="card-text description-display">
                    {props.description.map((line) => 
                        <p>{line}</p>
                    )}
                </div>
                <div className="card-text"><small className = "text-muted">Posted {props.date} </small></div>
                <div className="card-text">
                    <div className="like-count-display d-inline"><LikeButton liked = {props.liked}/> 
                    <small>{formatNumber(props.likesNumber)}</small> </div>
                    <div className="comment-count-display d-inline"><button className = "comment-button" onClick = {() => console.log("comment button clicked.")}>
                        <i class="fa fa-comment-o"></i>
                    </button> 
                    <small>{formatNumber(props.commentsNumber)}</small></div>
                </div>
            </div>   
            <div class="card-footer add-comment-display">This is a  test</div>
            
        </div>
    )
}

export default ImageCard
