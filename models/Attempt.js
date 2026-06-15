import {Schema,models,model} from 'mongoose';
const AttemptSchema=new Schema({userId:{type:Schema.Types.ObjectId,ref:'User',required:true,index:true},startDate:{type:Date,required:true},status:{type:String,enum:['active','completed','failed'],default:'active'},currentDay:{type:Number,default:1},failedAt:Date,failureReason:String,completedAt:Date},{timestamps:true});
export default models.Attempt || model('Attempt',AttemptSchema);
