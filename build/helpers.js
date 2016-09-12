var shell = require("shelljs");

function shellExec(command, options) {
    console.log("Running command: " + command);

    return new Promise(function(resolve, reject) {
        options = options || {};

        if(options.openNewCommandWindow) {
            if(process.platform == "win32") {
                command = "START " + command;
            }
        }

        shell.exec(command, options, function (code) {
            if (code != 0) {
                reject(new Error("Command \"" + command + "\" failed with exit code: " + code));
            }
            else {
                resolve();
            }
        });
    });
}

var buildPromise = (function() {
    function PromiseBuilder(stream) {
        this.end = this.begin = stream;
    }

    PromiseBuilder.prototype.pipe = function(pipe) {
        this.end = this.end.pipe(pipe);

        return this;
    };

    PromiseBuilder.prototype.done = function() {
        var me = this;

        return new Promise(function(resolve, reject) {
            //
            //  Must read the stream completely (flowing mode), else, no end event will occur
            //
            me.end.resume();

            me.end.on('end', function () {
                resolve();
            });

            me.end.on('error', function (err) {
                me.begin.end();

                reject(err);
            });
        });
    };

    return function buildPromise(stream) {
        return new PromiseBuilder(stream);
    }
})();

module.exports = {
    shellExec: shellExec,
    buildPromise: buildPromise,
};
