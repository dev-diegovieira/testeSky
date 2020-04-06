const mongoose = require('mongoose');

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	autoIndex: true,
	poolSize: process.env.MONGO_POOLSIZE ? process.env.MONGO_POOLSIZE : 10,
	bufferMaxEntries: 0,
	connectTimeoutMS: process.env.MONGO_CONNECTTIMEOUTMS ? process.env.MONGO_CONNECTTIMEOUTMS : 10000,
	socketTimeoutMS: process.env.MONGO_SOCKETTIMEOUTMS ? process.env.MONGO_SOCKETTIMEOUTMS : 45000
};

const dbURI = process.env.MONGO_URI;

mongoose.connect(
    dbURI, 
    options
);

mongoose.connection.on('connected', () => {
	console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
	Logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});


module.exports = mongoose;