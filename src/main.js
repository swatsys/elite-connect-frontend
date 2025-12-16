

// // HARDCODED API URL - bypassing config.js caching issue
// const API = 'https://elite-connect-backend-ktv9.onrender.com/api';

// import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';
// import Toast from './toast.js';

// class App {
//   constructor() {
//     this.token = localStorage.getItem('token');
//     this.user = null;
//     this.currentScreen = 'auth';
//     this.init();
//   }

//   async init() {
//     // Initialize MiniKit
//     if (MiniKit.isInstalled()) {
//       console.log('✅ MiniKit is installed');
      
//       // Install MiniKit
//       await MiniKit.install();
//       console.log('✅ MiniKit installed successfully');
//     } else {
//       console.warn('⚠️ MiniKit not installed - running outside World App');
//     }

//     // Check if user is already logged in
//     if (this.token) {
//       await this.loadUser();
//     } else {
//       this.showAuth();
//     }

//     // Set up event listeners
//     this.setupEventListeners();
//   }

//   setupEventListeners() {
//     // Auth screen
//     const signInBtn = document.getElementById('signInBtn');
//     if (signInBtn) {
//       signInBtn.addEventListener('click', () => this.verifyWithWorldID());
//     }

//     // Profile setup screen
//     const profileForm = document.getElementById('profileForm');
//     if (profileForm) {
//       profileForm.addEventListener('submit', (e) => this.saveProfile(e));
//     }

//     // Profile screen
//     const editProfileBtn = document.getElementById('editProfileBtn');
//     if (editProfileBtn) {
//       editProfileBtn.addEventListener('click', () => this.showProfileSetup());
//     }

//     const logoutBtn = document.getElementById('logoutBtn');
//     if (logoutBtn) {
//       logoutBtn.addEventListener('click', () => this.logout());
//     }

//     // Home screen - navigation
//     const viewProfileBtn = document.getElementById('viewProfileBtn');
//     if (viewProfileBtn) {
//       viewProfileBtn.addEventListener('click', () => this.showProfile());
//     }

//     const exploreBtn = document.getElementById('exploreBtn');
//     if (exploreBtn) {
//       exploreBtn.addEventListener('click', () => this.showExplore());
//     }

//     // Explore screen
//     const backToHomeBtn = document.getElementById('backToHomeBtn');
//     if (backToHomeBtn) {
//       backToHomeBtn.addEventListener('click', () => this.showHome());
//     }

//     // Chat screen
//     const chatBackBtn = document.getElementById('chatBackBtn');
//     if (chatBackBtn) {
//       chatBackBtn.addEventListener('click', () => this.showExplore());
//     }

//     const sendMessageBtn = document.getElementById('sendMessageBtn');
//     if (sendMessageBtn) {
//       sendMessageBtn.addEventListener('click', () => this.sendMessage());
//     }

//     const messageInput = document.getElementById('messageInput');
//     if (messageInput) {
//       messageInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//           this.sendMessage();
//         }
//       });
//     }

//     // Subscription screen
//     const subscriptionBackBtn = document.getElementById('subscriptionBackBtn');
//     if (subscriptionBackBtn) {
//       subscriptionBackBtn.addEventListener('click', () => this.showProfile());
//     }

//     const subscribeBtn = document.getElementById('subscribeBtn');
//     if (subscribeBtn) {
//       subscribeBtn.addEventListener('click', () => this.subscribe());
//     }

//     // Transaction screen
//     const transactionBackBtn = document.getElementById('transactionBackBtn');
//     if (transactionBackBtn) {
//       transactionBackBtn.addEventListener('click', () => this.showProfile());
//     }
//   }

//   async verifyWithWorldID() {
//     try {
//       console.log('🔵 [1] Starting verification...');

//       if (!MiniKit.isInstalled()) {
//         console.error('❌ [1.1] MiniKit not installed');
//         Toast.error('Please open this app in World App');
//         return;
//       }
//       console.log('✅ [1.2] MiniKit installed');

//       Toast.info('Opening World ID verification...');
//       console.log('🔵 [2] Calling MiniKit.commandsAsync.verify...');

//       const { finalPayload } = await MiniKit.commandsAsync.verify({
//         action: 'signin',
//         signal: '',
//         verification_level: VerificationLevel.Orb  // ✅ Using Orb for testing with manager
//       });

//       console.log('🔵 [3] World ID response:', JSON.stringify(finalPayload));

//       if (finalPayload.status === 'success') {
//         console.log('✅ [3.1] Verification successful');
//         Toast.info('Verifying your World ID...');

//         console.log('🔵 [4] Sending to backend...');
//         console.log('🔵 [4.1] API URL:', API);
//         console.log('🔵 [4.2] Payload:', JSON.stringify(finalPayload));

//         const res = await fetch(`${API}/auth/verify`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(finalPayload)
//         });

//         console.log('🔵 [5] Backend response status:', res.status);

//         const data = await res.json();
//         console.log('🔵 [6] Backend data:', JSON.stringify(data));

//         if (data.success) {
//           console.log('✅ [6.1] Authentication successful');
//           this.token = data.token;
//           this.user = data.user;
//           localStorage.setItem('token', this.token);

//           console.log('🔵 [7] Token stored');
//           console.log('🔵 [8] User:', JSON.stringify(this.user));

//           Toast.success('Welcome to Elite Connect!');

//           console.log('🔵 [9] Profile completed?', this.user?.profile_completed);

//           // ✅ CRITICAL: Close World ID modal first, then navigate
//           console.log('🔵 [10] Closing World ID modal...');
          
