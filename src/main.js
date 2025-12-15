

// HARDCODED API URL - bypassing config.js caching issue
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
    // Initialize MiniKit
    if (MiniKit.isInstalled()) {
      console.log('✅ MiniKit is installed');
      
      // Install MiniKit
      await MiniKit.install();
      console.log('✅ MiniKit installed successfully');
    } else {
      console.warn('⚠️ MiniKit not installed - running outside World App');
    }

    // Check if user is already logged in
    if (this.token) {
      await this.loadUser();
    } else {
      this.showAuth();
    }

    // Set up event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Auth screen
    const signInBtn = document.getElementById('signInBtn');
    if (signInBtn) {
      signInBtn.addEventListener('click', () => this.verifyWithWorldID());
    }

    // Profile setup screen
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => this.saveProfile(e));
    }

    // Profile screen
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => this.showProfileSetup());
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    // Home screen - navigation
    const viewProfileBtn = document.getElementById('viewProfileBtn');
    if (viewProfileBtn) {
      viewProfileBtn.addEventListener('click', () => this.showProfile());
    }

    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => this.showExplore());
    }

    // Explore screen
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    if (backToHomeBtn) {
      backToHomeBtn.addEventListener('click', () => this.showHome());
    }

    // Chat screen
    const chatBackBtn = document.getElementById('chatBackBtn');
    if (chatBackBtn) {
      chatBackBtn.addEventListener('click', () => this.showExplore());
    }

    const sendMessageBtn = document.getElementById('sendMessageBtn');
    if (sendMessageBtn) {
      sendMessageBtn.addEventListener('click', () => this.sendMessage());
    }

    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
      messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
    }

    // Subscription screen
    const subscriptionBackBtn = document.getElementById('subscriptionBackBtn');
    if (subscriptionBackBtn) {
      subscriptionBackBtn.addEventListener('click', () => this.showProfile());
    }

    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
      subscribeBtn.addEventListener('click', () => this.subscribe());
    }

    // Transaction screen
    const transactionBackBtn = document.getElementById('transactionBackBtn');
    if (transactionBackBtn) {
      transactionBackBtn.addEventListener('click', () => this.showProfile());
    }
  }

  async verifyWithWorldID() {
    try {
      console.log('🔵 [1] Starting verification...');

      if (!MiniKit.isInstalled()) {
        console.error('❌ [1.1] MiniKit not installed');
        Toast.error('Please open this app in World App');
        return;
      }
      console.log('✅ [1.2] MiniKit installed');

      Toast.info('Opening World ID verification...');
      console.log('🔵 [2] Calling MiniKit.commandsAsync.verify...');

      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: 'signin',
        signal: '',
        verification_level: VerificationLevel.Orb  // ✅ Using Orb for testing with manager
      });

      console.log('🔵 [3] World ID response:', JSON.stringify(finalPayload));

      if (finalPayload.status === 'success') {
        console.log('✅ [3.1] Verification successful');
        Toast.info('Verifying your World ID...');

        console.log('🔵 [4] Sending to backend...');
        console.log('🔵 [4.1] API URL:', API);
        console.log('🔵 [4.2] Payload:', JSON.stringify(finalPayload));

        const res = await fetch(`${API}/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalPayload)
        });

        console.log('🔵 [5] Backend response status:', res.status);

        const data = await res.json();
        console.log('🔵 [6] Backend data:', JSON.stringify(data));

        if (data.success) {
          console.log('✅ [6.1] Authentication successful');
          this.token = data.token;
          this.user = data.user;
          localStorage.setItem('token', this.token);

          console.log('🔵 [7] Token stored');
          console.log('🔵 [8] User:', JSON.stringify(this.user));

          Toast.success('Welcome to Elite Connect!');

          console.log('🔵 [9] Profile completed?', this.user?.profile_completed);

          // ✅ CRITICAL: Close World ID modal first, then navigate
          console.log('🔵 [10] Closing World ID modal...');
          
          try {
            // Close the World ID verification modal
            await MiniKit.commandsAsync.closeModal();
            console.log('✅ World ID modal closed');
          } catch (error) {
            console.warn('⚠️ Could not close modal:', error);
            // Continue anyway
          }

          // Small delay to let modal close completely
          setTimeout(() => {
            console.log('🔵 [11] Starting navigation...');
            
            // Hide auth screen
            const authScreen = document.getElementById('auth');
            if (authScreen) {
              authScreen.classList.add('hidden');
              console.log('✅ Auth screen hidden');
            }
            
            // Navigate based on profile completion
            if (this.user && this.user.profile_completed) {
              console.log('🔵 [12] Navigating to home');
              this.showHome();
            } else {
              console.log('🔵 [12] Navigating to profile setup');
              this.showProfileSetup();
            }
            
            console.log('🔵 [13] Navigation complete');
          }, 300);  // Small delay for modal to close
          
        } else {
          console.error('❌ [6.2] Backend returned error:', data.error);
          Toast.error(data.error || 'Verification failed');
        }
      } else if (finalPayload.status === 'error') {
        console.error('❌ [3.2] World ID error:', finalPayload);
        Toast.error('Verification failed');
      } else {
        console.log('⚠️ [3.3] Verification cancelled');
        Toast.warning('Verification cancelled');
      }
    } catch (error) {
      console.error('❌ [ERROR] Caught exception:', error);
      console.error('❌ [ERROR] Stack:', error.stack);
      console.error('❌ [ERROR] Message:', error.message);
      Toast.error('Verification failed. Please try again.');
    }
  }

  async loadUser() {
    try {
      const res = await fetch(`${API}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        this.user = data.user;

        if (this.user.profile_completed) {
          this.showHome();
        } else {
          this.showProfileSetup();
        }
      } else {
        // Token invalid, clear and show auth
        localStorage.removeItem('token');
        this.token = null;
        this.showAuth();
      }
    } catch (error) {
      console.error('Error loading user:', error);
      localStorage.removeItem('token');
      this.token = null;
      this.showAuth();
    }
  }

  async saveProfile(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    
    const profile = {
      name: formData.get('name'),
      age: parseInt(formData.get('age')),
      gender: formData.get('gender'),
      bio: formData.get('bio'),
      interests: formData.get('interests').split(',').map(i => i.trim())
    };

    try {
      const res = await fetch(`${API}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(profile)
      });

      const data = await res.json();

      if (data.success) {
        this.user = data.user;
        Toast.success('Profile saved successfully!');
        this.showHome();
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
      const res = await fetch(`${API}/explore`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        this.displayProfiles(data.profiles);
      } else {
        Toast.error('Failed to load profiles');
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
      Toast.error('Failed to load profiles');
    }
  }

  displayProfiles(profiles) {
    const container = document.getElementById('profilesList');
    if (!container) return;

    if (profiles.length === 0) {
      container.innerHTML = '<p class="text-gray-500 text-center py-8">No profiles found</p>';
      return;
    }

    container.innerHTML = profiles.map(profile => `
      <div class="bg-white rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition" 
           onclick="app.openChat('${profile._id}')">
        <h3 class="font-bold text-lg">${profile.name}</h3>
        <p class="text-gray-600">${profile.age} years old</p>
        <p class="text-sm text-gray-500 mt-2">${profile.bio}</p>
        <div class="mt-2 flex flex-wrap gap-2">
          ${profile.interests.map(i => `
            <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              ${i}
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  async openChat(userId) {
    this.currentChatUser = userId;
    this.showChat();
    await this.loadMessages(userId);
  }

  async loadMessages(userId) {
    try {
      const res = await fetch(`${API}/chat/${userId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        this.displayMessages(data.messages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }

  displayMessages(messages) {
    const container = document.getElementById('messagesList');
    if (!container) return;

    container.innerHTML = messages.map(msg => `
      <div class="${msg.sender === this.user._id ? 'text-right' : 'text-left'} mb-4">
        <div class="inline-block ${msg.sender === this.user._id ? 'bg-purple-600 text-white' : 'bg-gray-200'} 
                    rounded-lg px-4 py-2 max-w-xs">
          ${msg.content}
        </div>
        <div class="text-xs text-gray-500 mt-1">
          ${new Date(msg.timestamp).toLocaleTimeString()}
        </div>
      </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
  }

  async sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();

    if (!content) return;

    try {
      const res = await fetch(`${API}/chat/${this.currentChatUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ content })
      });

      const data = await res.json();

      if (data.success) {
        input.value = '';
        await this.loadMessages(this.currentChatUser);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Toast.error('Failed to send message');
    }
  }

  async subscribe() {
    try {
      const res = await fetch(`${API}/subscription`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        this.user.subscription = data.subscription;
        Toast.success('Subscribed successfully!');
        this.showProfile();
      } else {
        Toast.error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      Toast.error('Failed to subscribe');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.user = null;
    this.showAuth();
    Toast.info('Logged out successfully');
  }

  // Screen navigation methods
  showAuth() {
    this.hideAllScreens();
    document.getElementById('auth').classList.remove('hidden');
    this.currentScreen = 'auth';
  }

  showProfileSetup() {
    console.log('📍 showProfileSetup() called');
    this.hideAllScreens();
    
    const profileSetupScreen = document.getElementById('profile-setup');
    if (profileSetupScreen) {
      profileSetupScreen.classList.remove('hidden');
      console.log('✅ Profile setup screen shown');
      
      // If editing existing profile, populate form
      if (this.user && this.user.name) {
        document.getElementById('name').value = this.user.name || '';
        document.getElementById('age').value = this.user.age || '';
        document.getElementById('gender').value = this.user.gender || '';
        document.getElementById('bio').value = this.user.bio || '';
        document.getElementById('interests').value = this.user.interests?.join(', ') || '';
      }
    } else {
      console.error('❌ Profile setup screen not found!');
    }
    
    this.currentScreen = 'profile-setup';
  }

  showHome() {
    console.log('📍 showHome() called');
    this.hideAllScreens();
    
    const homeScreen = document.getElementById('home');
    if (homeScreen) {
      homeScreen.classList.remove('hidden');
      console.log('✅ Home screen shown');
      
      // Update welcome message
      const welcomeMsg = document.getElementById('welcomeMessage');
      if (welcomeMsg && this.user) {
        welcomeMsg.textContent = `Welcome, ${this.user.name}!`;
      }
    } else {
      console.error('❌ Home screen not found!');
    }
    
    this.currentScreen = 'home';
  }

  showProfile() {
    this.hideAllScreens();
    document.getElementById('profile').classList.remove('hidden');
    
    // Update profile display
    if (this.user) {
      document.getElementById('profileName').textContent = this.user.name;
      document.getElementById('profileAge').textContent = `${this.user.age} years old`;
      document.getElementById('profileBio').textContent = this.user.bio;
      
      const interestsContainer = document.getElementById('profileInterests');
      interestsContainer.innerHTML = this.user.interests.map(i => `
        <span class="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
          ${i}
        </span>
      `).join('');
      
      const subscriptionStatus = document.getElementById('subscriptionStatus');
      if (this.user.subscription && this.user.subscription.active) {
        subscriptionStatus.textContent = `Premium - Expires ${new Date(this.user.subscription.end_date).toLocaleDateString()}`;
        subscriptionStatus.classList.add('text-green-600');
      } else {
        subscriptionStatus.textContent = 'Free Plan';
        subscriptionStatus.classList.add('text-gray-600');
      }
    }
    
    this.currentScreen = 'profile';
  }

  showExplore() {
    this.hideAllScreens();
    document.getElementById('explore').classList.remove('hidden');
    this.currentScreen = 'explore';
    this.loadExploreProfiles();
  }

  showChat() {
    this.hideAllScreens();
    document.getElementById('chat').classList.remove('hidden');
    this.currentScreen = 'chat';
  }

  showSubscription() {
    this.hideAllScreens();
    document.getElementById('subscription').classList.remove('hidden');
    this.currentScreen = 'subscription';
  }

  showTransactions() {
    this.hideAllScreens();
    document.getElementById('transactions').classList.remove('hidden');
    this.currentScreen = 'transactions';
    this.loadTransactions();
  }

  async loadTransactions() {
    try {
      const res = await fetch(`${API}/transactions`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        this.displayTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  }

  displayTransactions(transactions) {
    const container = document.getElementById('transactionsList');
    if (!container) return;

    if (transactions.length === 0) {
      container.innerHTML = '<p class="text-gray-500 text-center py-8">No transactions yet</p>';
      return;
    }

    container.innerHTML = transactions.map(tx => `
      <div class="bg-white rounded-lg p-4 shadow mb-4">
        <div class="flex justify-between items-center">
          <div>
            <p class="font-semibold">${tx.type}</p>
            <p class="text-sm text-gray-600">${new Date(tx.timestamp).toLocaleString()}</p>
          </div>
          <div class="text-right">
            <p class="font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}">
              ${tx.amount > 0 ? '+' : ''}$${Math.abs(tx.amount).toFixed(2)}
            </p>
            <p class="text-xs text-gray-500">${tx.status}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  hideAllScreens() {
    const screens = [
      'auth',
      'profile-setup',
      'home',
      'profile',
      'explore',
      'chat',
      'subscription',
      'transactions'
    ];

    screens.forEach(screenId => {
      const screen = document.getElementById(screenId);
      if (screen) {
        screen.classList.add('hidden');
      }
    });
  }
}

// Initialize app
const app = new App();

// Make app globally accessible for onclick handlers
window.app = app;

export default app;