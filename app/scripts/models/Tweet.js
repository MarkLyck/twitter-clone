import Backbone from 'backbone'
import store from '../store'

const Tweet = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/`,
  // url: function() {
  //   console.log('CUSTOM URL');
  //   console.log(this);
  //   return `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/${this.get('idAttribute')}?resolve=likes`
  // },
  defaults: {
    username: '',
    // likes: 0,
    likes: {
      _type: "KinveyRef",
      _id: '',
      _collection: 'collectionName'
    }
  },
  idAttribute: '_id'
})

export default Tweet
