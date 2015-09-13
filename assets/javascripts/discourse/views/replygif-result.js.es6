import StringBuffer from 'discourse/mixins/string-buffer';

export default Ember.View.extend(StringBuffer, {
  result: Em.computed.alias("content"),
  tagName: "div",
  classNames: ["replygif-imgwrap"],
  rawTemplate: "replygif-result.raw",

  isSelected: function() {
    return this.get("controller.selectedGifs").indexOf(this.get("result.file")) > -1;
  }.property("controller.selectedGifs"),

  selectedGifsChanged: function() {
    this.rerender();
  }.observes('controller.selectedGifs'),

  click: function() {
    this.get("controller").send("pickItem", this.get("result.file"));
  },

  imagePath: function() {
    if (this.get("controller.selectedGifs").indexOf(this.get("result.file")) > -1) {
      return this.get("result.file");
    } else {
      return this.get("result.file").replace("/i/", "/thumbnail/");
    }
  }.property("result.file", "controller.selectedGifs")

});
