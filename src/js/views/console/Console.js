define(['backbone', "./ConsoleInput", "./ConsoleOutput"], function (Backbone, ConsoleInput, ConsoleOutput){
    var Console = Backbone.View.extend({
        events:{
            "click": "focus"
        },
        id:"console",
        focus: function() {
            this.views['consoleInput'].$el.focus()
        },
        initialize: function() {
            var views = this.views = {};
            var consoleInput = new ConsoleInput();
            var consoleOutput = new ConsoleOutput();
            views['consoleInput'] = consoleInput;
            views['consoleOutput'] = consoleOutput;

            $.subscribe("#consoleOutput",
                    function(topic, data) {
                        if(data === "clear") {

                        } else {

                        }

                    }, this);
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