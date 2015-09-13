import ModalFunctionality from 'discourse/mixins/modal-functionality';

export default Ember.Controller.extend(ModalFunctionality, {
  loading: true,
  categories: [],
  selectedTags: [],
  currentGifs: [],
  tags: [],
  selectedGifs: [],

  loadingTags: function(){
    return this.get("categories").length === 0;
  }.property("categories"),

  popularCategories: function(){
    return this.get("categories").sortBy("count");
  }.property("categories"),

  filterCategories: function() {
    return this.get("categories").filter(function(item) { return item.title.length > 0; }).uniq();
  }.property("categories"),

  selectedGifsChanged: function() {
    this.rerender();
  }.observes("selectedGifs"),

  hasSelectedGifs: function() {
    return this.get("selectedGifs").length > 0 ? "" : "disabled";
  }.property("selectedGifs"),

  actions: {
    pickItem: function(file) {
      var currentSelectedItems = this.get("selectedGifs");
      var itemLocation = currentSelectedItems.indexOf(file);
      if (itemLocation > -1) {
        currentSelectedItems.splice(itemLocation, 1);
      } else {
        currentSelectedItems.push(file);
      }
    }
  },

  refresh: function() {
    this.set("loading", true);
    this.set("selectedGifs", []);

    var url = this.getUrl("gifs"), to_check = false;

    if (this.get("selectedCategory")) {
      url += "&reply=" + this.get("selectedCategory");
      to_check = true;
    }

    if (this.get("selectedTags")) {
      url += "&tag-operator=and&tag=" + this.get("selectedTags").join(",");
      to_check = true;
    }

    if (!to_check) {
      this.get("currentGifs").setObjects([]);
      this.set("loading", false);
      return;
    }

    Discourse.ajax(url).then(function(resp) {
      this.get("currentGifs").setObjects(resp);
      this.set("loading", false);
    }.bind(this));
  },

  init: function () {
    this._super();
    this.setProperties({"loading": true, "categories": [], "selectedCategory": "", tags: [], selectedGifs: [] });

    this.addObserver("selectedCategory", function() {
      this.refresh();
    }.bind(this));

    this.addObserver("selectedTags", function() {
      this.refresh();
    }.bind(this));

    Discourse.ajax(this.getUrl("replies")).then(
      function(resp) {
        this.set("categories", resp);
        this.set("selectedCategory", this.get("filterCategories")[0].title);
        this.refresh();
      }.bind(this)
    );

    Discourse.ajax(this.getUrl("tags")).then(
        function(resp) {
          this.set("tags", resp);
        }.bind(this)
    );
  },

  getUrl: function(path) {
    return this.siteSettings.replygif_api_url + path + "?api-key=" + this.siteSettings.replygif_api_key;
  }
});