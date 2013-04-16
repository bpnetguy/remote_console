/**
 * Created with IntelliJ IDEA.
 * User: bphan
 * Date: 4/13/13
 * Time: 8:30 PM
 * To change this template use File | Settings | File Templates.
 */
require.config({
    baseUrl:"./js",
    paths:{
        "socketio":'libs/socket.io'
    },
    shim:{
        'socketio':{
            exports:'io'
        }
    }

});
require(['socketio'], function () {
    var server = undefined;

    function isXPath(d) {
        return d.indexOf("/") == 0;
    }

    function getDom(a) {
        var domData = null;
        if (isXPath(a)) {
            domData = $.xpath(a)
        } else {
            domData = $(a);
        }
        return domData;
    }

    var requestHandlers = {
        back:function (data) {
            setTimeout(function() {
                server.socket.disconnect();
                window.history.back();
            },0);
            return data;

        },
        reload:function (data) {
            if (typeof(data.argument) == "undefined") {
                setTimeout(function() {
                    server.socket.disconnect();
                    setTimeout(function () {
                        window.location.reload(true);
                        //window.location.href=window.location.href;
                    }, 2000);
                },0);
                return window.location.href;
            } else {
                setTimeout(function() {
                    server.socket.disconnect();
                    setTimeout(function () {

                        window.location.href = data.argument;
                    }, 2000);
                },0);
                return data.argument;

            }


        },
        keyPress:function (data) {
            var key = parseInt(data.argument);
            var option = {
                which:key,
                keyCode:key
            };
            if (window.event) {
                window.event.keyCode = key;
            }
            $('body').simulate('keydown', option);
            $('body').simulate('keyup', option);
            return data;
        },
        getVersion:function (data) {
            var result = {
                agent:window.navigator.userAgent,
            };
            return JSON.stringify(result);
        },
        click:function (data) {
            var domData = getDom(data.argument);
            domData.click();
            return domData.text().search(data.argument) != -1;

        },
        setText:function (data) {
            var id = data.argument.split(",", 1)[0];
            var value = data.argument.substring(id.length + 1);
            result = $(id).val(value);
            return result.val();
        },
        textIsPresent:function (req) {
            var domData = getDom('body');
            return domData.text().indexOf(data.argument) !== -1;
        },
        textIsVisible:function (data) {
            var result = $.xpath("//*[contains(.,'" + data.argument + "')]").is(":visible");
            return result;
        },
        isVisible:function (data) {
            var domData = getDom(data.argument);
            return domData.is(":visible");
        },
        isPresent:function (data) {
            var domData = getDom(data.argument);
            return domData.length > 0;
        },
//        waitForElement:function (data) {
//            var domData = $(data.argument);
//            if (domData.length > 0) {
//                this.getElement(req);
//                return;
//            }
//            var timeoutVal = data.timeout || 60000;
//            var func = {
//                wait:function () {
//                    clearTimeout(this.timeout);
//                    var string = (new XMLSerializer()).serializeToString(this);
////                    server.sendMessage('/rest', {
////                        response:string
////                    });
//
//                },
//
//                cancel:function () {
//                    //stop polling
//                    waitUntilExists.stop(req.data.replace("#", ""));
////                    server.sendMessage('/rest', {
////                        response:"waitForElement timeout after " + timeoutVal + " ms",
////                        status:"error"
////                    });
//
//                }
//            };
//            func.timeout = setTimeout(func.cancel, timeoutVal);
//            waitUntilExists(req.data.replace("#", ""), func.wait, "itself");
//
//            //setTimeout
//            /** after sometime if it doesn't alert then  send error */
//
//        },
        size:function (data) {
            var domData = getDom(data.argument);
            var string = "<root>";
            string += domData.size();
            string += "</root>";
            return string;
        },
        getElement:function (data) {
            var domData = getDom(data.argument);
            var string = "<root>";
            $.each(domData, function (index, item) {
                string += (new XMLSerializer()).serializeToString(item);
            });
            string += "</root>";
            return string;
        },
        getElementPosition:function (data) {
            var dom = getDom(data.argument);
            var position = {
                top:dom.position().top,
                left:dom.position().left,
                width:dom.width(),
                height:dom.height()
            };
            return JSON.stringify(position);
        },
        getElementFromPosition:function (data) {
            console.log("Session Id " + server.socket.sessionid);
            var pos = data.argument.split(',');
            var element = document.elementFromPoint(pos[0], pos[1]);
            var string = "<root>";
            string += (new XMLSerializer()).serializeToString(element);
            string += "</root>";
            return string;
        },
        listMethods:function () {
            var result = [];
            $.each(requestHandlers, function (key, value) {
                result.push(key);
            });
            return result;
        },
        'eval': function(data) {
            return eval(data.argument);
        }

    };
    $(function () {
        var pathname = window.location.pathname;
        var folder = pathname.substring(0, pathname.lastIndexOf("/"));
        if (folder[0] === '/') folder = folder.substring(1);
        if (folder.length) {
            folder += "/";
        }
        server = io.connect(null, {resource:folder + 'socket.io'});
        server.on('connect', function (data) {
            console.log(data);
            server.emit('join', { name:'Console Client' });
        });
        server.on('command', function (data) {

            var response = undefined;
            try {
                response = requestHandlers[data.command](data);
            } catch(Error) {
                response = "Handler error";
            }
            if(typeof(response) === "object") {
                response = JSON.stringify(response);
            }
            data.response = response;
            server.emit('command', data);
        });
    });
});
