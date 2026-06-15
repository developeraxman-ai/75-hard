import {Schema,models,model} from 'mongoose';
const JournalSchema=new Schema({userId:{type:Schema.Types.ObjectId,ref:'User',required:true,index:true},attemptId:{type:Schema.Types.ObjectId,ref:'Attempt',required:true,index:true},date:{type:Date,required:true},dayNumber:{type:Number,required:true},felt:String,strongestImpulse:String,obeyedImpulse:String,proudOf:String,tomorrowsDanger:String},{timestamps:true});
JournalSchema.index({attemptId:1,date:1},{unique:true});
export default models.Journal || model('Journal',JournalSchema);
