import { cookies } from 'next/headers'; import { SignJWT, jwtVerify } from 'jose'; import { connectDb } from './db'; import User from '@/models/User';
const cookieName='command_token'; const secret=()=>new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me');
export async function signSession(userId){ return new SignJWT({sub:userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('30d').sign(secret()); }
export async function setSession(userId){ (await cookies()).set(cookieName, await signSession(userId), {httpOnly:true, sameSite:'lax', secure:process.env.NODE_ENV==='production', path:'/', maxAge:60*60*24*30}); }
export async function clearSession(){ (await cookies()).delete(cookieName); }
export async function getSessionUser(){ const token=(await cookies()).get(cookieName)?.value; if(!token) return null; try{ const {payload}=await jwtVerify(token, secret()); await connectDb(); return User.findById(payload.sub).select('-passwordHash'); }catch{return null} }
export async function requireUser(){ const user=await getSessionUser(); if(!user) throw new Error('Unauthorized'); return user; }
