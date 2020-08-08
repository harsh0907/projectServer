//Customer

import { response } from "express"

/cust/newuser

req
{
    "name":"harsh",         // string
    "email":"9h@gail.com",  // string
    "mobileno":1571121111, //Number always equal to 10
    "password":"12345656"  // String password length grater then 6
 }


res
{
    "token": "login",
    "_id": "5e8c6978e7832136147a0c8b",
    "name": "harsh",
    "email": "9h@ail.com",
    "mobileno": 1571121151,
    "password": "12345656",
    "__v": 0
}



/cust/deluser

req
{
    "_id":"5e78afa7c8006420b4982a80"  //cust id
}

res
  OK!  








/cust/updateuser/id

localhost:3000/cust/updateuser/5e8756661248a33cc073bf38

req
{
    "password":"123456789"
}

res
{
    "token": "my",
    "_id": "5e8756661248a33cc073bf38",
    "name": "harsh",
    "email": "hash@gail.com",
    "mobileno": 1111101111,
    "password": "123456789",
    "__v": 0
}



/cust/mechalist

req
{
	"longitude":11.499931,
    "latitude":48.149853,
    "type":"car",
    "toe":0   //Number, 0 for no, 1 for yes
}

res
[
    {
        "Organization": true,
        "mechano": 1,
        "rating": 4,
        "accountno": 0,
        "chargingfee": 30,
        "activation": true,
        "toe": 0,
        "bike": 1,
        "car": 1,
        "bus": 0,
        "truck": 0,
        "tacter": 0,
        "autoer": 0,
        "token": "login",
        "_id": "5e8c751ffdac3d2f4c24c922",
        "name": "papa",
        "email": "77@gmail.com",
        "mobileno": 8238264891,
        "Address": "hahahahahahaha",
        "latitude": 48.149853,
        "longitude": 11.499931,
        "password": "1234567",
        "__v": 0,
        "time": 0,
        "distance": 0
    }
]

/cust/selectmecha

req
{
	"mechaid":"5e87533b0e5c160b48427c42",
	"longitude":11.499931,
	"latitude":48.149853,
	"custid":"5e78afa7c8006420b4982a80",
	"type":"car",
	"time":0,
	"distance":1
}
res
"5e8c765afdac3d2f4c24c923"  //it will be history _id

/cust/done
req
{
	"_id":"5e7cab4fe6d33806f0b70cda" //orgamecha id 
}

res
ok


/cust/feedback

req
{
	"_id":"5e7cab4fe6d33806f0b70cda",  //orgamecha _id
	"historyid":"5e8361f9dec30e109898b081",
	"rating":5
}
res
thanks

/cust/checkpoint
req
{
    "historyid":"5e8360496a8fe23f64878930"
}
res
[0]  //wait again
[1]  //not wait 

/cust/payment
req {
    "merchantid":"5e87533b0e5c160b48427c42", //customer id
    "historyid":"5e8360496a8fe23f64878930",
    "amount":100,
    "txnid":"123",
    "time":"454545545454"
}
res
ok


/cust/cencel
req
{
	"_id":"5e8368cab49e582d24c11e51"  // mecha id
}
res
cencel


/login
req
{
	"email":"hash@gail.com",
	"password":"123456789"
}
res
[
    {
        "typeofvehicle": "car",
        "activation": false,
        "token": "logout",
        "_id": "5e8cc5d8b7d0bf0a8027de36",
        "name": "harsh",
        "email": "9h@ail.com",
        "mobileno": 1571121151,
        "password": "12345656",
        "__v": 0
    }
]


/logout
req
{
	"_id":"5e8756661248a33cc073bf38" // customer id
}

res
logout 

/history

