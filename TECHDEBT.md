TECHNICAL DEBT

* Update react-quill when the npm repo has been updated to support Quill 1.0
* Update leaflet-choropleth
* https://github.com/callemall/material-ui/issues/5396


Stack trace: 

GET /search/getAllForType?objType=ORGANIZATION 401 30.330 ms - 65
/Users/da/src/participedia/api/node_modules/aws-sdk/lib/request.js:31
            throw err;
            ^

Error: Can't set headers after they are sent.
    at ServerResponse.OutgoingMessage.setHeader (_http_outgoing.js:344:11)
    at ServerResponse.header (/Users/da/src/participedia/api/node_modules/express/lib/response.js:719:10)
    at ServerResponse.send (/Users/da/src/participedia/api/node_modules/express/lib/response.js:164:12)
    at ServerResponse.res.(anonymous function) [as send] (/Users/da/src/participedia/api/node_modules/apicache/lib/apicache.js:274:22)
    at ServerResponse.json (/Users/da/src/participedia/api/node_modules/express/lib/response.js:250:15)
    at Response.<anonymous> (/Users/da/src/participedia/api/api/controllers/search.js:41:15)
    at Request.<anonymous> (/Users/da/src/participedia/api/node_modules/aws-sdk/lib/request.js:355:18)
    at Request.callListeners (/Users/da/src/participedia/api/node_modules/aws-sdk/lib/sequential_executor.js:105:20)
    at Request.emit (/Users/da/src/participedia/api/node_modules/aws-sdk/lib/sequential_executor.js:77:10)
    at Request.emit (/Users/da/src/participedia/api/node_modules/aws-sdk/lib/request.js:668:14)


