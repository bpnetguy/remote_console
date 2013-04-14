define(['backbone', 'views/console/Console',
    'views/jsconsole/Console'], function(Backbone, Console, JSConsole) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "jsConsole": "showJSConsole",
            "jsConsole/:clientName": "showJSConsole",
            "home": "defaultRoute",
            "*actions": "defaultRoute"
        },
        setViewManager: function(viewManager) {
            this.viewManager = viewManager;
        },
        showJSConsole: function(clientName) {
            console.log("Show JS Console");
            var jsConsole = new JSConsole({clientName: clientName});
            this.viewManager.showView(jsConsole);
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

