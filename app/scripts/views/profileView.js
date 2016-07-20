import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import moment from 'moment'

import router from '../router'
import store from '../store'

import tweetsCollection from '../collections/tweetsCollection'
import SingleTweetView from './singleTweetView'
import userCollection from '../collections/userCollection'
import followingCollection from '../collections/followingCollection'
import followersCollection from '../collections/followingCollection'
import likedCollection from '../collections/likedCollection'



const ProfileView = Backbone.View.extend({
  initialize: function(username) {
    tweetsCollection.reset()
    tweetsCollection.fetch({
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/?query={"username":"${username}"}`,
      success: () => {
        this.render()
      }
    })
    userCollection.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/?query={"username":"${username}"}`,
      success: response => {
        this.model = response.models[0]
        this.render()
      }
    })
    followingCollection.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
      data: {
        query: JSON.stringify({'$or': [{'username': 'ducky'}, {'username': 'testy'}]})
      },
      success: () => {
        // console.log(followingCollection);
        // this.render()
      }
    })
    // followersCollection.fetch({
    //   url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
    //   data: {
    //     query: JSON.stringify({'$or': [{'username': 'username'}, {'username': 'username'}]})
    //   },
    //   success: () => {
    //     console.log(followersCollection);
    //     this.render()
    //   }
    // })
    console.log(store.session.liked);
    likedCollection.fetch({
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/`,
      // data: {
      //   query: JSON.stringify({'$or:': [{'_id': 'username'}, {'username': 'username'}]})
      // },
      success: function(response) {
        // console.log(response);
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
    'click #follow-user' : 'followUser',
    'click #unfollow-user' : 'unFollowUser'
  },
  gotoEditProfile: function() {
    router.navigate('user/' + this.model.get('username')+'/edit', {trigger:true})
  },
  followUser: function() {
    let newFollowing = []
    if (store.session.get('following')) {
      newFollowing = store.session.get('following')
      newFollowing.push(this.model.get('username'))
      store.session.set('following', _.uniq(newFollowing))
      this.render()
      store.session.updateUser()
    }
  },
  unFollowUser: function() {
    if (store.session.get('following')) {
      let newFollowing = store.session.get('following')
      newFollowing = _.without(newFollowing, this.model.get('username'))
      store.session.set('following', _.uniq(newFollowing))
      this.render()
      store.session.updateUser()
    } else {
      throw new Error('Couldn\'t find the users you are following')
    }
  },
  render: function() {
    this.$el.html(this.template())

    if (this.model) {
      this.$('#profile-full-name').text(this.model.get('fullName'))
      this.$('#profile-username').text('@' + this.model.get('username'))
      this.$('#profile-location').text(this.model.get('location'))
      this.$('#profile-joined').text('Joined ' + moment(this.model.get('_kmd').ect).format('MMMM YYYY'))

      let $TweetNumber = $(`<h3>${tweetsCollection.length}</h3>`)
      let $FollowingNumber = $(`<h3>${this.model.get('following').length}</h3>`)
      // let $FollowersNumber = $(`<h3>${profileUser.get('followers').length}</h3>`)
      // let $LikesNumber = $(`<h3>${profileUser.get('likes').length}</h3>`)

      this.$('#profile-tweets').append($TweetNumber)
      this.$('#profile-following').append($FollowingNumber)

      if (this.model.get('username') === store.session.get('username')) {
        let $editProfileBtn = $(`<button id="edit-profile">Edit Profile</button>`)
        this.$('#profile-bar').append($editProfileBtn)
      } else if (store.session.get('following').indexOf(this.model.get('username')) === -1){
        let $followBtn = $(`<button id="follow-user" class="blue-button"><i class="fa fa-user-plus" aria-hidden="true"></i> Follow</button>`)
        this.$('#profile-bar').append($followBtn)
      } else {
        let $unFollowBtn = $(`<button id="unfollow-user" class="blue-button">Following</button>`)
        this.$('#profile-bar').append($unFollowBtn)
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
