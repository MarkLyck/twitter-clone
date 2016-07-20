import Backbone from 'backbone'
import store from '../store'

const Tweet = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/`,
  defaults: {
    username: '',
    likes: 0
  },
  idAttribute: '_id'
})

export default Tweet