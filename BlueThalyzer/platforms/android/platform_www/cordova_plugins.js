cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "ca.kloppmagic.plugin.uber.uber",
        "file": "plugins/ca.kloppmagic.plugin.uber/uber.js",
        "pluginId": "ca.kloppmagic.plugin.uber",
        "runs": true
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "plugin.google.maps.phonegap-googlemaps-plugin",
        "file": "plugins/plugin.google.maps/www/googlemaps-cdv-plugin.js",
        "pluginId": "plugin.google.maps",
        "clobbers": [
            "plugin.google.maps"
        ]
    },
    {
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-common.events",
        "file": "plugins/cordova-plugin-chrome-apps-common/events.js",
        "pluginId": "cordova-plugin-chrome-apps-common",
        "clobbers": [
            "chrome.Event"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-common.errors",
        "file": "plugins/cordova-plugin-chrome-apps-common/errors.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-common.stubs",
        "file": "plugins/cordova-plugin-chrome-apps-common/stubs.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-common.helpers",
        "file": "plugins/cordova-plugin-chrome-apps-common/helpers.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-sockets-udp.sockets.udp",
        "file": "plugins/cordova-plugin-chrome-apps-sockets-udp/sockets.udp.js",
        "pluginId": "cordova-plugin-chrome-apps-sockets-udp",
        "clobbers": [
            "chrome.sockets.udp"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "ca.kloppmagic.plugin.uber": "0.2.5",
    "cordova-plugin-dialogs": "1.3.0",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-geolocation": "2.3.0",
    "plugin.google.maps": "1.3.9",
    "cordova-sqlite-storage": "1.4.7",
    "cordova-plugin-chrome-apps-common": "1.0.7",
    "cordova-plugin-chrome-apps-sockets-udp": "1.2.2"
};
// BOTTOM OF METADATA
});