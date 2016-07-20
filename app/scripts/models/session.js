import Backbone from 'backbone'

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
  }
})

// let session = new Session()

export default Session
