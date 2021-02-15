
const FollowButton = (props) => {

    if(props.followed)
    {
        return (
            <button 
                className = "follow-button btn btn-outline-primary"
                onClick = {() => console.log("follow button clicked")}
            >
                unfollow
            </button>
        )
    }
    else
    {
        return (
            <button 
                className = "follow-button btn btn-primary"
                onClick = {() => console.log("follow button clicked")}
            >
                follow
            </button>
        )
    }
}

export default FollowButton