//           try {
//             // Close the World ID verification modal
//             await MiniKit.commandsAsync.closeModal();
//             console.log('✅ World ID modal closed');
//           } catch (error) {
//             console.warn('⚠️ Could not close modal:', error);
//             // Continue anyway
//           }

//           // Small delay to let modal close completely
//           setTimeout(() => {
//             console.log('🔵 [11] Starting navigation...');
            
//             // Hide auth screen
//             const authScreen = document.getElementById('auth');
//             if (authScreen) {
//               authScreen.classList.add('hidden');
//               console.log('✅ Auth screen hidden');
//             }
            
//             // Navigate based on profile completion
//             if (this.user && this.user.profile_completed) {
//               console.log('🔵 [12] Navigating to home');
//               this.showHome();
//             } else {
//               console.log('🔵 [12] Navigating to profile setup');
//               this.showProfileSetup();
//             }
            
//             console.log('🔵 [13] Navigation complete');
//           }, 300);  // Small delay for modal to close
          
//         } else {
//           console.error('❌ [6.2] Backend returned error:', data.error);
//           Toast.error(data.error || 'Verification failed');
//         }
//       } else if (finalPayload.status === 'error') {
//         console.error('❌ [3.2] World ID error:', finalPayload);
//         Toast.error('Verification failed');
//       } else {
//         console.log('⚠️ [3.3] Verification cancelled');
//         Toast.warning('Verification cancelled');
//       }
//     } catch (error) {
//       console.error('❌ [ERROR] Caught exception:', error);
//       console.error('❌ [ERROR] Stack:', error.stack);
//       console.error('❌ [ERROR] Message:', error.message);
//       Toast.error('Verification failed. Please try again.');
//     }
//   }

//   async loadUser() {
//     try {
//       const res = await fetch(`${API}/auth/me`, {
//         headers: {
//           'Authorization': `Bearer ${this.token}`
//         }
//       });

//       if (res.ok) {
//         const data = await res.json();
//         this.user = data.user;

//         if (this.user.profile_completed) {
//           this.showHome();
//         } else {
//           this.showProfileSetup();
//         }
//       } else {
//         // Token invalid, clear and show auth
//         localStorage.removeItem('token');
//         this.token = null;
//         this.showAuth();
//       }
//     } catch (error) {
//       console.error('Error loading user:', error);
//       localStorage.removeItem('token');
//       this.token = null;
//       this.showAuth();
//     }
//   }

//   async saveProfile(e) {
//     e.preventDefault();

//     const form = e.target;
//     const formData = new FormData(form);
    
//     const profile = {
//       name: formData.get('name'),
//       age: parseInt(formData.get('age')),
//       gender: formData.get('gender'),
//       bio: formData.get('bio'),
//       interests: formData.get('interests').split(',').map(i => i.trim())
//     };

//     try {
//       const res = await fetch(`${API}/profile`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${this.token}`
//         },
//         body: JSON.stringify(profile)
//       });

//       const data = await res.json();

//       if (data.success) {
//         this.user = data.user;
//         Toast.success('Profile saved successfully!');
//         this.showHome();
//       } else {
//         Toast.error(data.error || 'Failed to save profile');
//       }
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       Toast.error('Failed to save profile');
//     }
//   }

//   async loadExploreProfiles() {
//     try {
//       const res = await fetch(`${API}/explore`, {
//         headers: {
//           'Authorization': `Bearer ${this.token}`
//         }
//       });

//       const data = await res.json();

//       if (data.success) {
//         this.displayProfiles(data.profiles);
//       } else {
//         Toast.error('Failed to load profiles');
//       }
//     } catch (error) {
//       console.error('Error loading profiles:', error);
//       Toast.error('Failed to load profiles');
//     }
//   }

//   displayProfiles(profiles) {
//     const container = document.getElementById('profilesList');
//     if (!container) return;

//     if (profiles.length === 0) {
//       container.innerHTML = '<p class="text-gray-500 text-center py-8">No profiles found</p>';
//       return;
//     }

//     container.innerHTML = profiles.map(profile => `
//       <div class="bg-white rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition" 
//            onclick="app.openChat('${profile._id}')">
//         <h3 class="font-bold text-lg">${profile.name}</h3>
//         <p class="text-gray-600">${profile.age} years old</p>
//         <p class="text-sm text-gray-500 mt-2">${profile.bio}</p>
//         <div class="mt-2 flex flex-wrap gap-2">
//           ${profile.interests.map(i => `
//             <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
//               ${i}
//             </span>
//           `).join('')}
//         </div>
//       </div>
//     `).join('');
//   }

//   async openChat(userId) {
//     this.currentChatUser = userId;
//     this.showChat();
//     await this.loadMessages(userId);
//   }

//   async loadMessages(userId) {
//     try {
//       const res = await fetch(`${API}/chat/${userId}`, {
//         headers: {
//           'Authorization': `Bearer ${this.token}`
//         }
//       });

//       const data = await res.json();

//       if (data.success) {
//         this.displayMessages(data.messages);
//       }
//     } catch (error) {
//       console.error('Error loading messages:', error);
//     }
//   }

//   displayMessages(messages) {
//     const container = document.getElementById('messagesList');
//     if (!container) return;

//     container.innerHTML = messages.map(msg => `
//       <div class="${msg.sender === this.user._id ? 'text-right' : 'text-left'} mb-4">
//         <div class="inline-block ${msg.sender === this.user._id ? 'bg-purple-600 text-white' : 'bg-gray-200'} 
//                     rounded-lg px-4 py-2 max-w-xs">
//           ${msg.content}
//         </div>
//         <div class="text-xs text-gray-500 mt-1">
//           ${new Date(msg.timestamp).toLocaleTimeString()}
//         </div>
//       </div>
//     `).join('');

