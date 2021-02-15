
const LikeButton = (props) => {

    if(props.liked)
    {
        return (
            <button 
                className = "like-button"
                onClick = {() => console.log("clicked")}
            >
                <i class="fa fa-heart"></i>
            </button>
        )
    }
    else
    {
        return (
            <button 
                className = "like-button"
                onClick = {() => console.log("clicked")}
            >
                <i class="fa fa-heart-o"></i>
            </button>
        )
    }
}

export default LikeButton
