export default Em.Component.extend({
    tagName: "div",
    render: function(buffer) {
        //buffer.push(this.get("model.parsedContent"));
    },
    //parsedContentChanged: function() {
    //    this.rerender();
    //}.observes('model.parsedContent')
});