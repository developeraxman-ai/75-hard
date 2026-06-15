import {NextResponse} from 'next/server'; import {connectDb} from '@/lib/db'; import {requireUser} from '@/lib/auth'; import User from '@/models/User';
export async function POST(req){ await connectDb(); const user=await requireUser(); const {endpoint}=await req.json(); await User.findByIdAndUpdate(user._id,{$pull:{pushSubscriptions:{endpoint}}}); return NextResponse.json({ok:true}); }
