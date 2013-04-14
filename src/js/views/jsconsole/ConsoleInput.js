define(['backbone', 'pubsub'], function (Backbone) {
    var Console = Backbone.View.extend({
        events:{
            'keydown':'showKey'
        },
        history: [],
        showKey:function (e) {
//            console.log(e.keyCode);
//            console.log(String.fromCharCode(e.keyCode));
//            e.preventDefault();
            if (e.keyCode === 13) {
                var command = this.$el.val();
                $.publish("#consoleOutput", command);
                this.$el.val("");

                this.history.push(command);
                if(this.history.length > 10) {
                    this.history.shift();

                }

            } else if(e.keyCode === 38) {
                if(!this.lastHistory) return;
                this.$el.val(this.history[--this.lastHistory]);

                return;
            } else if(e.keyCode === 40) {
                if(this.lastHistory=== this.history.length) return;
                this.$el.val(this.history[++this.lastHistory]);


                return;
            }
            this.lastHistory = this.history.length;



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