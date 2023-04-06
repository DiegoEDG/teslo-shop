import mongoose from 'mongoose';

// ?Mongoose connection status
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting

const connectionStatus = {
	isConnected: 0
};

export const connect = async () => {
	if (connectionStatus.isConnected !== 0) {
		console.log('Already connected');
		return;
	}
	if (mongoose.connections.length > 0) {
		connectionStatus.isConnected = mongoose.connections[0].readyState;

		if (connectionStatus.isConnected === 1) {
			console.log('Using last connection');
			return;
		}
		disconnect();
	}
	await mongoose.connect(process.env.MONGO_CONNECTION || '');
	connectionStatus.isConnected = 1;
	console.log('Connected to DB');
};

export const disconnect = async () => {
	if (process.env.NODE_ENV === 'development') return;
	if (connectionStatus.isConnected === 0) return;

	await mongoose.disconnect();
	connectionStatus.isConnected = 0;
	console.log('Disconnected');
};
