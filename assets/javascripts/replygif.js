

Discourse.ReplygifItemView = Discourse.View.extend({
    tagName: "div",
    //attributeBindings: ["imagePath:src"],
    selected: false,
    classNames: ["replygif-imgwrap"],

    click: function() {
        if (this.get("autoanim")){
            return this.send("pickItem");
        }
        this.set("selected", !this.get("selected"))
    },

    actions: {
        pickItem: function(ev){
            this.get("controller").send("imageSelected", this.get("model.file"))
        }
    },

    imagePath: function(){
        if (this.get("selected") || this.get("autoanim")){
            return this.get("model.file");
        } else {
            return this.get("model.file").replace("/i/", "/thumbnail/");
        }
    }.property("model.file", "selected", "autoanim")
})

Discourse.ReplygifView = Discourse.ModalBodyView.extend({
    title: function() {return I18n.t("reply_gif.title"); }.property(),
});

Discourse.ReplygifController = Discourse.Controller.extend(Discourse.ModalFunctionality, {
  loading: true,
  tags: [],
  currentGifs: [],
  autoanim: false,
  selectedTags: [],

  autoanimcls: function(){
    return "onoffswitch" +  (this.get("autoanim") ? " checked": "");
  }.property("autoanim"),

  loadingTags: function(){
    return this.get("tags").length === 0;
  }.property("tags"),

  actions: {
    imageSelected: function(imageUrl){
        this.composerView.addMarkdown("\n![](" + imageUrl +")\n");
        this.send('hideModal');
      },
    toggleAutoanim: function(){
        this.set("autoanim", !this.get("autoanim"));
    },
  },

  popularTags: function(){
    return this.get("tags").sortBy("count");
  }.property("tags"),

  replyTags: function(){
    return this.get("tags").filter(function(item) {return item.reply.length > 0;}
                          ).sortBy("-count"
                          ).mapBy("reply"
                          ).uniq(
                          ).map(function(item) {return {name: item}}
                          );
  }.property("tags"),

  refresh: function() {
    this.set("loading", true);
    var URL = "http://replygif.net/api/gifs?api-key=39YAprx5Yi";
    if (this.get("replyTag")){
        URL += "&reply=" + this.get("replyTag");
    }
    Discourse.ajax(URL).then(function(resp){
        this.get("currentGifs").setObjects(resp);
        this.set("loading", false);
    }.bind(this));
  },

  init: function(){
    this._super();
    this.setProperties({"loading": true, "tags": [], "replyTag": ""});

    this.addObserver("replyTag", function(){
        this.refresh();
    }.bind(this))

    Discourse.ajax("http://replygif.net/api/tags?api-key=39YAprx5Yi").then(function(resp){
        this.set("tags", resp);
        this.set("replyTag", this.get("replyTags")[0].name);
        this.refresh();
    }.bind(this));
  }
});

Discourse.ApplicationRoute.reopen({

  actions: {
    showReplygif: function(composerView) {
      Discourse.Route.showModal(this, 'replygif');
      this.controllerFor('replygif').setProperties({ composerView: composerView });
    }
  }
});


Discourse.ComposerView.reopen({
    initEditor: function() {
        // overwrite and wrap.
        this._super();
        var view = this;
        var btn = $('<button class="wmd-button"><span class="fa fa-play-circle-o"></span></button>');
        btn.click(function() {
            //var controller = Discourse.__container__.lookup('controller:composer');
            view.get("controller").send("showReplygif", view);
        });
        $("#wmd-button-row").append(btn);
    }
});
