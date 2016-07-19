import Backbone from 'backbone'

import store from '../store'
import router from '../router'

// import session from '../models/session'

const HeaderView = Backbone.View.extend({
  tagName: 'header',
  template: function() {
    return `
    <nav>
      <h3>Tweeter</h3>
      <button id="logout-btn">Logout</button>
    </nav>
    `
  },
  events: {
    'click #logout-btn': 'logout'
  },
  logout: function() {
    console.log(store.session);
    store.session.save(null, {
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_logout`,
      success: function() {
        store.session.clear()
        console.log('You logged out');
        router.navigate('login', {trigger:true})
      }
    })
  },
  render: function() {
    this.$el.html(this.template())
    return this
  }
})

export default HeaderView
