import Backbone from 'backbone'

import store from '../store'
import User from '../models/User'


let FollowingCollection = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
  model: User
});

let followingCollection = new FollowingCollection()

export default followingCollection
