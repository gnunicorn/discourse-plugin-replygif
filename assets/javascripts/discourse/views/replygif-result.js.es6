import StringBuffer from 'discourse/mixins/string-buffer';

export default Ember.View.extend(StringBuffer, {
  result: Em.computed.alias("content"),
  tagName: "div",
  selected: false,
  classNames: ["replygif-imgwrap"],
  rawTemplate: "replygif-result.raw",

  selectedChanged: function() {
    this.rerender();
  }.observes('selected'),

  click: function() {
    this.set("selected", !this.get("selected"));
    this.set("controller.selectedGif", this.get("result.file"));
  },

  actions: {
    pickItem: function(ev){
      this.get("controller").send("imageSelected", this.get("result.file"))
    }
  },

  imagePath: function() {
    if (this.get("selected")) {
      return this.get("result.file");
    } else {
      return this.get("result.file").replace("/i/", "/thumbnail/");
    }
  }.property("result.file", "selected")

});
