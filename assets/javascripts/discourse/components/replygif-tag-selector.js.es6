import TextField from 'discourse/components/text-field';

export default TextField.extend({
  datasource: [],
  search: "",

  _initializeAutocomplete: function() {
    var self = this,
        selected = [];

    this.$().val(this.get('tags')).autocomplete({
      template: this.container.lookup('template:replygif-tag-selector-autocomplete.raw'),
      disabled: this.get('disabled'),

      dataSource: function(term) {
        self.set("search", term.toLowerCase());
        var searchTerm = self.get("search");
        return self.get("datasource").filter(function(item) {
          return item.title.toLowerCase().match(new RegExp("^" + searchTerm + ".*"));
        }).uniq().mapBy('title');
      },

      onChangeItems: function(items) {
        items = items.map(function(i) {
          return i.title ? i.title : i;
        });
        self.set('tags', items.join(","));
        selected = items;
      }
    });
  }.on('didInsertElement'),

  _removeAutocomplete: function() {
    this.$().autocomplete('destroy');
  }.on('willDestroyElement'),

  // THIS IS A HUGE HACK TO SUPPORT CLEARING THE INPUT
  _clearInput: function() {
    if (arguments.length > 1) {
      if (Em.isEmpty(this.get("tags"))) {
        this.$().parent().find("a").click();
      }
    }
  }.observes("tags")

});
