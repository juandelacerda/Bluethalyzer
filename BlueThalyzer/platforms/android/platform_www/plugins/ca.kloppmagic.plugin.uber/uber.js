cordova.define("ca.kloppmagic.plugin.uber.uber", function(require, exports, module) {
window.uber = function(str, callback) {
    cordova.exec(callback, function(err) {
        callback(err);
    }, "Uber", "requestWithUber", [str]);
};
});
