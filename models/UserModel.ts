import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema = new Schema(
	{
		name: { type: 'string', required: true },
		email: { type: 'string', required: true, unique: true },
		password: { type: 'string', required: true },
		role: [
			{
				type: String,
				enum: {
					values: ['admin', 'client'],
					message: '{VALUE} role is not valid'
				}
			}
		]
	},
	{
		timestamps: true
	}
);

const UserModel: Model<IUser> = mongoose.models.User || model('User', UserSchema);

export default UserModel;