//     container.scrollTop = container.scrollHeight;
//   }

//   async sendMessage() {
//     const input = document.getElementById('messageInput');
//     const content = input.value.trim();

//     if (!content) return;

//     try {
//       const res = await fetch(`${API}/chat/${this.currentChatUser}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${this.token}`
//         },
//         body: JSON.stringify({ content })
//       });

//       const data = await res.json();

//       if (data.success) {
//         input.value = '';
//         await this.loadMessages(this.currentChatUser);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       Toast.error('Failed to send message');
//     }
//   }

//   async subscribe() {
//     try {
//       const res = await fetch(`${API}/subscription`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`
//         }
//       });

//       const data = await res.json();

//       if (data.success) {
//         this.user.subscription = data.subscription;
//         Toast.success('Subscribed successfully!');
//         this.showProfile();
//       } else {
//         Toast.error(data.error || 'Failed to subscribe');
//       }
//     } catch (error) {
//       console.error('Error subscribing:', error);
//       Toast.error('Failed to subscribe');
//     }
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.token = null;
//     this.user = null;
//     this.showAuth();
//     Toast.info('Logged out successfully');
//   }

//   // Screen navigation methods
//   showAuth() {
//     this.hideAllScreens();
//     document.getElementById('auth').classList.remove('hidden');
//     this.currentScreen = 'auth';
//   }

//   showProfileSetup() {
//     console.log('📍 showProfileSetup() called');
//     this.hideAllScreens();
    
//     const profileSetupScreen = document.getElementById('profile-setup');
//     if (profileSetupScreen) {
//       profileSetupScreen.classList.remove('hidden');
//       console.log('✅ Profile setup screen shown');
      
//       // If editing existing profile, populate form
//       if (this.user && this.user.name) {
//         document.getElementById('name').value = this.user.name || '';
//         document.getElementById('age').value = this.user.age || '';
//         document.getElementById('gender').value = this.user.gender || '';
//         document.getElementById('bio').value = this.user.bio || '';
//         document.getElementById('interests').value = this.user.interests?.join(', ') || '';
//       }
//     } else {
//       console.error('❌ Profile setup screen not found!');
//     }
    
//     this.currentScreen = 'profile-setup';
//   }

//   showHome() {
//     console.log('📍 showHome() called');
//     this.hideAllScreens();
    
//     const homeScreen = document.getElementById('home');
//     if (homeScreen) {
//       homeScreen.classList.remove('hidden');
//       console.log('✅ Home screen shown');
      
//       // Update welcome message
//       const welcomeMsg = document.getElementById('welcomeMessage');
//       if (welcomeMsg && this.user) {
//         welcomeMsg.textContent = `Welcome, ${this.user.name}!`;
//       }
//     } else {
//       console.error('❌ Home screen not found!');
//     }
    
//     this.currentScreen = 'home';
//   }

//   showProfile() {
//     this.hideAllScreens();
//     document.getElementById('profile').classList.remove('hidden');
    
//     // Update profile display
//     if (this.user) {
//       document.getElementById('profileName').textContent = this.user.name;
//       document.getElementById('profileAge').textContent = `${this.user.age} years old`;
//       document.getElementById('profileBio').textContent = this.user.bio;
      
//       const interestsContainer = document.getElementById('profileInterests');
//       interestsContainer.innerHTML = this.user.interests.map(i => `
//         <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
//           ${i}
//         </span>
//       `).join('');
      
//       const subscriptionStatus = document.getElementById('subscriptionStatus');
//       if (this.user.subscription && this.user.subscription.active) {
//         subscriptionStatus.textContent = `Premium - Expires ${new Date(this.user.subscription.end_date).toLocaleDateString()}`;
//         subscriptionStatus.classList.add('text-green-600');
//       } else {
//         subscriptionStatus.textContent = 'Free Plan';
//         subscriptionStatus.classList.add('text-gray-600');
//       }
//     }
    
//     this.currentScreen = 'profile';
//   }

//   showExplore() {
//     this.hideAllScreens();
//     document.getElementById('explore').classList.remove('hidden');
//     this.currentScreen = 'explore';
//     this.loadExploreProfiles();
//   }

//   showChat() {
//     this.hideAllScreens();
//     document.getElementById('chat').classList.remove('hidden');
//     this.currentScreen = 'chat';
//   }

//   showSubscription() {
//     this.hideAllScreens();
//     document.getElementById('subscription').classList.remove('hidden');
//     this.currentScreen = 'subscription';
//   }

//   showTransactions() {
//     this.hideAllScreens();
//     document.getElementById('transactions').classList.remove('hidden');
//     this.currentScreen = 'transactions';
//     this.loadTransactions();
//   }

//   async loadTransactions() {
//     try {
//       const res = await fetch(`${API}/transactions`, {
//         headers: {
//           'Authorization': `Bearer ${this.token}`
//         }
//       });

//       const data = await res.json();

//       if (data.success) {
//         this.displayTransactions(data.transactions);
//       }
//     } catch (error) {
//       console.error('Error loading transactions:', error);
//     }
//   }

//   displayTransactions(transactions) {
//     const container = document.getElementById('transactionsList');
//     if (!container) return;

//     if (transactions.length === 0) {
//       container.innerHTML = '<p class="text-gray-500 text-center py-8">No transactions yet</p>';
//       return;
//     }

