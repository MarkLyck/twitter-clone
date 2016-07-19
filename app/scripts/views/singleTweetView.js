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
  render: function() {
    this.$el.html(this.template())
    return this
  }
})

export default SingleTweetView
