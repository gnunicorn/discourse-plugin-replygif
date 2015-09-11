import showModal from 'discourse/lib/show-modal';
import ApplicationRoute from 'discourse/routes/application';
import ComposerView from 'discourse/views/composer';

export default
{
  name: 'replygif',
  initialize()
  {
    ApplicationRoute.reopen({
      actions: {
        showReplyGif: function (composerView) {
          showModal('replygif');
          this.controllerFor('replygif').setProperties({composerView: composerView});
        }
      }
    });

    ComposerView.reopen({
      initEditor: function () {
        // overwrite and wrap.
        this._super();
        if (Discourse.SiteSettings.replygif_enabled
          && Discourse.SiteSettings.replygif_api_url
          && Discourse.SiteSettings.replygif_api_key) {
          var view = this;
          var button_text = I18n.t("replygif.composer_button_text");
          var btn = $('<button class="wmd-button wmd-replygif-button" title="' + button_text + '" aria-label="' + button_text + '"></button>');
          btn.click(function () {
            view.get("controller").send("showReplyGif", view);
          });
          $("#wmd-button-row,.wmd-button-row").append(btn);
        }
      }
    });
  }
};