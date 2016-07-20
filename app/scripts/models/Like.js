import Backbone from 'backbone'

const Like = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${store.settings.appKey}/likes`,
})

export default Like
