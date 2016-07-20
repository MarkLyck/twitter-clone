import Backbone from 'backbone'
import store from '../store'

const Like = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${store.settings.appKey}/likes`,
  defaults: {
    likes: 0
  }
})

export default Like