//     container.innerHTML = transactions.map(tx => `
//       <div class="bg-white rounded-lg p-4 shadow mb-4">
//         <div class="flex justify-between items-center">
//           <div>
//             <p class="font-semibold">${tx.type}</p>
//             <p class="text-sm text-gray-600">${new Date(tx.timestamp).toLocaleString()}</p>
//           </div>
//           <div class="text-right">
//             <p class="font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}">
//               ${tx.amount > 0 ? '+' : ''}$${Math.abs(tx.amount).toFixed(2)}
//             </p>
//             <p class="text-xs text-gray-500">${tx.status}</p>
//           </div>
//         </div>
//       </div>
//     `).join('');
//   }

//   hideAllScreens() {
//     const screens = [
//       'auth',
//       'profile-setup',
//       'home',
//       'profile',
//       'explore',
//       'chat',
//       'subscription',
//       'transactions'
//     ];

//     screens.forEach(screenId => {
//       const screen = document.getElementById(screenId);
//       if (screen) {
//         screen.classList.add('hidden');
//       }
//     });
//   }
// }

// // Initialize app
// const app = new App();

// // Make app globally accessible for onclick handlers
// window.app = app;

// export default app;

// HARDCODED API URL - bypassing config.js caching issue
// const API = 'https://elite-connect-backend-ktv9.onrender.com/api';

// import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';
// import { Toast } from './toast.js';

// class App {
//   constructor() {
//     this.token = localStorage.getItem('token');
//     this.user = null;
//     this.currentScreen = 'auth';
//     this.currentChatUser = null;
//     this.init();
//   }

//   async init() {
//     // Initialize MiniKit
//     if (MiniKit.isInstalled()) {
//       console.log('✅ MiniKit is installed');
      
//       // Install MiniKit
//       await MiniKit.install();
//       console.log('✅ MiniKit installed successfully');
//     } else {
//       console.warn('⚠️ MiniKit not installed - running outside World App');
//     }

//     // Check if user is already logged in
//     if (this.token) {
//       await this.loadUser();
//     } else {
//       this.showAuth();
//     }

//     // Set up event listeners
//     this.setupEventListeners();
//   }

//   setupEventListeners() {
//     // Use event delegation for dynamic content
//     document.addEventListener('click', (e) => {
//       const target = e.target;
      
//       // Auth screen
//       if (target.id === 'signInBtn') {
//         this.verifyWithWorldID();
//       }
      
//       // Profile screen buttons
//       if (target.id === 'editProfileBtn') {
//         this.showProfileSetup();
//       }
//       if (target.id === 'logoutBtn') {
//         this.logout();
//       }
//       if (target.id === 'viewSubscriptionBtn') {
//         this.showSubscription();
//       }
//       if (target.id === 'viewTransactionsBtn') {
//         this.showTransactions();
//       }
      
//       // Home screen buttons
//       if (target.id === 'viewProfileBtn') {
//         this.showProfile();
//       }
//       if (target.id === 'exploreBtn') {
//         this.showExplore();
//       }
      
//       // Explore screen
//       if (target.id === 'backToHomeBtn') {
//         this.showHome();
//       }
      
//       // Chat screen
//       if (target.id === 'chatBackBtn') {
//         this.showExplore();
//       }
//       if (target.id === 'sendMessageBtn') {
//         this.sendMessage();
//       }
      
//       // Subscription screen
//       if (target.id === 'subscriptionBackBtn') {
//         this.showProfile();
//       }
//       if (target.id === 'subscribeBtn') {
//         this.subscribe();
//       }
      
//       // Transaction screen
//       if (target.id === 'transactionBackBtn') {
//         this.showProfile();
//       }
      
//       // Bottom nav buttons - check for nav-item class
//       if (target.closest('.nav-item')) {
//         const navItem = target.closest('.nav-item');
//         const text = navItem.textContent.toLowerCase();
        
//         if (text.includes('home')) {
//           this.showHome();
//         } else if (text.includes('explore')) {
//           this.showExplore();
//         } else if (text.includes('profile')) {
//           this.showProfile();
//         }
//       }
//     });
    
//     // Profile form submission
//     const profileForm = document.getElementById('profileForm');
//     if (profileForm) {
//       profileForm.addEventListener('submit', (e) => this.saveProfile(e));
//     }

//     // Message input keypress
//     document.addEventListener('keypress', (e) => {
//       if (e.target.id === 'messageInput' && e.key === 'Enter') {
//         this.sendMessage();
//       }
//     });
//   }

//   async verifyWithWorldID() {
//     try {
//       console.log('🔵 [1] Starting verification...');

//       if (!MiniKit.isInstalled()) {
//         console.error('❌ [1.1] MiniKit not installed');
//         Toast.error('Please open this app in World App');
//         return;
//       }
//       console.log('✅ [1.2] MiniKit installed');

//       Toast.info('Opening World ID verification...');
//       console.log('🔵 [2] Calling MiniKit.commandsAsync.verify...');

//       const { finalPayload } = await MiniKit.commandsAsync.verify({
//         action: 'signin',
//         signal: '',
//         verification_level: VerificationLevel.Orb
//       });

//       console.log('🔵 [3] World ID response:', JSON.stringify(finalPayload));

//       if (finalPayload.status === 'success') {
//         console.log('✅ [3.1] Verification successful');
//         Toast.info('Verifying your World ID...');

//         console.log('🔵 [4] Sending to backend...');
//         console.log('🔵 [4.1] API URL:', API);
//         console.log('🔵 [4.2] Payload:', JSON.stringify(finalPayload));

//         const res = await fetch(`${API}/auth/verify`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(finalPayload)
//         });

//         console.log('🔵 [5] Backend response status:', res.status);

//         const data = await res.json();
//         console.log('🔵 [6] Backend data:', JSON.stringify(data));

