import Backbone from 'backbone'

import Tweet from '../models/Tweet'
import store from '../store'


let TweetsCollection = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/`,
  model: Tweet
});

let tweetsCollection = new TweetsCollection()

export default tweetsCollection
