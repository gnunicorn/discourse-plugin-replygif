import ModalBodyView from 'discourse/views/modal-body';

export default ModalBodyView.extend({
    title: function () {
        return I18n.t("replygif.modal_title");
    }.property()
});