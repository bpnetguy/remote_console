define(['backbone', 'models/JSCommand', 'collections/Client','pubsub'], function (Backbone, JSCommand, ClientCollection){
    var selectMatch = /select \d+/;
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
                        }
                        this.$el.append("\n$" + cmd);
                        if(selectMatch.test(cmd)) {
                            var index = parseInt(cmd.split(" ")[1]);
                            if(this.clientCollection.models[index]) {
                                this.client = this.clientCollection.models[index];
                                this.$el.append("\n" + this.clientCollection.models[index].get("name") + " selected");
                            } else {
                                this.$el.append("\n" + index + " not found");
                            }

                        } else if(cmd === "list") {
                            this.clientCollection.fetch({reset:true});
                        } else {
//                            this.$el.append("\n$" + cmd);
                            var args = cmd.split(/ +/);
                            var command = undefined;
                            if(args.length === 1) {
                                command = new JSCommand({clientId: this.client.get('id'), argument:cmd, command:"eval"});
                            } else {
                                command = new JSCommand({clientId: this.client.get('id'), argument:args[1], command:args[0]});
                            }
                            var self = this;
                            command.save(null, {success: function(model, resp, options) {
                                self.$el.append("\n" + resp.response);
                                $.publish("#consoleOutput/update");
                            }});

                        }


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