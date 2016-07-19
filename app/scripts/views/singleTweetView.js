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
      <div>
        <h3>${this.model.get('fullName')}</h3>
        <h5>${this.model.get('username')}</h5>
        <h5>${moment(this.model.get('_kmd').ect).format('MMM DD YYYY')}</h5>
      </div>
      <p>${this.model.get('body')}</p>
      <div class="tweet-options">
        <button class="like-btn">Like</button>
      </div>
    `
  },
  events: {
    'click .del-btn': 'deleteTweet',
    'click .edit-btn': 'editTweet'
  },
  deleteTweet: function() {
    console.log('DEL TWEET');
    this.model.destroy()
  },
  editTweet: function() {
    console.log('EDIT TWEET');
    router.navigate(`edit/${this.model.get('_id')}`, {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    if (this.model.get('username') === store.session.get('username')) {
      console.log('USERNAME MATCH');
      let $delBtn = $(`<button class="del-btn">Delete</button>`)
      let $editBtn = $(`<button class="edit-btn">Edit</button>`)
      this.$('.tweet-options').append($editBtn).append($delBtn)
    }
    return this
  }
})

export default SingleTweetView
