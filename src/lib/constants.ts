const senderPhoneId = import.meta.env.VITE_META_PHONE_NUMBER_ID;
export const WHATSAPP_API_URL = `https://graph.facebook.com/v21.0/${senderPhoneId}/messages`;
export const facebookAppApiToken = import.meta.env.VITE_META_FACEBOOK_TOKEN;
