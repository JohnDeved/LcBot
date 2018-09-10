"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var LcBot = /** @class */ (function () {
    function LcBot() {
        var _this = this;
        this.client = new discord_js_1.Client();
        this.token = 'NDc5MzQ3OTIxMjg5MjE2MDIw.DneRkA.NU8AIAvk4GpWpc9alGEEGZOag90';
        this.on = {
            ready: function () {
                console.log("Logged in as " + _this.client.user.tag + "!");
            },
            message: function (msg) {
                if (/^![\w_]+/) {
                }
            }
        };
        this.client.login(this.token);
    }
    LcBot.prototype.parseArgs = function (msg) {
        var args = msg.content.split(';');
        args = args.map(function (el) { return el.trim(); });
        args = args.filter(function (el) { return el !== ''; });
        return args;
    };
    LcBot.prototype.init = function () {
        for (var key in this.on) {
            if (this.on.hasOwnProperty(key)) {
                var handler = this.on[key];
                this.client.on(key, handler);
            }
        }
    };
    return LcBot;
}());
exports["default"] = new LcBot().init();
