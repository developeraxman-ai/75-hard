import {z} from 'zod';
export const registerSchema=z.object({name:z.string().min(1),email:z.string().email(),password:z.string().min(8),startDate:z.string().optional()});
export const loginSchema=z.object({email:z.string().email(),password:z.string().min(1)});
export const dailyLogUpdateSchema=z.object({checklist:z.record(z.boolean()).optional(),waterLitres:z.coerce.number().min(0).max(10).optional(),workoutOneNote:z.string().max(500).optional(),outdoorWorkoutNote:z.string().max(500).optional(),projectNote:z.string().max(500).optional(),readingNote:z.string().max(500).optional(),meditationNote:z.string().max(500).optional(),complete:z.boolean().optional(),failReason:z.string().max(300).optional()});
export const journalSchema=z.object({felt:z.string().min(1),strongestImpulse:z.string().min(1),obeyedImpulse:z.string().min(1),proudOf:z.string().min(1),tomorrowsDanger:z.string().min(1)});
export const impulseSchema=z.object({type:z.enum(['drink','smoke','skip_workout','junk_food','waste_money','doom_scroll','other']),intensity:z.coerce.number().min(1).max(10),trigger:z.string().min(1)});
export const impulseChoiceSchema=z.object({eventId:z.string(),finalChoice:z.enum(['contract','impulse']),note:z.string().optional()});
export const notificationSettingsSchema=z.object({morning:z.string(),midday:z.string(),evening:z.string(),night:z.string()});
