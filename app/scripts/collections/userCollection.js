import Backbone from 'backbone'

// import Tweet from '../models/Tweet'
import store from '../store'
import User from '../models/User'


let UserCollection = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
  model: User
});

let userCollection = new UserCollection()

export default userCollection
