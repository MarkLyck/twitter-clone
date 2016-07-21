
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import moment from 'moment'

import router from '../router'
import store from '../store'

import Like from '../models/Like'

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
    this.model.destroy({
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/${this.model.get('_id')}?resolve=likes`
    })
  },
  editTweet: function() {
    router.navigate(`edit/${this.model.get('_id')}`, {trigger:true})
  },
  gotoProfile: function() {
    router.navigate(`user/${this.model.get('username')}`, {trigger:true})
  },
  likeTweet: function() {
    let currentLikes = 0
    if (this.model.get('likes')._obj) {
      currentLikes = this.model.get('likes')._obj.likes
    }

    let like = new Like()
    let currLikeObj = this.model.get('likes')

    like.fetch({
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/likes/${currLikeObj._obj._id}`,
      success: () => {
        let numberOfLikes = like.get('likes')
        let newLikedArr = store.session.get('liked')
        // If the user has liked something before:
        // if (store.session.get('liked')) {
          // If user hasn't already liked this tweet.
          if (store.session.get('liked').indexOf(this.model.get('_id')) === -1) {
            newLikedArr.push(this.model.get('_id'))
            store.session.set('liked', newLikedArr)
            store.session.updateUser()
            like.like()
            this.$('.like-btn').html(`<i class="fa fa-heart" aria-hidden="true"></i> ${numberOfLikes + 1}`).addClass('liked')
          } else {
            newLikedArr = _.without(newLikedArr, this.model.get('_id'))
            store.session.set('liked', newLikedArr)
            store.session.updateUser()
            like.unlike()
            this.$('.like-btn').html(`<i class="fa fa-heart" aria-hidden="true"></i> ${numberOfLikes - 1}`).removeClass('liked')
          }
          // The user has never liked anything.
        }
    })


  },
  render: function() {
    this.$el.html(this.template())
    if (this.model.get('likes')._obj) {
      this.$('.like-btn').html(`<i class="fa fa-heart" aria-hidden="true"></i> ${this.model.get('likes')._obj.likes}`)
    }
    if (store.session.get('liked')) {
      if (store.session.get('liked').indexOf(this.model.get('_id')) !== -1) {
        this.$('.like-btn').addClass('liked')
      }
    }
    if (this.model.get('username') === store.session.get('username')) {
      let $delBtn = $(`<button class="del-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>`)
      let $editBtn = $(`<button class="edit-btn"><i class="fa fa-pencil" aria-hidden="true"></i></button>`)
      this.$('.tweet-options').append($editBtn).append($delBtn)
    }
    return this
  }
})

export default SingleTweetView
