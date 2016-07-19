import Backbone from 'backbone'

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/kid_By1OAAow/login`,
  defaults: {
    username: ''
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        fullName: response.fullName,
        userId: response._id
      }
    }
  }
})

// let session = new Session()

export default Session
