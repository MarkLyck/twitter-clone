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
    'click .del-btn': 'deleteTweet',
    'click .edit-btn': 'editTweet',
    'click .tweet-user': 'gotoProfile'
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
