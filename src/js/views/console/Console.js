define(['backbone', "./ConsoleInput", "./ConsoleOutput"], function (Backbone, ConsoleInput, ConsoleOutput){
    var Console = Backbone.View.extend({
        id:"console",
        initialize: function() {

            var views = this.views = {};
            var consoleInput = new ConsoleInput();
            var consoleOutput = new ConsoleOutput();
            views['consoleInput'] = consoleInput;
            views['consoleOutput'] = consoleOutput;
        },
        render: function() {
            var views = this.views;
            this.$el.html("");
            this.$el.append(views['consoleOutput'].render().$el);
            this.$el.append(views['consoleInput'].render().$el);
        }

    });
    return Console;
});