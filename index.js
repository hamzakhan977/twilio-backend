const app = require('./app');
const config = require('./config');
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', //
  password: 'root', //
  database: 'turing',
})
connection.connect((err) => {
  if (err) {
    // console.log(err)
    return
  }
  console.log('Database connected')
})
module.exports = connection

const server = app.listen(config.port, function() {
  // console.log('Express server listening on port ' + server.address().port);
});

module.exports = server;
