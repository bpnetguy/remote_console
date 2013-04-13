define(['backbone', 'views/console/Console'], function(Backbone, Console) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        },
        setViewManager: function(viewManager) {
            this.viewManager = viewManager;
        },
        defaultRoute: function() {
            var console = new Console();
            this.viewManager.showView(console);
        }
    });
    // Initiate the router

    // Start Backbone history a necessary step for bookmarkable URL's
    var appRouter = new AppRouter();
    return appRouter;
});

