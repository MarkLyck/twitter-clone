import Backbone from 'backbone'
import router from '../router'



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
    router.navigate('feed', {trigger:true})
  },
  cancel: function() {
    router.navigate('feed', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    // this.$('#tweet-textarea').val(tweetToEdit.get('body'))
    return this
  }
})

export default EditProfileView
