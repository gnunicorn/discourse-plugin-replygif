import StringBuffer from 'discourse/mixins/string-buffer';

export default Ember.View.extend(StringBuffer, {
  result: Em.computed.alias("content"),
  tagName: "div",
  selected: false,
  classNames: ["replygif-imgwrap"],
  rawTemplate: "replygif-result.raw",

  selectedClass: function() {
    return this.get("selected") ? "selected" : "";
  }.property("selected"),

  selectedChanged: function() {
    this.rerender();
  }.observes('selected'),

  click: function() {
    this.set("selected", !this.get("selected"));
    this.get("controller").send("pickItem", this.get("result.file"));
  },

  imagePath: function() {
    if (this.get("selected")) {
      return this.get("result.file");
    } else {
      return this.get("result.file").replace("/i/", "/thumbnail/");
    }
  }.property("result.file", "selected")

});
