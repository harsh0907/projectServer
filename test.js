const request = require('request')

const  url = 'https://10.0.2.2/mechalist'


const list1 = {
	"toe":0,
	"type":"car",
	"latitude":45.458545,
	"longitude":9.150490
}


request({
    headers: {
      'Content-Type': 'application/json'
    },
    uri: url,
    body: JSON.stringify(list1) ,
    method: 'POST'
  }, function (err, re, body) {
    
    
    console.log(body)
    console.log(err)
    
  });