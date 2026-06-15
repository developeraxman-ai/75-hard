import mongoose,{Schema,models,model} from 'mongoose';
const notificationSettings={morning:{type:String,default:'07:00'},midday:{type:String,default:'12:00'},evening:{type:String,default:'18:00'},night:{type:String,default:'21:30'}};
const UserSchema=new Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},passwordHash:{type:String,required:true},startDate:{type:Date,required:true},currentAttemptId:{type:Schema.Types.ObjectId,ref:'Attempt'},notificationSettings,pushSubscriptions:{type:[Schema.Types.Mixed],default:[]}},{timestamps:true});
export default models.User || model('User',UserSchema);
