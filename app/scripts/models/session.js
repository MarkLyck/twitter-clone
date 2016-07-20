import Backbone from 'backbone'
import router from '../router'
import store from '../store'

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/kid_By1OAAow/login`,
  defaults: {
    username: '',
    following: [],
    followers: [],
    liked: []
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        fullName: response.fullName,
        email: response.email,
        following: response.following,
        followers: response.followers,
        liked: response.liked,
        userId: response._id
      }
    }
  },
  login: function(username, password) {
    this.save({username: username,password: password},
    {
      success: (model, response) => {
        this.unset('password')
        router.navigate('feed', {trigger: true})
        localStorage.authtoken = response._kmd.authtoken
      },
      error: function(model, response) {
        console.log('ERROR: Login failed');
      }
    })
  },
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_me`,
      error: function(response) {
        throw new Error('FETCHING USER FAILED!')
      }
    })
  }
})

// let session = new Session()

export default Session
