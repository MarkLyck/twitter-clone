import Backbone from 'backbone'

import store from '../store'
import User from '../models/User'


let FollowersCollection = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
  model: User
});

let followersCollection = new FollowersCollection()

export default followersCollection
