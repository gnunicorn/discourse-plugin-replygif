import ModalFunctionality from 'discourse/mixins/modal-functionality';

export default Ember.Controller.extend(ModalFunctionality, {
    loading: true,

    refresh: function () {
        this.set("loading", true);
    },

    init: function () {
        this._super();
    }
});