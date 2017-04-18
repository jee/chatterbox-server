/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;  
  headers['Content-Type'] = 'text/plain';

  var responseBody = {results: []};


  if (request.url !== '/classes/messages'){
    var statusCode = 404;
  } 
  else if (request.method === 'GET') {
    var statusCode = 200;
  }
  else if (request.method === 'POST') {
    var statusCode = 201;
    
    request.addListener('data', function(data) {
      console.log(data);
      responseBody.results.push(data);
    })

    // request.addListener('end', function() {
    //   responseBody.results = JSON.stringify(responseBody.results);    
    // })

    // console.log('request', request);
    console.log('responseBody.results', responseBody.results);
    // console.log('ADD LISTENTER', JSON.stringify(request._postData));
    console.log('typeof', typeof responseBody.results);

    // var responseBody = request._postData;
  }

    response.writeHead(statusCode, headers);

  // if (request.method === 'GET'){
  //   var results = [];
  //   response.statusCode = 200;


    // request.on('data', function(data) {
    //   results.push(data);
    // }).on('end', function() {
    //   body = Buffer.concat(body).toString();
  //     // BEGINNING OF NEW STUFF

  //     response.on('error', function(err) {
  //       console.error(err);
  //     });

  //     response.statusCode = 200;
  //     response.setHeader('Content-Type', 'application/json');

  //     var responseBody = {
  //       headers: request.headers,
  //       method: request.method,
  //       url: request.url,
  //       results: results
  //     };

  //     response.write(JSON.stringify(responseBody));
  //     response.end();
  //   });  
  // }

  // if (request.method === 'POST'){
  //   var results = [];

  //   request.on('error', function(err) {
  //     console.error(err);
  //   }).on('data', function(data) {
  //     results.push(data);
  //     console.log(data);
  //   }).on('end', function() {
  //     // body = Buffer.concat(body).toString();
  //     // BEGINNING OF NEW STUFF

  //     response.on('error', function(err) {
  //       console.error(err);
  //     });

  //     response.statusCode = 201;
  //     response.setHeader('Content-Type', 'application/json');

  //     var responseBody = {
  //       headers: request.headers,
  //       method: request.method,
  //       url: request.url,
  //       results: results
  //     };

  //     response.write(JSON.stringify(responseBody));
  //     response.end();
  //   });  
  // }












  // // Request and Response come from node's http module.
  // //
  // // They include information about both the incoming request, such as
  // // headers and URL, and about the outgoing response, such as its status
  // // and content.
  // //
  // // Documentation for both request and response can be found in the HTTP section at
  // // http://nodejs.org/documentation/api/

  // // Do some basic logging.
  // //
  // // Adding more logging to your server can be an easy way to get passive
  // // debugging help, but you should always be careful about leaving stray
  // // console.logs in your code.
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // // console.log('request', request);
  // console.log('request.method ', request.method);
  // console.log('request.url', request.url);

  // // The outgoing status.
  // var statusCode = 200;

  // // See the note below about CORS headers.
  // var defaultCorsHeaders = {
  //   'access-control-allow-origin': '*',
  //   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //   'access-control-allow-headers': 'content-type, accept',
  //   'access-control-max-age': 10 // Seconds.
  // };

  // var headers = defaultCorsHeaders;

  // // // Tell the client we are sending them plain text.
  // // //
  // // // You will need to change this if you are sending something
  // // // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = 'text/plain';

  // // // .writeHead() writes to the request line and headers of the response,
  // // // which includes the status and all headers.
  // var writeHead = response.writeHead(statusCode, headers);

  // // Make sure to always call response.end() - Node may not send
  // // anything back to the client until you do. The string you pass to
  // // response.end() will be the body of the response - i.e. what shows
  // // up in the browser.
  // //
  // // Calling .end "flushes" the response's internal buffer, forcing
  // // node to actually send all the data over to the client.
  response.end(JSON.stringify(responseBody));
  // response.end();
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports.requestHandler = requestHandler;
