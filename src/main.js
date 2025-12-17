
import './style.css';

// ============================================
// IMPORTS
// ============================================
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';
import Toast from './toast.js';

const API = 'https://elite-connect-backend-ktv9.onrender.com/api';

// ============================================
// APP CLASS
// ============================================
class App {
  constructor() {
    console.log('🎬 Elite Connect initializing...');
    this.token = localStorage.getItem('token');
    this.user = null;
    this.currentScreen = 'auth';
    console.log('📍 Token exists:', !!this.token);
    this.init();
  }

  async init() {
    console.log('🔵 [INIT] Starting app initialization...');
    
    // Initialize MiniKit
    if (MiniKit.isInstalled()) {
      console.log('✅ [INIT] MiniKit is installed');
      await MiniKit.install();
      console.log('✅ [INIT] MiniKit installed successfully');
    } else {
      console.warn('⚠️ [INIT] MiniKit not installed - running outside World App');
    }

    // Set up event listeners
    this.setupEventListeners();
    console.log('✅ [INIT] Event listeners set up');

    // Check if user is already logged in
    if (this.token) {
      console.log('🔵 [INIT] Token exists, loading user...');
      await this.loadUser();
    } else {
      console.log('🔵 [INIT] No token, showing auth screen...');
      this.showAuth();
    }
    
    console.log('✅ [INIT] App initialization complete');
  }

  setupEventListeners() {
    // Sign in button
    document.getElementById('signInBtn')?.addEventListener('click', () => this.verifyWithWorldID());
    
    // Profile form
    document.getElementById('profileForm')?.addEventListener('submit', (e) => this.saveProfile(e));
    
    // Navigation buttons
    document.getElementById('viewProfileBtn')?.addEventListener('click', () => this.showProfile());
    document.getElementById('exploreBtn')?.addEventListener('click', () => this.showExplore());
    document.getElementById('backToHomeBtn')?.addEventListener('click', () => this.showHome());
    document.getElementById('editProfileBtn')?.addEventListener('click', () => this.showProfileSetup());
    document.getElementById('logoutBtn')?.addEventListener('click', () => this.logout());
    document.getElementById('chatBackBtn')?.addEventListener('click', () => this.showExplore());
    document.getElementById('sendMessageBtn')?.addEventListener('click', () => this.sendMessage());
    document.getElementById('subscriptionBackBtn')?.addEventListener('click', () => this.showProfile());
    document.getElementById('subscribeBtn')?.addEventListener('click', () => this.subscribe());
    document.getElementById('transactionBackBtn')?.addEventListener('click', () => this.showProfile());
    
    // Message input
    document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  async verifyWithWorldID() {
    try {
      console.log('');
      console.log('═══════════════════════════════════════');
      console.log('🔵 [1] STARTING WORLD ID VERIFICATION');
      console.log('═══════════════════════════════════════');

      if (!MiniKit.isInstalled()) {
        console.error('❌ [1.1] MiniKit not installed');
        Toast.error('Please open this app in World App');
        return;
      }
      console.log('✅ [1.2] MiniKit is installed');

      Toast.info('Opening World ID verification...');
      console.log('🔵 [2] Calling MiniKit.commandsAsync.verify...');

      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: 'signin',
        signal: '',
        verification_level: VerificationLevel.Device
      });

      console.log('🔵 [3] World ID response:', JSON.stringify(finalPayload, null, 2));

      if (finalPayload.status === 'success') {
        console.log('✅ [3.1] Verification successful');
        Toast.info('Verifying with backend...');

        console.log('🔵 [4] Sending to backend:', API);
        
        const res = await fetch(`${API}/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalPayload)
        });

        console.log('🔵 [5] Backend response status:', res.status);

        const data = await res.json();
        console.log('🔵 [6] Backend data:', JSON.stringify(data, null, 2));

        if (data.success) {
          console.log('✅ [6.1] Backend authentication successful!');
          
          this.token = data.token;
          this.user = data.user;
          localStorage.setItem('token', this.token);

          console.log('✅ [7] Token stored');
          console.log('✅ [8] User:', this.user);

          Toast.success('Welcome to Elite Connect!');

          // Close World ID modal
          console.log('🔵 [9] Attempting to close World ID modal...');
          
          try {
            if (MiniKit.commandsAsync.closeModal) {
              await MiniKit.commandsAsync.closeModal();
              console.log('✅ Modal closed successfully');
            }
          } catch (error) {
            console.warn('⚠️ Could not close modal:', error);
          }

          // Navigate after delay
          console.log('');
          console.log('═══════════════════════════════════════');
          console.log('🔵 [10] STARTING NAVIGATION');
          console.log('═══════════════════════════════════════');
          console.log('Profile completed?', this.user.profile_completed);
          
          setTimeout(() => {
            console.log('🔵 [11] Executing navigation...');
            
            if (this.user && this.user.profile_completed) {
              console.log('✅ [12] Navigating to HOME (profile completed)');
              this.showHome();
            } else {
              console.log('✅ [12] Navigating to PROFILE SETUP (profile incomplete)');
              this.showProfileSetup();
            }
            
            console.log('═══════════════════════════════════════');
            console.log('✅ NAVIGATION COMPLETE');
            console.log('═══════════════════════════════════════');
            console.log('');
          }, 500);
          
        } else {
          console.error('❌ [6.2] Backend error:', data.error);
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
      console.error('');
      console.error('═══════════════════════════════════════');
      console.error('❌ CRITICAL ERROR IN VERIFICATION');
      console.error('═══════════════════════════════════════');
      console.error('Error:', error);
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
      console.error('═══════════════════════════════════════');
      console.error('');
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
  // SCREEN NAVIGATION
  // ========================================

  hideAllScreens() {
    console.log('🔒 Hiding all screens');
    const screens = ['auth', 'profile-setup', 'home', 'profile', 'explore', 'chat', 'subscription', 'transactions'];
    screens.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('hidden');
        el.style.display = 'none';
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
      el.style.display = 'block';
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
    
    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg && this.user) {
      welcomeMsg.textContent = `Welcome, ${this.user.name || 'User'}!`;
    }
  }

  async showProfile() {
    this.showScreen('profile');
    
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