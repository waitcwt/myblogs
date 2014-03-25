var express = require('express'),
 api = require('./dataapi/api');
var app = express();
app.use(express.bodyParser());//it is very import to get req.body

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

app.get('/hello', function(req, res){
  res.send('Hello World');
});
app.get('/api/files/:page', api.getFiles);
app.get('/api/imgs/', api.getImgs);
app.get('/api/file/:id', api.getFile);
app.put('/api/editfile/:id', api.editFile);
app.get('/api/delfile/:id', api.delFile);

app.listen(3000);
console.log('Listening on port 3000');