//         if (data.success) {
//           console.log('✅ [6.1] Authentication successful');
//           this.token = data.token;
//           this.user = data.user;
//           localStorage.setItem('token', this.token);

//           console.log('🔵 [7] Token stored');
//           console.log('🔵 [8] User:', JSON.stringify(this.user));

//           Toast.success('Welcome to Elite Connect!');

//           console.log('🔵 [9] Profile completed?', this.user?.profile_completed);

//           // Close World ID modal first
//           console.log('🔵 [10] Closing World ID modal...');
          
//           try {
//             await MiniKit.commandsAsync.closeModal();
//             console.log('✅ World ID modal closed');
//           } catch (error) {
//             console.warn('⚠️ Could not close modal:', error);
//           }

//           // Small delay to let modal close completely
//           setTimeout(() => {
//             console.log('🔵 [11] Starting navigation...');
            
//             // Hide auth screen
//             const authScreen = document.getElementById('auth');
//             if (authScreen) {
//               authScreen.classList.add('hidden');
//               console.log('✅ Auth screen hidden');
//             }
            
//             // Navigate based on profile completion
//             if (this.user && this.user.profile_completed) {
//               console.log('🔵 [12] Navigating to home');
//               this.showHome();
//             } else {
//               console.log('🔵 [12] Navigating to profile setup');
//               this.showProfileSetup();
//             }
            
//             console.log('🔵 [13] Navigation complete');
//           }, 300);
          
//         } else {
//           console.error('❌ [6.2] Backend returned error:', data.error);
//           Toast.error(data.error || 'Verification failed');
//         }
//       } else if (finalPayload.status === 'error') {
//         console.error('❌ [3.2] World ID error:', finalPayload);
//         Toast.error('Verification failed');
//       } else {
//         console.log('⚠️ [3.3] Verification cancelled');
//         Toast.warning('Verification cancelled');
//       }
//     } catch (error) {
//       console.error('❌ [ERROR] Caught exception:', error);
//       console.error('❌ [ERROR] Stack:', error.stack);
//       console.error('❌ [ERROR] Message:', error.message);
//       Toast.error('Verification failed. Please try again.');
//     }
//   }

//   async loadUser() {
//     try {
//       const res = await fetch(`${API}/auth/me`, {
//         headers: {
//           'Authorization': `Bearer ${this.token}`
//         }
//       });

//       if (res.ok) {
//         const data = await res.json();
//         this.user = data;

//         if (this.user.profile_completed) {
//           this.showHome();
//         } else {
//           this.showProfileSetup();
//         }
//       } else {
//         // Token invalid, clear and show auth
//         localStorage.removeItem('token');
//         this.token = null;
//         this.showAuth();
//       }
//     } catch (error) {
//       console.error('Error loading user:', error);
//       localStorage.removeItem('token');
//       this.token = null;
//       this.showAuth();
//     }
//   }

//   async saveProfile(e) {
//     e.preventDefault();

//     const form = e.target;
//     const formData = new FormData(form);
    
//     const profile = {
//       name: formData.get('name'),
//       age: parseInt(formData.get('age')),
//       gender: formData.get('gender'),
//       bio: formData.get('bio'),
//       interests: formData.get('interests').split(',').map(i => i.trim())
//     };

//     try {
//       const res = await fetch(`${API}/profile/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${this.token}`
//         },
//         body: JSON.stringify(profile)
//       });

//       const data = await res.json();

//       if (data.success) {
//         this.user = { ...this.user, ...data.profile, profile_completed: true };
//         Toast.success('Profile saved successfully!');
//         this.showHome();
//       } else {
//         Toast.error(data.error || 'Failed to save profile');
//       }
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       Toast.error('Failed to save profile');
//     }
//   }

//   async loadExploreProfiles() {
//     try {
//       const res = await fetch(`${API}/explore/profiles`, {
//         headers: {
//           'Authorization': `Bearer ${this.token}`
//         }
//       });

//       const data = await res.json();

//       if (data.success) {
//         this.displayProfiles(data.profiles);
//       } else {
//         Toast.error('Failed to load profiles');
//       }
//     } catch (error) {
//       console.error('Error loading profiles:', error);
//       Toast.error('Failed to load profiles');
//     }
//   }

//   displayProfiles(profiles) {
//     const container = document.getElementById('profilesList');
//     if (!container) return;

//     if (profiles.length === 0) {
//       container.innerHTML = '<p class="text-secondary text-center py-8">No profiles found</p>';
//       return;
//     }

//     container.innerHTML = profiles.map(profile => `
//       <div class="card cursor-pointer hover:shadow-lg transition" 
//            onclick="app.viewProfile('${profile.id}')">
//         <div class="profile-image" style="width: 80px; height: 80px; font-size: 2rem; margin: 1rem auto;">
//           ${profile.name.charAt(0).toUpperCase()}
//         </div>
//         <div class="text-center">
//           <h3 class="font-bold text-lg">${profile.name}, ${profile.age}</h3>
//           <p class="text-secondary">${profile.gender}</p>
//           <p class="text-sm text-secondary mt-2">${profile.bio || 'No bio yet'}</p>
//           <div class="mt-3 flex flex-wrap gap-2 justify-center">
//             ${profile.interests.map(i => `
//               <span class="bg-gradient text-white text-xs px-2 py-1 rounded-full">
//                 ${i}
//               </span>
//             `).join('')}
//           </div>
//         </div>
//       </div>
//     `).join('');
//   }

//   async viewProfile(userId) {
//     // In a real app, you would show a profile detail view here
//     // For now, just show a toast
//     Toast.info('Profile viewing feature coming soon!');
//   }

