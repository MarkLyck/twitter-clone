import $ from 'jquery'
import Backbone from 'backbone'

import store from '../store'
import router from '../router'

const HeaderView = Backbone.View.extend({
  tagName: 'header',
  template: function() {
    return `
    <nav>
      <button id="home"><i class="fa fa-home" aria-hidden="true"></i></button>
      <i class="fa fa-twitter logo" aria-hidden="true"></i>
      <div class="wrapper">
      </div>
    </nav>
    `
  },
  events: {
    'click #logout-btn': 'logout',
    'click #new-tweet' : 'newTweet',
    'click #goto-login': 'gotoLogin',
    'click #home'       : 'gotoFeed'
  },
  logout: function() {
    store.session.save(null, {
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_logout`,
      success: () => {
        store.session.clear()
        localStorage.removeItem('authtoken')
        router.navigate('feed', {trigger:true})
        this.render()
      }
    })
  },
  newTweet: function() {
    router.navigate('newTweet', {trigger:true})
  },
  gotoLogin: function() {
    router.navigate('login', {trigger:true})
  },
  gotoFeed: function() {
    router.navigate('feed', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    if (localStorage.getItem('authtoken')) {
      let $logoutBtn = $(`<button id="logout-btn">Logout</button>`)
      let $newTweetBtn = $(`<button id="new-tweet" class="blue-button"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Tweet</button>`)
      this.$('.wrapper').append($logoutBtn).append($newTweetBtn)
    } else {
      let $loginBtn = $(`<button id="goto-login">Login</button>`)
      this.$('.wrapper').append($loginBtn)
    }
    return this
  }
})

export default HeaderView
