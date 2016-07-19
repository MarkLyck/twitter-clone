import Backbone from 'backbone'
import store from '../store'

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${store.settings.appKey}/login`,
  defaults: {
    username: ''
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        userId: response._id
      }
    }
  }
})

let session = new Session()

export default session
