define(['backbone', 'pubsub'], function (Backbone) {
    var Console = Backbone.View.extend({
        events:{
            'keypress':'showKey'
        },
        showKey:function (e) {
//            console.log(e.keyCode);
//            console.log(String.fromCharCode(e.keyCode));
            if (e.keyCode === 13) {
                var command = this.$el.val();
                $.publish("#consoleOutput", command);
                this.$el.val("");
            }
        },
        tagName:"input",
        id:"consoleInput",
        render:function () {
            this.$el.val("")
            return this;
        }

    });
    return Console;
});