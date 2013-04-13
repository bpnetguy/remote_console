define(['backbone', 'ViewManager', 'router'], function(Backbone, ViewManager, router) {

    return {
        initialize: function() {
            var el = $('<div></div>')[0];
            var viewManager = new ViewManager({el:el});
            router.setViewManager(viewManager);
            $('body').append(el);
            Backbone.history.start();
            Backbone.history.navigate("#home");
        }
    }
});

