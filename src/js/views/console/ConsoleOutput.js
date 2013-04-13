define(['backbone', 'models/Command', 'pubsub'], function (Backbone, Command){
    var Console = Backbone.View.extend({
        tagName: "pre",
        id:"consoleOutput",
        initialize: function() {
            $.subscribe("#consoleOutput",
                    function(topic, cmd) {
                        if(cmd === "clear") {
                            this.render();
                            return;
                        }
//                        console.log(topic + " " + cmd);
                        this.$el.append("\n" + cmd);
                        var command = new Command({command:cmd});
                        command.save();

                    }, this);

        },
        render:function() {
            this.$el.html("remote_console$");
            return this;

        }
    });
    return Console;
});