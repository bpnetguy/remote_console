define(['backbone', "text!templates/menu/menu.html"], function (Backbone, template){
    var Console = Backbone.View.extend({
        events:{
            "click .menu": "navigate"
        },

        id:"menu",
        initialize: function() {
            this.$el.html(template);
        },
        navigate: function(e) {
            var page = e.currentTarget.getAttribute('page');
            Backbone.history.navigate("#"+ page, true);
        }

    });
    return Console;
});