req
{  
    "_id":"5e87533b0e5c160b48427c42",  //coustomer id
    "type":"custid", 
    "typetime":"destinationtime",
    "minday":28,
    "minmon":3,
    "minyear":2020,
    "maxday":7,
    "maxmon":4,
    "maxyear":2020
 }
 res
 [
    {
        "custid": "5e78afa7c8006420b4982a80",
        "mechaid": "5e87533b0e5c160b48427c42",
        "requesttime": 1586259604926,
        "arrivaltime": null,
        "destinationtime": null,
        "donetime": null,
        "orgamechaid": null,
        "typeofvehicle": null,
        "originalamount": 0,
        "paycomplete": false,
        "chargingfee": 0,
        "cencelbycustomer": false,
        "cencelbyorgamecha": false,
        "cencelbymecha": false,
        "cenceltime": null,
        "feedback": null,
        "_id": "5e8c669488ca210d0458a778",
        "longitude": 11.499931,
        "latitude": 48.149853,
        "__v": 0
    }
]































// Mecha


/mecha/newuser
req
{
	"name":"papa",
	"email":"7777777j@gmail.com",
	"mobileno":8938274897,
	"Address":"hahahahahahaha",
	"latitude":48.149853,
	"longitude":11.499931,
    "password":1234567,
    "mechano":0,          // it will always 0 in case of mecha
    "Organization":true,
    upiId:"abs@paytm",
    "chargingfee":30,
    "toe":0,   // it will 0 for false and 1 for true
	"car":1,   // it will 0 for false and 1 for true
    "bike":1,
    "bus":1,
    "truck":0,
    "tacter":1,
    "autoer":1
	
}

res
{
    "Organization": true,
    "mechano": 1,
    "rating": 4,
    "accountno": 0,
    "chargingfee": 30,
    "activation": true,
    "toe": 0,
    "bike": 1,
    "car": 1,
    "bus": 0,
    "truck": 0,
    "tacter": 0,
    "autoer": 0,
    "token": "login",
    "_id": "5e8db1395528340024af0604",
    "name": "papa",
    "email": "777777j@gmail.com",
    "mobileno": 8938270897,
    "Address": "hahahahahahaha",
    "latitude": 48.149853,
    "longitude": 11.499931,
    "password": "1234567",
    "__v": 0
}



/mecha/checkpoint/done


req
{
	"_id":"5e8756661248a33cc073bf38" // history id
}


res

yes
[1]
No
[0]




/mecha/deluser
req
{
	"_id":"5e8db1395528340024af0604"
}

res
OK!



/mecha/checkpoint
req
{
	"_id":"5e8cc5fcb7d0bf0a8027de37"
}


res
[
    0
]
OR
[
    [
        1,          // indigator
        48.149853,   // latitude
        11.499931,   // longitude
        "5e8cc5d8b7d0bf0a8027de36",    // cust id
        "car",     // type
        "5e8db47c5528340024af0605",   // history id
        1,  // distence 
        0   // time
    ],
    "harsh",
    []
]


/mecha/reply

req
{
	"_id":"5e8b2624800d0a0550729a03",
	"mechaid":"5e87533b0e5c160b48427c42"
}

res
Ok!



/mecha/reach
req
{
	"_id":"5e7cab4fe6d33806f0b70cda"   /// mechnic _id
}

res
ok!




/mecha/updateuser/:id
https://proprojectindia.herokuapp.com/mecha/updateuser/5e8cca471a0f652908afa616

req
{
	"mechano":7
}

res
{
    "Organization": true,
    "mechano": 7,
    "rating": 4,
    "accountno": 0,
    "chargingfee": 30,
    "activation": true,
    "toe": 0,
    "bike": 1,
    "car": 1,
    "bus": 0,
    "truck": 0,
    "tacter": 0,
    "autoer": 0,
    "token": "login",
    "_id": "5e8cca471a0f652908afa616",
    "name": "papa",
    "email": "77j@gmail.com",
    "mobileno": 8938264891,
    "Address": "hahahahahahaha",
    "latitude": 48.149853,
    "longitude": 11.499931,
    "password": "1234567",
    "__v": 0
}

/mecha/arrival

req
{
	"_id":"5e7cab4fe6d33806f0b70cda"
}
res
ok you reach


