import Backbone from 'backbone'
import store from '../store'

const Like = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${store.settings.appKey}/likes`,
  defaults: {
    likes: 0
  },
  like: function() {
    console.log('LIKING IT');

    this.set('likes', this.get('likes') + 1)
    console.log(this);
    this.save(null, {
      type: 'PUT',
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/likes/${this.get('_id')}`,
      success:function() {
        console.log('SAVED LIKE SUCCESFULLY');
      },
      error: function(response) {
        console.log('ERROR on saving like', response);
      }
    })
  },
  unlike: function() {
    console.log('UNLIKING IT');
    this.set('likes', this.get('likes') - 1)
    console.log(this);
    this.save(null, {
      type: 'PUT',
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/likes/${this.get('_id')}`,
      success:function() {
        console.log('SAVED LIKE SUCCESFULLY');
      },
      error: function(response) {
        console.log('ERROR on saving like', response);
      }
    })
  }
})

export default Like
