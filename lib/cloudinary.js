import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true });
export { cloudinary };
export function photoFolder(userId, attemptId){return `progress-photos/${userId}/${attemptId}`}
export function thumbnailUrl(url){ if(!url) return ''; return url.replace('/upload/','/upload/c_fill,g_auto,w_500,h_650,q_auto,f_auto/'); }
