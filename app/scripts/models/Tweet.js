import Backbone from 'backbone'
import store from '../store'

const Tweet = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/`,
  url: function() {
    console.log('CUSTOM URL');
    console.log(this);
    if (this.get('idAttribute')) {
      return `${this.urlRoot}${this.get('idAttribute')}?resolve=likes`
    } else {
      return this.urlRoot
    }
  },
  defaults: {
    username: '',
    // likes: 0,
    likes: {
      _type: "KinveyRef",
      _id: '',
      _collection: 'likes'
    }
  },
  idAttribute: '_id'
})

export default Tweet
