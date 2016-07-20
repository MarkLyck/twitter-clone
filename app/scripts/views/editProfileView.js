import Backbone from 'backbone'
import router from '../router'
import store from '../store'



const EditProfileView = Backbone.View.extend({
  id: 'modal-container',
  template: function() {
    return `
    <div class="edit-profile-modal modal">
      <div id="edit-profile-header">
        <h3>Edit Profile</h3>
        <button class="close-btn">X</button>
      </div>
      <input id="edit-fullname-input" type="text" placeholder="Full Name">
      <input id="edit-location-input" type="text" placeholder="Location">
      <input id="edit-website-input" type="text" placeholder="Website">
      <input id="edit-birthday-input" type="text" placeholder="Birthday">
      <button id="edit-profile" class="blue-button">Save changes</button>
      <button id="cancel-edit-profile">Cancel</button>
    </div>
    `
  },
  events: {
    'click #edit-profile': 'editProfile',
    'click #cancel-edit-profile': 'cancel'
  },
  editProfile: function() {



    let userFullName = this.$('#edit-fullname-input').val()
    let userLocation = this.$('#edit-location-input').val()
    let userWebsite = this.$('#edit-website-input').val()
    let userBD = this.$('#edit-birthday-input').val()
    // console.log(store.session);
    console.log(userFullName);
    // console.log(profileUser);

    store.session.save({
      fullName: userFullName,
      location: userLocation,
      website: userWebsite,
      birthday: userBD
    },
    {
      type: 'PUT',
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/${store.session.get('userId')}`,
      success: function(model, response, xhr) {
        console.log(response);
        sessionStorage.session = JSON.stringify(store.session)
        router.navigate('user/' + store.session.get('username'), {trigger:true})
      },
      error: function(model, response) {
        console.log('ERROR: ', arguments);
      }
    })
  },
  cancel: function() {
    router.navigate('user/' + store.session.get('username'), {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    // this.$('#tweet-textarea').val(tweetToEdit.get('body'))
    return this
  }
})

export default EditProfileView
