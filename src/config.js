// export const API = 'https://elite-connect-backend-ktv9.onrender.com/api';
// export const APP_NAME = 'Elite Connect';

// // World App Configuration
// export const WORLD_APP_ID = 'app_486e187afe7bc69a19456a3fa901a162'; // Your actual app ID
// export const WLD_RECEIVING_WALLET = '0xYourWalletAddressHere'; // Your wallet address

// // Pricing
// export const PRICING = {
//   FREE_CONNECTIONS: 2,
//   MONTHLY_UNLIMITED_WLD: 3,
//   MONTHLY_UNLIMITED_DAYS: 30
// };

// ✨ ELITE CONNECT - CONFIGURATION FILE
// All your app settings in one place!


// ✨ ELITE CONNECT - CONFIGURATION FILE
// All your app settings in one place!

// Backend API
// export const API = 'https://elite-connect-backend-ktv9.onrender.com/api';

// App Name
// export const APP_NAME = 'Elite Connect';

// // World App Configuration
// export const WORLD_APP_ID = 'app_486e187afe7bc69a19456a3fa901a162';
// export const WLD_RECEIVING_WALLET = '0xYourWalletAddressHere'; // Update with your actual wallet

// // ⚠️ IMPORTANT: Your Production URL
// // Make sure this matches your Vercel production URL!
// export const PRODUCTION_URL = 'https://elite-connect-frontend.vercel.app';

// // Pricing Configuration
// export const PRICING = {
//   FREE_CONNECTIONS: 2,
//   MONTHLY_UNLIMITED_WLD: 3,
//   MONTHLY_UNLIMITED_DAYS: 30
// };

// // ✨ Helper function to check if running in World App
// export const isInWorldApp = () => {
//   if (typeof window === 'undefined') return false;
  
//   // Check for World App user agent
//   const userAgent = window.navigator.userAgent.toLowerCase();
//   const isWorldApp = userAgent.includes('worldapp') || 
//                      userAgent.includes('minikit') ||
//                      window.hasOwnProperty('MiniKit');
  
//   console.log('🌍 World App Check:', {
//     userAgent: userAgent.substring(0, 50) + '...',
//     isWorldApp: isWorldApp
//   });
  
//   return isWorldApp;
// };

// // Debug mode - set to false in production
// export const DEBUG = false;

// // Log configuration on load
// if (DEBUG) {
//   console.log('🎯 Elite Connect Configuration:', {
//     API,
//     WORLD_APP_ID,
//     PRODUCTION_URL,
//     isInWorldApp: isInWorldApp()
//   });
// }

// const API = 'https://elite-connect-backend-ktv9.onrender.com/api';

// export default API;

// // World App Configuration
// export const WORLD_APP_ID = 'app_486e187afe7bc69a19456a3fa901a162';
// export const WLD_RECEIVING_WALLET = 'YourWalletAddressHere';

// // Pricing
// export const PRICING = {
//   FREE_CONNECTIONS: 2,
//   MONTHLY_UNLIMITED_WLD: 3,
//   MONTHLY_UNLIMITED_DAYS: 30
// };

// ============================================
// CONFIGURATION
// ============================================

// Backend API URL - CHANGE THIS!
// export const API_URL = import.meta.env.VITE_API_URL || 'https://elite-connect-backend-ktv9.onrender.com/api';

// // World ID Configuration
// export const WORLD_ID_CONFIG = {
//   APP_ID: import.meta.env.VITE_APP_ID || 'app_staging_test',
//   ACTION_ID: import.meta.env.VITE_ACTION_ID || 'signin'
// };

// // App Configuration
// export const APP_CONFIG = {
//   NAME: 'Elite Connect',
//   VERSION: '1.0.0',
//   DEBUG: import.meta.env.DEV
// };

// // Feature Flags
// export const FEATURES = {
//   CHAT_ENABLED: true,
//   SUBSCRIPTION_ENABLED: true,
//   SWIPE_ENABLED: true
// };

// // API Endpoints
// export const ENDPOINTS = {
//   // Auth
//   AUTH_VERIFY: '/auth/verify',
//   AUTH_ME: '/auth/me',
  
//   // Profile
//   PROFILE_CREATE: '/profile/create',
//   PROFILE_ME: '/profile/me',
//   PROFILE_BY_ID: '/profile',
  
//   // Explore
//   EXPLORE_PROFILES: '/explore/profiles',
  
//   // Chat
//   CHAT_MATCHES: '/chat/matches',
//   CHAT_MESSAGES: '/chat/messages',
//   CHAT_SEND: '/chat/send',
  
//   // Subscription
//   SUBSCRIPTION_STATUS: '/subscription/status',
//   SUBSCRIPTION_PURCHASE: '/subscription/purchase'
// };

// export default {
//   API_URL,
//   WORLD_ID_CONFIG,
//   APP_CONFIG,
//   FEATURES,
//   ENDPOINTS
// };