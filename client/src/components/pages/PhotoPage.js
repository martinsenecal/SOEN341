import React from 'react'
import { useParams } from 'react-router'
import formatNumber from "../building-blocks/NumberFormat"
import LikeButton from "../building-blocks/LikeButton"
import UserTag from "../building-blocks/UserTag"

//Hard-coded test comments
const comments = [
    {
      user: {
        profilePicture: 'https://images.unsplash.com/photo-1543255006-d6395b6f1171?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
        username: "example02"
      },
      text: "This is a comment",
      date: new Date(),
      id: 1
    },
    {
        user: {
          profilePicture: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
          username: "example03"
        },
        text: "This is another comment",
        date: new Date(),
        id: 2
      },
    {
        user: {
            profilePicture: 'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
            username: "example01"
        },
        text: "This is yet another comment",
        date: new Date(),
        id: 3
    },
]
//Hard-coded test photos 
const photoData = [
    /*template
    {
        image: ...,
        description: [...],
        date: ...,
        likesNumber: ...,
        commentsNumber:...,
        liked: ...,
    }
    */
    {
        image: 'https://images.unsplash.com/photo-1543255006-d6395b6f1171?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
        description: ['Delicious! #delicious -- are we implementing hashtags?'],
        date: 'February 6th, 2021',
        likesNumber: 3456,
        commentsNumber: 125,
        liked: true,
        id: 1,
        user :
          {
            username: "example01",
            bio: " user defined bio -- max length = ?, default blank",
            profilePicture: "https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80",
            followingNumber: 1257,
            followerNumber: 12,
          }
    },
    {
        image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
        description: ['woof.'],
        date: 'February 29th, 2021',
        likesNumber: 10756,
        commentsNumber: 1234,
        liked: true,
        id: 2,
        user :
          {
            username: "example01",
            bio: " user defined bio -- max length = ?, default blank",
            profilePicture: "https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80",
            followingNumber: 1257,
            followerNumber: 12,
          }
    },
    {
        image: 'https://images.unsplash.com/photo-1565553642973-6afe791aee33?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=723&q=80',
        description: ['Don\'t mind me, just living the #burger life. -- are we implementing hashtags?'],
        date: 'January 27th, 2021',
        likesNumber: 200,
        commentsNumber: 5,
        liked: false,
        id: 3,
        user :
          {
            username: "example01",
            bio: " user defined bio -- max length = ?, default blank",
            profilePicture: "https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80",
            followingNumber: 1257,
            followerNumber: 12,
          }
    },
    {
        image: 'https://images.unsplash.com/photo-1613225133848-bf053ca4d90e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        description: ['Not all who wonder are lost.','This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.'],
        date: 'January 20th, 2021',
        likesNumber: 100,
        commentsNumber: 100,
        liked: false,
        id: 4,
        user :
          {
            username: "example01",
            bio: " user defined bio -- max length = ?, default blank",
            profilePicture: "https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80",
            followingNumber: 1257,
            followerNumber: 12,
          }
    },
    {
        image: 'https://images.unsplash.com/photo-1557979619-445218f326b9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        description: ['Fuck yeah. -- Do we need to implementing some kind of language filter?'],
        date: 'January 20th, 2021',
        likesNumber: 100,
        commentsNumber: 100,
        liked: false,
        id: 5,
        user :
          {
            username: "example01",
            bio: " user defined bio -- max length = ?, default blank",
            profilePicture: "https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80",
            followingNumber: 1257,
            followerNumber: 12,
          }
    },
    {
        image: 'https://images.unsplash.com/photo-1571506538622-d3cf4eec01ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        description: ['Haunted? Hedge your bets.'],
        date: 'January 20th, 2021',
        likesNumber: 100,
        commentsNumber: 100,
        liked: false,
        id: 6,
        user :
          {
            username: "example01",
            bio: " user defined bio -- max length = ?, default blank",
            profilePicture: "https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80",
            followingNumber: 1257,
            followerNumber: 12,
          }
    },
  
  ];  

function getPhoto(id)
{
    var photo;
    for (var p in photoData) {
        var obj = photoData[p]
        if (obj.id == id)
        {
            photo = obj;
            break;
        }
        
    }
    return photo
}

const PhotoPage = () => {
    let { id } = useParams()

    var photo = getPhoto(id)
    
    return(
        <div className="container mt-3">
            <div className = "container" id="photo-box">
                <div className="row">
                    <div className = "col-8">
                        <div className ="photo-container">
                            <img src={photo.image} alt={photo.date} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="info-display pt-3">
                            <div>
                                <UserTag profilePicture={photo.user.profilePicture} username={photo.user.username} />
                            </div>
                            <div className="description-display pt-2">
                                {photo.description.map((line , index) => 
                                    <p key={ index }>{line}</p>
                                )}
                            </div>
                            <div><small className = "text-muted">Posted {photo.date} </small></div>
                            <div>
                                <div className="like-count-display d-inline"><LikeButton liked = {photo.liked}/> 
                                <small>{formatNumber(photo.likesNumber)}</small> </div>
                                <div className="comment-count-display d-inline"><button className = "comment-button" onClick = {() => console.log("comment button clicked.")}>
                                    <i className="fa fa-comment-o"></i>
                                </button> 
                                <small>{formatNumber(photo.commentsNumber)}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 p-3">

                        <div className="add-comment-display">
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

                        <div id="comment-list" className="card mt-2">
                                <ul className = "list-group list-group-flush">
                                    {comments.map((comment) => (
                                        <li key={ comment.id } className="list-group-item p-0">
                                            <div className="comment card-body">
                                            <div className="row">
                                                <div className = "col-3 comment-commenter">
                                                    <UserTag profilePicture={comment.user.profilePicture} username={comment.user.username}  />
                                                </div>
                                                <div className = "col comment-text">
                                                    <p>{comment.text}</p>
                                                    <small className="text-muted">Posted {comment.date.toLocaleDateString()}</small>
                                                </div> 
                                            </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoPage
