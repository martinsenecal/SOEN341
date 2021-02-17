import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import ImageCard from '../building-blocks/ImageCard'

//Hard-coded test cards 
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

const Feed = () => {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      {auth.loading || auth.user === null ? (
        <div>Loading...</div>
      ) : (
        <>
          {' '}
          <h1>This is the feed! Wohoooo!</h1>
          <h2>Your username is: {auth.user.username}</h2>
          <div className = "container">
            <div id = "feed-list" className="container w-50">  
              {photoData.map((photo) => (
                    <div key = {photo.id}  className = "row">
                      <ImageCard user = {photo.user} image={photo.image} description = {photo.description} likesNumber =  { photo.likesNumber } commentsNumber = { photo.commentsNumber} date = {photo.date} liked = {photo.liked} id = {photo.id}/>
                    </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
    
  );
};

export default Feed;