//   async openChat(userId) {
//     this.currentChatUser = userId;
//     this.showChat();
//     await this.loadMessages(userId);
//   }

//   async loadMessages(matchId) {
//     try {
//       const res = await fetch(`${API}/chat/messages/${matchId}`, {
//         headers: {
//           'Authorization': `Bearer ${this.token}`
//         }
//       });

//       const data = await res.json();

//       if (data.success) {
//         this.displayMessages(data.messages);
//       }
//     } catch (error) {
//       console.error('Error loading messages:', error);
//     }
//   }

//   displayMessages(messages) {
//     const container = document.getElementById('messagesList');
//     if (!container) return;

//     container.innerHTML = messages.map(msg => `
//       <div class="message-bubble ${msg.isMine ? 'mine' : 'theirs'}">
//         ${msg.content}
//         <div class="text-xs opacity-75 mt-1">
//           ${new Date(msg.createdAt).toLocaleTimeString()}
//         </div>
//       </div>
//     `).join('');

//     container.scrollTop = container.scrollHeight;
//   }

//   async sendMessage() {
//     const input = document.getElementById('messageInput');
//     const content = input.value.trim();

//     if (!content) return;

//     try {
//       const res = await fetch(`${API}/chat/send`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${this.token}`
//         },
//         body: JSON.stringify({ 
//           matchId: this.currentChatUser,
//           content 
//         })
//       });

//       const data = await res.json();

//       if (data.success) {
//         input.value = '';
//         await this.loadMessages(this.currentChatUser);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       Toast.error('Failed to send message');
//     }
//   }

//   async subscribe() {
//     try {
//       Toast.info('Subscription feature coming soon with World Chain integration!');
//     } catch (error) {
//       console.error('Error subscribing:', error);
//       Toast.error('Failed to subscribe');
//     }
//   }

//   async loadTransactions() {
//     const container = document.getElementById('transactionsList');
//     if (!container) return;

//     container.innerHTML = '<p class="text-secondary text-center py-8">No transactions yet</p>';
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.token = null;
//     this.user = null;
//     this.showAuth();
//     Toast.info('Logged out successfully');
//   }

//   // Screen navigation methods
//   showAuth() {
//     console.log('📍 Showing auth screen');
//     this.hideAllScreens();
//     const authScreen = document.getElementById('auth');
//     if (authScreen) {
//       authScreen.classList.remove('hidden');
//     }
//     this.currentScreen = 'auth';
//   }

//   showProfileSetup() {
//     console.log('📍 Showing profile setup');
//     this.hideAllScreens();
    
//     const profileSetupScreen = document.getElementById('profile-setup');
//     if (profileSetupScreen) {
//       profileSetupScreen.classList.remove('hidden');
      
//       // If editing existing profile, populate form
//       if (this.user && this.user.name) {
//         const nameInput = document.getElementById('name');
//         const ageInput = document.getElementById('age');
//         const genderInput = document.getElementById('gender');
//         const bioInput = document.getElementById('bio');
//         const interestsInput = document.getElementById('interests');
        
//         if (nameInput) nameInput.value = this.user.name || '';
//         if (ageInput) ageInput.value = this.user.age || '';
//         if (genderInput) genderInput.value = this.user.gender || '';
//         if (bioInput) bioInput.value = this.user.bio || '';
//         if (interestsInput) interestsInput.value = this.user.interests?.join(', ') || '';
//       }
//     }
    
//     this.currentScreen = 'profile-setup';
//   }

//   showHome() {
//     console.log('📍 Showing home screen');
//     this.hideAllScreens();
    
//     const homeScreen = document.getElementById('home');
//     if (homeScreen) {
//       homeScreen.classList.remove('hidden');
      
//       // Update welcome message
//       const welcomeMsg = document.getElementById('welcomeMessage');
//       if (welcomeMsg && this.user) {
//         welcomeMsg.textContent = `Welcome, ${this.user.name || 'User'}!`;
//       }
//     }
    
//     this.currentScreen = 'home';
//   }

//   async showProfile() {
//     console.log('📍 Showing profile screen');
//     this.hideAllScreens();
    
//     const profileScreen = document.getElementById('profile');
//     if (profileScreen) {
//       profileScreen.classList.remove('hidden');
      
//       // Load fresh profile data
//       try {
//         const res = await fetch(`${API}/profile/me`, {
//           headers: {
//             'Authorization': `Bearer ${this.token}`
//           }
//         });

//         const data = await res.json();

//         if (data.success) {
//           const profile = data.profile;
          
//           // Update profile display
//           const profileInitial = document.getElementById('profileInitial');
//           const profileName = document.getElementById('profileName');
//           const profileAge = document.getElementById('profileAge');
//           const profileBio = document.getElementById('profileBio');
//           const profileInterests = document.getElementById('profileInterests');
          
//           if (profileInitial) profileInitial.textContent = profile.name.charAt(0).toUpperCase();
//           if (profileName) profileName.textContent = profile.name;
//           if (profileAge) profileAge.textContent = `${profile.age} years old • ${profile.gender}`;
//           if (profileBio) profileBio.textContent = profile.bio || 'No bio yet';
          
//           if (profileInterests) {
//             profileInterests.innerHTML = (profile.interests || []).map(i => `
//               <span class="bg-gradient text-white text-sm px-3 py-1 rounded-full">
//                 ${i}
//               </span>
//             `).join('');
//           }
          
//           // Update subscription status
//           const subscriptionStatus = document.getElementById('subscriptionStatus');
//           if (subscriptionStatus) {
//             subscriptionStatus.textContent = 'Free Plan';
//             subscriptionStatus.className = 'font-semibold text-secondary';
//           }
//         }
//       } catch (error) {
//         console.error('Error loading profile:', error);
//       }
//     }
    
