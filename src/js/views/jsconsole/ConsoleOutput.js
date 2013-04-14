define(['backbone', 'models/Command', 'collections/Client','pubsub'], function (Backbone, Command, ClientCollection){
    var Console = Backbone.View.extend({
        tagName: "pre",
        id:"consoleOutput",
        initialize: function(options) {
            this.clientName = options.clientName;
            this.clientCollection = new ClientCollection();
            this.clientCollection.bind("sync", this.appendClientList, this);
            $.subscribe("#consoleOutput",
                    function(topic, cmd) {
                        if(cmd === "clear") {
                            this.render();
                            return;
                        } else if(cmd === "list") {
                            this.clientCollection.fetch({reset:true});
                        } else {
                            this.$el.append("\n$" + cmd);
                            var command = new Command({command:cmd});
                            var self = this;
                            command.save(null, {success: function(model, resp, options) {

                                self.$el.append("\n" + resp.stdout.trim());
                                $.publish("#consoleOutput/update");
                            }});

                        }
                        this.$el.append("\n$" + cmd);


                    }, this);
            this.clientCollection.fetch({reset:true});

        },
        appendClientList: function(collection) {
            var self = this;
            $.each(collection.models, function(index, model) {
                var name = model.get('name');
                self.$el.append("\n" + index + ":" + name);
                if(self.clientName === name) {
                    self.$el.append(" selected");
                }



            });
        },
        render:function() {
            this.$el.html("remote_console$");
            return this;

        }
    });
    return Console;
});