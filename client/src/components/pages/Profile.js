import React from 'react';

//Import required components
import ImageCard from '../building-blocks/ImageCard';
import FollowButton from '../building-blocks/FollowButton';
import formatNumber from '../../utils/numberFormat';

//hard-coded example of the user who's profile is being viewed
const user = {
  username: 'example01',
  bio: ' user defined bio',
  profilePicture:
    'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
  followingNumber: 1257,
  followerNumber: 12,
};

//hard-coded example of the user who is viewing the profile. (eventually auth.user)
const visitingUser = {
  username: 'example02',
  isFollowingUser: false,
};

//Hard-coded test cards
const photoData = [
  {
    postedPicture:
      'https://images.unsplash.com/photo-1543255006-d6395b6f1171?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    description: ['Delicious! #delicious -- are we implementing hashtags?'],
    date: '2021-02-22T06:45:34.671+00:00',
    likesNumber: 3456,
    commentsNumber: 125,
    liked: true,
    id: 1,
    user: {
      username: 'example01',
      bio: ' user defined bio -- max length = ?, default blank',
      profilePicture:
        'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
      followingNumber: 1257,
      followerNumber: 12,
    },
  },
  {
    postedPicture:
      'https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    description: ['woof.'],
    date: '2021-02-13T06:45:34.671+00:00',
    likesNumber: 10756,
    commentsNumber: 1234,
    liked: true,
    id: 2,
    user: {
      username: 'example01',
      bio: ' user defined bio -- max length = ?, default blank',
      profilePicture:
        'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
      followingNumber: 1257,
      followerNumber: 12,
    },
  },
  {
    postedPicture:
      'https://images.unsplash.com/photo-1565553642973-6afe791aee33?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=723&q=80',
    description: [
      "Don't mind me, just living the #burger life. -- are we implementing hashtags?",
    ],
    date: '2021-01-05T06:45:34.671+00:00',
    likesNumber: 200,
    commentsNumber: 5,
    liked: false,
    id: 3,
    user: {
      username: 'example01',
      bio: ' user defined bio -- max length = ?, default blank',
      profilePicture:
        'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
      followingNumber: 1257,
      followerNumber: 12,
    },
  },
  {
    postedPicture:
      'https://images.unsplash.com/photo-1613225133848-bf053ca4d90e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    description: [
      'Not all who wonder are lost.',
      'This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.This is a super long comment spanning several lines and with multiple paragraphs.',
    ],
    date: '2020-08-28T06:45:34.671+00:00',
    likesNumber: 100,
    commentsNumber: 100,
    liked: false,
    id: 4,
    user: {
      username: 'example01',
      bio: ' user defined bio -- max length = ?, default blank',
      profilePicture:
        'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
      followingNumber: 1257,
      followerNumber: 12,
    },
  },
  {
    postedPicture:
      'https://images.unsplash.com/photo-1557979619-445218f326b9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: [
      'Fuck yeah. -- Do we need to implementing some kind of language filter?',
    ],
    date: '2020-05-11T06:45:34.671+00:00',
    likesNumber: 100,
    commentsNumber: 100,
    liked: false,
    id: 5,
    user: {
      username: 'example01',
      bio: ' user defined bio -- max length = ?, default blank',
      profilePicture:
        'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
      followingNumber: 1257,
      followerNumber: 12,
    },
  },
  {
    postedPicture:
      'https://images.unsplash.com/photo-1571506538622-d3cf4eec01ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: ['Haunted? Hedge your bets.'],
    date: '2020-03-02T06:45:34.671+00:00',
    likesNumber: 100,
    commentsNumber: 100,
    liked: false,
    id: 6,
    user: {
      username: 'example01',
      bio: ' user defined bio -- max length = ?, default blank',
      profilePicture:
        'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
      followingNumber: 1257,
      followerNumber: 12,
    },
  },
];

export const Profile = () => {
  return (
    <div className="container">
      <div className="container" id="user-info">
        <div className="row align-items-center">
          <div className="col-4">
            <div className="profile-photo-container">
              <img
                className="rounded-circle"
                alt={user.username}
                src={user.profilePicture}
              />
            </div>
          </div>
          <div className="col-8">
            <div className="container p-4">
              <div>
                <h3>{user.username}</h3>
              </div>
              <div>
                <h6>
                  <span
                    id="follower-number"
                    onClick={() => console.log('follower span clicked')}
                  >
                    {formatNumber(user.followerNumber)}
                    <span className="text-muted"> followers </span>
                  </span>
                  <span
                    id="following-number"
                    className="ml-3"
                    onClick={() => console.log('following span clicked')}
                  >
                    {formatNumber(user.followingNumber)}
                    <span className="text-muted"> following</span>
                  </span>
                </h6>
              </div>
              <div>
                <p>{user.bio}</p>
              </div>
              <div>
                {
                  //to be replace with auth.user and user who's profile it is (visiting user will not neeed to be passed)
                  visitingUser !== user.username ? (
                    <FollowButton user={user} visiting={visitingUser} />
                  ) : (
                    ''
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div id="photo-card-grid" className="container pt-5">
        <div className="row row-cols-1 row-cols-md-3">
          {photoData.map((photo) => (
            <div key={photo.id} className="col mb-4">
              <ImageCard photo={photo} loggedIn={user.loggedIn} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
