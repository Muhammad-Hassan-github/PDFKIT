var express = require('express')
var bodyParser = require("body-parser");
var path = require("path")

var server = express()

server.use(bodyParser.json({
    limit: '50mb'
}));
server.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))

server.use(express.static(path.join(__dirname, 'build')));

require('./server/routes/routes')(server);

//ErrorHandler
server.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).send(err.message)
})

server.listen(process.env.PORT || 8080, () => console.log("server is running on PORT 8080"))