//     this.currentScreen = 'profile';
//   }

//   showExplore() {
//     console.log('📍 Showing explore screen');
//     this.hideAllScreens();
//     const exploreScreen = document.getElementById('explore');
//     if (exploreScreen) {
//       exploreScreen.classList.remove('hidden');
//     }
//     this.currentScreen = 'explore';
//     this.loadExploreProfiles();
//   }

//   showChat() {
//     console.log('📍 Showing chat screen');
//     this.hideAllScreens();
//     const chatScreen = document.getElementById('chat');
//     if (chatScreen) {
//       chatScreen.classList.remove('hidden');
//     }
//     this.currentScreen = 'chat';
//   }

//   showSubscription() {
//     console.log('📍 Showing subscription screen');
//     this.hideAllScreens();
//     const subscriptionScreen = document.getElementById('subscription');
//     if (subscriptionScreen) {
//       subscriptionScreen.classList.remove('hidden');
//     }
//     this.currentScreen = 'subscription';
//   }

//   showTransactions() {
//     console.log('📍 Showing transactions screen');
//     this.hideAllScreens();
//     const transactionsScreen = document.getElementById('transactions');
//     if (transactionsScreen) {
//       transactionsScreen.classList.remove('hidden');
//     }
//     this.currentScreen = 'transactions';
//     this.loadTransactions();
//   }

//   hideAllScreens() {
//     const screens = [
//       'auth',
//       'profile-setup',
//       'home',
//       'profile',
//       'explore',
//       'chat',
//       'subscription',
//       'transactions'
//     ];

//     screens.forEach(screenId => {
//       const screen = document.getElementById(screenId);
//       if (screen) {
//         screen.classList.add('hidden');
//       }
//     });
//   }
// }

// // Initialize app
// const app = new App();

// // Make app globally accessible for onclick handlers
// window.app = app;

// export default app;

// HARDCODED API URL


// HARDCODED API URL
const API = 'https://elite-connect-backend-ktv9.onrender.com/api';

import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';
import Toast from './toast.js';

class App {
  constructor() {
    this.token = localStorage.getItem('token');
    this.user = null;
    this.currentScreen = 'auth';
    this.init();
  }

