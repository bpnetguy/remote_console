define(['backbone'], function(Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        },
        setViewManager: function(viewManager) {
            this.viewManager = viewManager;
        },
        defaultRoute: function() {
            console.log("defaultRoute");

        }
    });
    // Initiate the router

    // Start Backbone history a necessary step for bookmarkable URL's
    var appRouter = new AppRouter();
    return appRouter;
});

