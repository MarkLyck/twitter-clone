import Backbone from 'backbone'

import Tweet from '../models/Tweet'
import store from '../store'


let LikedCollection = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/`,
  model: Tweet
});

let likedCollection = new LikedCollection()

export default likedCollection
