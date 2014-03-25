var fs = require('fs');
exports.getFiles = function (req, res) {
  var page = req.params.page;
  var files = {'main':[],'total':[]};
  fs.readFile(__dirname + '/data.json', function (err, data) {
	  data = JSON.parse(data);
	  files['total'] = data[0].files.length;
	  data =data[0].files.slice(page*2,(page*2+2));
	  data.forEach(function (file, i) {
		files['main'].push({
		  id: i,
		  title: file.title,
		  content: file.content.substr(0, 150) + '...'
		});
	  });

	  res.json({
		files: files
	  });
  });
};
exports.getFile = function(req,res){
	var id = req.params.id;
	if(id>=0){
		fs.readFile(__dirname + '/data.json', function (err, data) {
			data = JSON.parse(data);
			res.json({
				file:data[0].files[id]
			})
		});
	}else{
		res.json(false);
	}	
};
exports.editFile = function(req,res){
	var id = req.params.id;
	fs.readFile(__dirname + '/data.json', function (err, data) {
			data = JSON.parse(data);
			if(data[0].files[id]){
				data[0].files[id] = req.body
				fs.writeFile(__dirname + '/data.json',JSON.stringify(data),function (err) {
					if(err){
						res.json(err);
					}else{
				        res.json(true);
					}
				});
			}else{
				res.json(false);
			}
		});
};
exports.delFile = function(req,res){
	var id = req.params.id;
	fs.readFile(__dirname + '/data.json', function (err, data) {
			data = JSON.parse(data);
			data[0].files.splice(id, 1);
				fs.writeFile(__dirname + '/data.json',JSON.stringify(data),function (err) {
					if(err){
						res.json(err);
					}else{
				        res.json(true);
					}
				});
		});
};
exports.getImgs = function (req, res) {
  var page = req.params.page;
  var imgs = [];
  fs.readFile(__dirname + '/data.json', function (err, data) {
	  data = JSON.parse(data);
	  data = data[1].imgs;
	  data.forEach(function (img, i) {
		imgs.push({
		  id: i,
		  title: img.title,
		  url: img.url,
		  desc: img.desc
		});
	  });

	  res.json({
		imgs: imgs
	  });
  });
};
