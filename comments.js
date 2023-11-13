// Create web server

var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var user = query.user;
	var comment = query.comment;

	res.writeHead(200, {"Content-Type": "text/plain"});
	if (user !== undefined && comment !== undefined) {
		res.write(user + ' said: ' + comment);
	} else {
		res.write('You need to specify both user and comment parameters');
	}
	res.end();
});

server.listen(8000);
console.log('Server running on port 8000');