/mecha/checkpoint/cencel
req
{
    "_id":"5e7cab4fe6d33806f0b70cda"  //history_id
}


res
true
false



/mecha/payment
req {
    "merchantid":"5e87533b0e5c160b48427c42",
    "amount":120,
    "txnid":"123",
    "time":"454545545454",
    "historyids":["5e8360496a8fe23f64878930","5e8360a2dec30e109898b080"]
    
}
res
ok


/login
/logout
/history
all above will same as customer
















//Orgamecha


/mecha/organization/deluser


req
{
	"_id":"5e7cab4fe6d33806f0b70cda" // orgamechacust id
}



res
OK!



/mecha/organization/newuser

req
{
	"name":"harsh",
	"email":"p0a@gmail.com",
	"mobileno":1090207091,
	"Address":"hahahahahahaha",
	"ownerid":"5e7b646a0421c228a44ce9d4", //mecha id
	"password":1234567,
	"car":1,
	"bike":1,
    "tacter":1,
    "truck":1,
    "autoer":0
}

res
{
    "rating": 4,
    "activation": true,
    "bike": 1,
    "car": 1,
    "bus": 0,
    "truck": 0,
    "tacter": 1,
    "autoer": 0,
    "mechano": 1,
    "token": "login",
    "_id": "5e8dbddc5528340024af0606",
    "name": "harsh",
    "email": "p0a@gmail.com",
    "mobileno": 1090207091,
    "Address": "hahahahahahaha",
    "ownerid": "5e8cc5fcb7d0bf0a8027de37",
    "password": "1234567",
    "__v": 0
}




/mecha/organization/updateuser/:id

localhost:3000/mecha/organization/updateuser/5e8dc77465e7ab0024e95103
res
{
	"car":0,
	"bike":0,
	"truck":0,
	"bus":0,
	"tacter":0,
	"autoer":0,
	"name":"papa"
	
}

res


{
    "rating": 4,
    "activation": true,
    "bike": 0,
    "car": 0,
    "bus": 0,
    "truck": 0,
    "tacter": 0,
    "autoer": 0,
    "mechano": 1,
    "token": "login",
    "_id": "5e8dc77465e7ab0024e95103",
    "name": "papa",
    "email": "p04545@gmail.com",
    "mobileno": 1110207091,
    "Address": "hahahahahahaha",
    "ownerid": "5e8cc5fcb7d0bf0a8027de37",
    "password": "1234567",
    "__v": 0
}






/mecha/organization/checkpoint


{
	"_id":"5e8cc5fcb7d0bf0a8027de37"
}



res
[0]
OR
[
    1,
    48.149853,  //latitude
    11.499931,   //longitude
    "5e8cc5d8b7d0bf0a8027de36",   //cust id
    "car",   // type
    "5e8dcedbb3f2781d242a5d25",   //history id
    1,    // distence 
    0,    //time
    [
        "harsh"  //name of customer
    ]
]


/mecha/organization/checkpoint/cencel
req
{
    "_id":"5e7cab4fe6d33806f0b70cda"  //history_id
}


res
true
false






// Admin APIs



/admin/login
req
{
	"email":"harsh@gmail.com",
	"password":"123456"
}
res
[1] yes
[0] no



/admin/newuser
req
{
	"email":"harsh@gmail.com",
	"password":123456,
	"name":"harsh"
}

res
user create




/admin/payment
req
{historyid,amount,txnid,time}

res
ok


/database/mecha
req
// Nothing
res
Ok!



/database/cust
req
//Nothing

res
Ok!




/database/orgamecha
req
//Nothing

res
Ok!



/database/txn
req
// Nothing


res
Ok!



/database/history
req
// Nothing

res
Ok!


/mecha
req
// Nothing

res
[]


/customer
req
// Nothing

res
[]


/mecha/all
req
{
    '_id':"lkdjdnvndf dojsvdn"  // mecha id
}

res
[]  


/orgamecha
req
//Nothing

res
[]

