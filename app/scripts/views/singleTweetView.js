// Questions

/* 1, user's can only crud on their own data.

Because of this, you can't "like" someone elses post, or add your name to their "followers"
How to get around this without setting the security to "Public"

*/



/* 2 Can you have multiple collections of the same model? and is that acceptable?

I have a collection of users, that I use to fetch the user's profile when you go there.
But, I also need a list of all of that users followers.

Should I make a followersCollection for this?

*/



/* 3, how do you get models, based on a query in an array!?!?!?!

E.g.

Following: ['nicerhugs', 'testy', 'someotherusername']

I need to get those 3 users :(

*/



/* 4

Users that aren't logged in, are also not allowed to read tweets :(

*/


import $ from 'jquery'
import Backbone from 'backbone'
import moment from 'moment'

import router from '../router'
import store from '../store'

const SingleTweetView = Backbone.View.extend({
  tagName: 'li',
  className: 'tweet-item',
  template: function() {
    return `
      <div class="tweet-info">
        <h3 class="tweet-user">${this.model.get('fullName')}</h3>
        <h5>@${this.model.get('username')}</h5>
        <h5>${moment(this.model.get('_kmd').ect).format('MMM DD')}</h5>
      </div>
      <p>${this.model.get('body')}</p>
      <div class="tweet-options">
        <button class="reply-btn"><i class="fa fa-reply" aria-hidden="true"></i></button>
        <button class="like-btn"><i class="fa fa-heart" aria-hidden="true"></i></button>
      </div>
    `
  },
  events: {
    'click .del-btn'    : 'deleteTweet',
    'click .edit-btn'   : 'editTweet',
    'click .tweet-user' : 'gotoProfile',
    'click .like-btn'   : 'likeTweet'
  },
  deleteTweet: function() {
    this.model.destroy()
  },
  editTweet: function() {
    router.navigate(`edit/${this.model.get('_id')}`, {trigger:true})
  },
  gotoProfile: function() {
    router.navigate(`user/${this.model.get('username')}`, {trigger:true})
  },
  likeTweet: function() {
    let currentLikes = this.model.get('likes')
    if (store.session.likes.indexOf(this.model.get('_id')) === -1) {
      console.log('LIKE TWEET');
      this.model.set('likes', currentLikes + 1)
      this.model.save()
    } else {
      console.log('UNLIKE TWEET');
      this.model.set('likes', currentLikes - 1)
      this.model.save()
    }
  },
  render: function() {
    this.$el.html(this.template())
    if (this.model.get('username') === store.session.get('username')) {
      let $delBtn = $(`<button class="del-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>`)
      let $editBtn = $(`<button class="edit-btn"><i class="fa fa-pencil" aria-hidden="true"></i></button>`)
      this.$('.tweet-options').append($editBtn).append($delBtn)
    }
    return this
  }
})

export default SingleTweetView
