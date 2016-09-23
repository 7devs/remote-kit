var exec = require('child_process').exec;

module.exports = {
    path: require('path'),
    exec: function(res, cmds, opts) {
        var result = [],
            cmds = cmds || 'pwd',
            opts = opts || [],
            globalOpt;
        if (typeof cmds === 'string') {
            cmds = [cmds];
        }

        if (opts instanceof Object && !opts instanceof Array) {
            globalOpt = opts;
            opts = [];
        }

        run(cmds, opts);

        function run(cmds, opts) {
            var cmd = cmds.shift(),
                opt = opts.shift() || globalOpt;
            if(cmd) {
                result.push(`# ${opt ? (opt.cwd || '') : ''} > ${cmd}\n`);
                exec(cmd, opt, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        result.push(`ERR: ${err}`);
                        echo();
                    } else {
                        console.log(`>> out >\n${stdout}`);
                        console.log(`>> err >\n${stderr}`);
                        stdout && result.push(`${stdout}`);
                        stderr && result.push(`${stderr}`);
                        run(cmds, opts);
                    }
                });
            } else {
                echo();
            }
        }

        function echo() {
            res.send(result);
        }
    }
};
