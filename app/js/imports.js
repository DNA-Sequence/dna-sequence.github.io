/**
 * Created by samuel on 17/06/14.
 */

var ImportScripts = Class.create();

ImportScripts.prototype = {
    initialize: function () {

    },
    setScript: function () {
        var _head = document.head;
        for (var pr in arguments) {
            var _script = document.createElement("script");
            _script.setAttribute("src", arguments[pr]);
            _head.appendChild(_script);
        }
    },
    setReq: function (_js) {
        var _head = document.head;
        var _script = document.createElement("script");
        _script.setAttribute("data-main", _js);
        _script.setAttribute("src", "js/libs/require.js");
        _head.appendChild(_script);
    }
};