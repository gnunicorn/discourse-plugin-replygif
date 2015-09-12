import StringBuffer from 'discourse/mixins/string-buffer';

export default Ember.View.extend(StringBuffer, {
  tagName: "div",
  selected: false,
  classNames: ["replygif-imgwrap"],
  rawTemplate: "replygif-result.raw",

  click: function() {
    return this.send("pickItem");
    this.set("selected", !this.get("selected"))
  },

  actions: {
    pickItem: function(ev){
      this.get("controller").send("imageSelected", this.get("datasource.file"))
    }
  },

  imagePath: function(){
    if (this.get("selected")) {
      return this.get("datasource.file");
    } else {
      return this.get("datasource.file").replace("/i/", "/thumbnail/");
    }
  }.property("datasource.file", "selected")

});
