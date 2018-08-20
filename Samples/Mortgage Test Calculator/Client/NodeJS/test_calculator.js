// load required modules
var https = require('https');
var fs = require('fs');

var goalSeek = process.argv.indexOf('--goal-seek') !== -1;

// read the request data from a file
var req = fs.readFileSync(goalSeek ? './request_goal_seek.json' : './request.json');

// POST request options
var options = {
    host: 'calculators.pagos.com',
    port: 443,
    path: '/Api/Applications/GetResult',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(req, 'utf8')
    }
};

// perform the POST call
var reqPost = https.request(options, function (res) {

    var data = '';

    res.on('data', function (d) {
        // append chunk of a data
        data += d;
    });

    res.on('end', function () {

        var obj = JSON.parse(data);

        // output entire response as a prettyfied json
        // console.log(JSON.stringify(obj, null, 4));

        // display all output values
        console.log('Outputs:');
        obj["Outputs"].forEach(function (item) {
            var name = item["Ref"];
            var val = item["Value"][0][0].Value;
            var txt = item["Value"][0][0].Text;

            console.log(name, "=", val, "(text: '" + txt + "')");
        });
    });
});

// if any error happens
reqPost.on('error', function (e) {
    console.error(e);
});

// actual send of the request
reqPost.end(req);

