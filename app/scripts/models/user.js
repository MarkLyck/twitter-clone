import Backbone from 'backbone'

const User = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/kid_By1OAAow/`,
  defaults: {
    username: ''
  },
})

export default User
