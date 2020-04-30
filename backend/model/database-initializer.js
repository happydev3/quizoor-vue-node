var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
let user = {
	firstname: 'admin',
	lastname: 'quizoor',
	email: 'quizoor@gmail.com',
	password: bcrypt.hashSync('test1234', 8),
	status: 'activated',
	role: 'superadmin',
	locations: [
		{text: 'English', value: 'en'},
		{text: 'French', value: 'fr'},
		{text: 'German', value: 'de'},
		{text: 'Portugese', value: 'pt'}
	]
}

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let db;

MongoClient.connect("mongodb://localhost:27017/", function(err, client) {
  if(err) throw err;	

  db = client.db('quizz');
  
  db.listCollections().toArray(function(err, result){
	 if(result.length == 0){
		 db.collection("users").insertOne(user, function(err, result){
			if(err){
				throw err;
			}
			console.log(result.insertedCount + " SuperAdmin successfully added.");
			client.close();
		});
		return;
	 }
	 
	 let numDropped = 0;
	 let toDrop = result.length;
	 result.forEach(collection => {
		db.collection(collection.name).drop(function(err, delOK){
			if(err){
				throw err;
			}
			
			console.log("Dropped collection: " + collection.name);
			numDropped++;
			
			if(numDropped == toDrop){
				db.collection("users").insertMany(user, function(err, result){
					if(err){
						throw err;
					}
					
					console.log(result.insertedCount + " SuperAdmin successfully added.");
					client.close();
				});
			}
		});		
	 });
  });
});