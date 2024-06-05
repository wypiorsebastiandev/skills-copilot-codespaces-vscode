//create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var comments = [];
//create server
http.createServer(function(req,res){
  //parse the url
  var urlObj = url.parse(req.url,true);
  //get path
  var pathName = urlObj.pathname;
  //get method
  var method = req.method;
  //get query
  var query = urlObj.query;
  //get post data
  var str = '';
  req.on('data',function(data){
    str += data;
  });
  req.on('end',function(){
    var post = qs.parse(str);
    //read file
    fs.readFile('./index.html',function(err,data){
      if(err){
        console.log(err);
      }else{
        //deal with the path
        if(pathName == '/'){
          //get comments
          fs.readFile('./comments.json','utf-8',function(err,commentsData){
            if(err){
              console.log(err);
            }else{
              comments = JSON.parse(commentsData);
              //replace the comments
              var htmlStr = data.toString();
              var lis = '';
              comments.forEach(function(comment){
                lis += '<li>'+comment+'</li>';
              });
              htmlStr = htmlStr.replace('^_^',lis);
              res.end(htmlStr);
            }
          });
        }else if(pathName == '/comment'){
          //add comment
          comments.push(post.comment);
          //write comments to the file
          fs.writeFile('./comments.json',JSON.stringify(comments),function(err){
            if(err){
              console.log(err);
            }else{
              //redirect
              res.statusCode = 302;
              res.setHeader('Location','/');
              res.end();
            }
          });
        }else{
          //404
          res.statusCode = 404;
          res.end('Not Found');
        }
      }
    });
  });
}).listen(3000,function(){
  console.log('Server is running at port 3000');
});