  async init() {
    console.log('🚀 App initializing...');
    console.log('📍 Token exists:', !!this.token);

    // Initialize MiniKit
    if (MiniKit.isInstalled()) {
      console.log('✅ MiniKit is installed');
      await MiniKit.install();
    } else {
      console.warn('⚠️ MiniKit not installed - running outside World App');
    }

    // Check if user is logged in
    if (this.token) {
      await this.loadUser();
    } else {
      this.showAuth();
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Auth
    document.getElementById('signInBtn')?.addEventListener('click', () => this.verifyWithWorldID());

    // Profile Setup
    document.getElementById('profileForm')?.addEventListener('submit', (e) => this.saveProfile(e));

    // Home
    document.getElementById('viewProfileBtn')?.addEventListener('click', () => this.showProfile());
    document.getElementById('exploreBtn')?.addEventListener('click', () => this.showExplore());

    // Profile
    document.getElementById('editProfileBtn')?.addEventListener('click', () => this.showProfileSetup());
    document.getElementById('logoutBtn')?.addEventListener('click', () => this.logout());

    // Explore
    document.getElementById('backToHomeBtn')?.addEventListener('click', () => this.showHome());

    // Chat
    document.getElementById('chatBackBtn')?.addEventListener('click', () => this.showExplore());
    document.getElementById('sendMessageBtn')?.addEventListener('click', () => this.sendMessage());
    document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Subscription
    document.getElementById('subscriptionBackBtn')?.addEventListener('click', () => this.showProfile());
    document.getElementById('subscribeBtn')?.addEventListener('click', () => this.subscribe());

    // Transactions
    document.getElementById('transactionBackBtn')?.addEventListener('click', () => this.showProfile());
  }

  async verifyWithWorldID() {
    try {
      console.log('🔵 Starting World ID verification...');

      if (!MiniKit.isInstalled()) {
        Toast.error('Please open this app in World App');
        return;
      }

      Toast.info('Opening World ID verification...');

      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: 'signin',
        signal: '',
        verification_level: VerificationLevel.Orb
      });

      console.log('🔵 Verification status:', finalPayload.status);

      if (finalPayload.status === 'success') {
        console.log('✅ World ID verification successful');
        Toast.info('Verifying with backend...');

        const res = await fetch(`${API}/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalPayload)
        });

        console.log('🔵 Backend status:', res.status);
        const data = await res.json();
        console.log('🔵 Backend response:', data);

        if (data.success) {
          console.log('✅ Backend verification successful');
          this.token = data.token;
          this.user = data.user;
          localStorage.setItem('token', this.token);

          Toast.success('Signed in successfully!');

          // Close modal
          try {
            await MiniKit.commandsAsync.closeModal();
            console.log('✅ Modal closed');
          } catch (e) {
            console.warn('⚠️ Could not close modal:', e);
          }

          // Navigate after a short delay
          setTimeout(() => {
            console.log('🔵 Checking profile_completed:', this.user.profile_completed);
            
            if (this.user.profile_completed) {
              console.log('→ Going to HOME');
              this.showHome();
            } else {
              console.log('→ Going to PROFILE SETUP');
              this.showProfileSetup();
            }
          }, 800);

        } else {
          console.error('❌ Backend error:', data.error);
          Toast.error(data.error || 'Verification failed');
        }
      } else {
        console.log('⚠️ Verification cancelled or failed');
        Toast.warning('Verification cancelled');
      }
    } catch (error) {
      console.error('❌ Verification error:', error);
      Toast.error('Verification failed. Please try again.');
    }
  }

  async loadUser() {
    try {
      const res = await fetch(`${API}/auth/me`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });

      if (res.ok) {
        const data = await res.json();
        this.user = data;
        console.log('👤 User loaded:', this.user);

        if (this.user.profile_completed) {
          this.showHome();
        } else {
          this.showProfileSetup();
        }
      } else {
        console.log('❌ Invalid token, logging out');
        this.logout();
      }
    } catch (error) {
      console.error('Error loading user:', error);
      this.logout();
    }
  }

  async saveProfile(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const profile = {
      name: formData.get('name'),
      age: parseInt(formData.get('age')),
      gender: formData.get('gender'),
      bio: formData.get('bio') || '',
      interests: formData.get('interests') ? 
        formData.get('interests').split(',').map(i => i.trim()) : []
    };

    console.log('💾 Saving profile:', profile);

    try {
      const res = await fetch(`${API}/profile/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(profile)
      });

      const data = await res.json();
      console.log('📥 Profile save response:', data);

      if (data.success) {
        this.user = { ...this.user, profile_completed: true, ...profile };
        Toast.success('Profile saved!');
        
        console.log('✅ Profile saved → Going to HOME');
        setTimeout(() => this.showHome(), 500);
      } else {
        Toast.error(data.error || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Toast.error('Failed to save profile');
    }
  }

  async loadExploreProfiles() {
    try {
      const res = await fetch(`${API}/explore/profiles`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });

      const data = await res.json();

      if (data.success) {
        this.displayProfiles(data.profiles);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }

  displayProfiles(profiles) {
    const container = document.getElementById('profilesList');
    if (!container) return;

    if (profiles.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No profiles found</p>';
      return;
    }

    container.innerHTML = profiles.map(profile => `
      <div class="profile-card" onclick="app.viewProfile('${profile.id}')">
        <h3>${profile.name}, ${profile.age}</h3>
        <p style="color: var(--text-secondary); margin: 0.5rem 0;">${profile.bio}</p>
        ${profile.interests.length > 0 ? `
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
            ${profile.interests.map(i => `
              <span style="background: var(--bg-tertiary); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;">
                ${i}
              </span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  viewProfile(profileId) {
    console.log('Viewing profile:', profileId);
    Toast.info('Profile details coming soon!');
  }

  sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input?.value.trim();
    if (!content) return;
    Toast.info('Messaging coming soon!');
    if (input) input.value = '';
  }

  subscribe() {
    Toast.info('Subscription coming soon!');
  }

  logout() {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    this.token = null;
    this.user = null;
    this.showAuth();
    Toast.info('Logged out');
  }

  // ========================================
  // SCREEN NAVIGATION - HANDLES INLINE STYLES
  // ========================================

  hideAllScreens() {
    console.log('🔒 Hiding all screens');
    const screens = ['auth', 'profile-setup', 'home', 'profile', 'explore', 'chat', 'subscription', 'transactions'];
    screens.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('hidden');
        el.style.display = 'none'; // Also set inline style
        console.log(`  ❌ Hidden: ${id}`);
      }
    });
  }

  showScreen(screenId) {
    console.log(`📍 SHOWING: ${screenId.toUpperCase()} SCREEN`);
    this.hideAllScreens();
    const el = document.getElementById(screenId);
    if (el) {
      el.classList.remove('hidden');
      el.style.display = 'block'; // Remove inline hidden style
      console.log(`  ✅ ${screenId} screen is now visible`);
    } else {
      console.error(`  ❌ ERROR: ${screenId} screen element not found!`);
    }
    this.currentScreen = screenId;
  }

  showAuth() {
    this.showScreen('auth');
  }

  showProfileSetup() {
    this.showScreen('profile-setup');
    
    // Populate form if editing
    if (this.user && this.user.name) {
      document.getElementById('name').value = this.user.name || '';
      document.getElementById('age').value = this.user.age || '';
      document.getElementById('gender').value = this.user.gender || '';
      document.getElementById('bio').value = this.user.bio || '';
      document.getElementById('interests').value = this.user.interests?.join(', ') || '';
    }
  }

  showHome() {
    this.showScreen('home');
    
    // Update welcome message
    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg && this.user) {
      welcomeMsg.textContent = `Welcome, ${this.user.name || 'User'}!`;
    }
  }

  async showProfile() {
    this.showScreen('profile');
    
    // Load profile data
    try {
      const res = await fetch(`${API}/profile/me`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });

      const data = await res.json();

      if (data.success) {
        const profile = data.profile;
        document.getElementById('profileName').textContent = profile.name;
        document.getElementById('profileAge').textContent = `${profile.age} years old`;
        document.getElementById('profileBio').textContent = profile.bio || 'No bio';
        document.getElementById('profileInitial').textContent = profile.name.charAt(0).toUpperCase();

        const interestsContainer = document.getElementById('profileInterests');
        if (interestsContainer && profile.interests) {
          interestsContainer.innerHTML = profile.interests.map(i => `
            <span style="background: var(--bg-tertiary); padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem;">
              ${i}
            </span>
          `).join('');
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  showExplore() {
    this.showScreen('explore');
    this.loadExploreProfiles();
  }

  showChat() {
    this.showScreen('chat');
  }

  showSubscription() {
    this.showScreen('subscription');
  }

  showTransactions() {
    this.showScreen('transactions');
  }
}

// Initialize app
const app = new App();

// Make app globally accessible
window.app = app;

export default app;