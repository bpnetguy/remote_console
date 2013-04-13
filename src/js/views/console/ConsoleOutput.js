define(['backbone', 'pubsub'], function (Backbone){
    var Console = Backbone.View.extend({
        tagName: "pre",
        id:"consoleOutput",
        initialize: function() {
            $.subscribe("#consoleOutput",
                    function(topic, data) {
                        console.log(topic + " " + data);
                        this.$el.append("\n" + data);

                    }, this);

        },
        render:function() {
            this.$el.html("remote_console$");
            return this;

        }
    });
    return Console;
});