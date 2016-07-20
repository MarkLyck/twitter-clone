import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import moment from 'moment'

import router from '../router'
import store from '../store'

import tweetsCollection from '../collections/tweetsCollection'
import SingleTweetView from './singleTweetView'
import userCollection from '../collections/userCollection'

let profileUser;

const ProfileView = Backbone.View.extend({
  initialize: function(username) {
    tweetsCollection.on('add', () => this.render())
    tweetsCollection.fetch({
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/?query={"username":"${username}"}`,
    })
    // userCollection.on('add', () => this.render)
    userCollection.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/?query={"username":"${username}"}`,
      success: response => {
        profileUser = response.models[0]
        this.render()
      }
    })

  },
  id: 'profile-container',
  template: function() {
    return `
    <div id="profile-bar">
      <div class="wrapper">
        <button id="profile-tweets"><h4>Tweets</h4></button>
        <button id="profile-following"><h4>Following</h4></button>
        <button id="profile-followers"><h4>Followers</h4></button>
        <button id="profile-likes"><h4>Likes</h4></button>
      </div>
    </div>
    <main>
      <div class="left sidebar">
        <h2 id="profile-full-name"></h2>
        <h3 id="profile-username"></h3>
        <h4 id="profile-location"></h4>
        <h4 id="profile-joined"></h4>
      </div>
      <div class="center">
        <ul id="tweet-list"></ul>
      </div>
    </main>
    `
  },
  events: {
    'click #edit-profile': 'gotoEditProfile',
    'click #follow-user' : 'followUser'
  },
  gotoEditProfile: function() {
    router.navigate('user/' + profileUser.get('username')+'/edit', {trigger:true})
  },
  followUser: function() {
    console.log('FOLLOW', profileUser);
    let newFollowing = []
    if (store.session.get('following')) {
      newFollowing = store.session.get('following')
      newFollowing.push(profileUser.get('username'))
      store.session.set('following', _.uniq(newFollowing))
    }

    // let newFollowers = []
    // if (profileUser.get('following')) {
    //   let newFollowers = profileUser.get('followers')
    //   newFollowers.push(store.session.get('username'))
    // }

    store.session.save(null, {
      type: 'PUT',
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/${store.session.get('userId')}`,
      success: function(model, response, xhr) {
        console.log('UPDATED USER');
        router.navigate('user/' + profileUser.get('username'), {trigger:true})
      },
      error: function(model, response) {
        console.log('ERROR: ', arguments);
      }
    })



  //   profileUser.save({
  //     followers: newFollowers
  //   },
  //   {
  //     type: 'PUT',
  //     url: `https://baas.kinvey.com/user/${store.settings.appKey}/${profileUser.get('_id')}`,
  //     success: function(model, response, xhr) {
  //       console.log('UPDATED OTHER USER');
  //       router.navigate('user/' + store.session.get('username'), {trigger:true})
  //     },
  //     error: function(model, response) {
  //       console.log('ERROR: ', arguments);
  //     }
  //   })
  },
  render: function() {
    this.$el.html(this.template())

    if (profileUser) {
      this.$('#profile-full-name').text(profileUser.get('fullName'))
      this.$('#profile-username').text('@' + profileUser.get('username'))
      this.$('#profile-location').text(profileUser.get('location'))
      this.$('#profile-joined').text('Joined ' + moment(profileUser.get('_kmd').ect).format('MMMM YYYY'))

      let $TweetNumber = $(`<h3>${tweetsCollection.length}</h3>`)
      // let $FollowingNumber = $(`<h3>${profileUser.get('following').length}</h3>`)
      // let $FollowersNumber = $(`<h3>${profileUser.get('followers').length}</h3>`)
      // let $LikesNumber = $(`<h3>${profileUser.get('likes').length}</h3>`)

      this.$('#profile-tweets').append($TweetNumber)

      if (profileUser.get('username') === store.session.get('username')) {
        let $editProfileBtn = $(`<button id="edit-profile">Edit Profile</button>`)
        this.$('#profile-bar').append($editProfileBtn)
      } else {
        let $followBtn = $(`<button id="follow-user"><i class="fa fa-user-plus" aria-hidden="true"></i> Follow</button>`)
        this.$('#profile-bar').append($followBtn)
      }
    }



    tweetsCollection.forEach(tweet => {
      let singleTweetView = new SingleTweetView({model:tweet})
      singleTweetView.render()
      this.$('#tweet-list').append(singleTweetView.$el)
    })
    return this
  }
})

export default ProfileView
