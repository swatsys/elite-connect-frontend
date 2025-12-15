// import './style.css';
// import { MiniKit, tokenToDecimals, Tokens } from '@worldcoin/minikit-js';
// import { API, APP_NAME, WORLD_APP_ID, WLD_RECEIVING_WALLET, PRICING } from './config.js';
// import { ThemeManager, THEMES } from './utils/theme.js';
// import { Toast } from './utils/toast.js';

// // Initialize MiniKit
// MiniKit.install(WORLD_APP_ID);

// class App {
//   constructor() {
//     this.token = localStorage.getItem('token');
//     this.user = null;
//     this.currentPage = 'auth';
//     this.themeManager = new ThemeManager();
//     this.selectedImage = null;
//     this.showEmojiPicker = false;

//     if (this.token) {
//       this.init();
//     } else {
//       this.showAuth();
//     }
//   }

//   async init() {
//     try {
//       const res = await fetch(`${API}/auth/me`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       if (res.ok) {
//         this.user = await res.json();
//         if (this.user.profile_completed) {
//           this.showHome();
//         } else {
//           this.showProfileSetup();
//         }
//       } else {
//         this.logout();
//       }
//     } catch (error) {
//       console.error('Init error:', error);
//       this.logout();
//     }
//   }

//   showAuth() {
//     this.currentPage = 'auth';
//     document.getElementById('app').innerHTML = `
//       <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem;background:var(--bg-secondary)">
//         <div class="card" style="max-width:400px;width:100%;text-align:center">
//           <div style="width:120px;height:120px;background:var(--gradient);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:4rem;margin:0 auto 1.5rem;box-shadow:0 8px 16px var(--shadow)">
//             💕
//           </div>
//           <h1 style="font-size:2.5rem;margin-bottom:0.5rem;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:800">
//             ${APP_NAME}
//           </h1>
//           <p style="color:var(--text-secondary);margin-bottom:2rem;font-size:1.1rem">
//             Verified connections, genuine hearts
//           </p>
//           <button class="btn" onclick="window.app.verifyWithWorldID()">
//             🌍 Sign in with World ID
//           </button>
//           <p style="margin-top:1.5rem;font-size:0.875rem;color:var(--text-tertiary)">
//             One person, one profile. Verified humans only.
//           </p>
//         </div>
//       </div>
//     `;
//   }

//   async verifyWithWorldID() {
//     try {
//       if (!MiniKit.isInstalled()) {
//         Toast.error('Please open this app in World App');
//         return;
//       }

//       Toast.info('Opening World ID verification...');

//       const { finalPayload } = await MiniKit.commandsAsync.verify({
//         action: 'signin',
//         signal: '',
//         verification_level: 'orb'
//       });

//       if (finalPayload.status === 'success') {
//         Toast.info('Verifying your World ID...');

//         const res = await fetch(`${API}/auth/verify`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(finalPayload)
//         });

//         const data = await res.json();

//         if (data.success) {
//           this.token = data.token;
//           this.user = data.user;
//           localStorage.setItem('token', this.token);

//           Toast.success('Welcome to Elite Connect!');

//           if (data.user.profile_completed) {
//             this.showHome();
//           } else {
//             this.showProfileSetup();
//           }
//         } else {
//           Toast.error(data.error || 'Verification failed');
//         }
//       } else {
//         Toast.warning('Verification cancelled');
//       }
//     } catch (error) {
//       console.error('Verification error:', error);
//       Toast.error('Verification failed. Please try again.');
//     }
//   }

//   showProfileSetup() {
//     this.currentPage = 'setup';
//     document.getElementById('app').innerHTML = `
//       <div style="padding:2rem 1rem;max-width:600px;margin:0 auto">
//         <h1 style="font-size:2rem;margin-bottom:0.5rem">Create Your Profile</h1>
//         <p style="color:var(--text-secondary);margin-bottom:2rem">Tell us about yourself</p>

//         <form id="profileForm" style="display:flex;flex-direction:column;gap:1.5rem">
//           <div>
//             <label style="display:block;margin-bottom:0.5rem;font-weight:600;color:var(--text-primary)">Name</label>
//             <input type="text" name="name" required placeholder="Your name" />
//           </div>

//           <div>
//             <label style="display:block;margin-bottom:0.5rem;font-weight:600;color:var(--text-primary)">Age</label>
//             <input type="number" name="age" min="18" max="100" required placeholder="18" />
//           </div>

//           <div>
//             <label style="display:block;margin-bottom:0.5rem;font-weight:600;color:var(--text-primary)">Gender</label>
//             <select name="gender" required>
//               <option value="">Select gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="non-binary">Non-binary</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label style="display:block;margin-bottom:0.5rem;font-weight:600;color:var(--text-primary)">Bio</label>
//             <textarea name="bio" rows="4" placeholder="Tell us about yourself..."></textarea>
//           </div>

//           <button type="submit" class="btn">Complete Profile</button>
//         </form>
//       </div>
//     `;

//     document.getElementById('profileForm').onsubmit = (e) => this.submitProfile(e);
//   }

//   async submitProfile(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData);

//     try {
//       Toast.info('Creating your profile...');

//       const res = await fetch(`${API}/profile/create`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await res.json();

//       if (result.success) {
//         this.user.profile_completed = true;
//         Toast.success('Profile created successfully!');
//         this.showHome();
//       } else {
//         Toast.error(result.error || 'Failed to create profile');
//       }
//     } catch (error) {
//       console.error('Profile error:', error);
//       Toast.error('Failed to create profile');
//     }
//   }

//   showHome() {
//     this.currentPage = 'home';
//     document.getElementById('app').innerHTML = `
//       <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//         <div style="max-width:600px;margin:0 auto;padding:1rem">

//           <div class="card" style="text-align:center;margin-bottom:1.5rem">
//             <div style="font-size:3rem;margin-bottom:0.5rem">💕</div>
//             <h1 style="font-size:1.75rem;margin:0 0 0.5rem 0">Welcome Back!</h1>
//             <p style="color:var(--text-secondary);margin:0">Ready to find your match?</p>
//           </div>

//           <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
//             <div class="card" style="text-align:center;cursor:pointer" onclick="window.app.navigate('explore')">
//               <div style="font-size:3rem;margin-bottom:0.5rem">🔍</div>
//               <h3 style="margin:0;font-size:1.25rem">Discover</h3>
//               <p style="margin:0.25rem 0 0 0;color:var(--text-secondary);font-size:0.875rem">Find profiles</p>
//             </div>

//             <div class="card" style="text-align:center;cursor:pointer" onclick="window.app.navigate('chat')">
//               <div style="font-size:3rem;margin-bottom:0.5rem">💬</div>
//               <h3 style="margin:0;font-size:1.25rem">Messages</h3>
//               <p style="margin:0.25rem 0 0 0;color:var(--text-secondary);font-size:0.875rem">Your chats</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//     this.renderNav();
//   }

//   async showExplore() {
//     this.currentPage = 'explore';

//     try {
//       const res = await fetch(`${API}/explore/profiles`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const data = await res.json();

//       if (data.profiles && data.profiles.length > 0) {
//         const profile = data.profiles[0];

//         document.getElementById('app').innerHTML = `
//           <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//             <div style="max-width:500px;margin:0 auto;padding:1rem">
//               <div class="profile-card">
//                 <div class="profile-image">${profile.name.charAt(0)}</div>
//                 <div style="padding:2rem">
//                   <h2 style="font-size:2rem;margin:0 0 0.5rem 0">${profile.name}, ${profile.age}</h2>
//                   <p style="color:var(--text-secondary);margin-bottom:1rem">${profile.gender}</p>
//                   ${profile.bio ? `<p style="color:var(--text-secondary);margin-top:1rem">${profile.bio}</p>` : ''}
//                 </div>
//               </div>

//               <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem">
//                 <button class="action-btn pass" onclick="window.app.pass('${profile.id}')">✕</button>
//                 <button class="action-btn like" onclick="window.app.like('${profile.id}')">♥</button>
//               </div>
//             </div>
//           </div>
//         `;
//       } else {
//         document.getElementById('app').innerHTML = `
//           <div style="padding-bottom:85px;min-height:100vh;display:flex;align-items:center;justify-content:center">
//             <div style="text-align:center;padding:2rem">
//               <div style="font-size:4rem;margin-bottom:1rem">😊</div>
//               <h2 style="margin-bottom:0.5rem">No more profiles</h2>
//               <p style="color:var(--text-secondary)">Check back later for new people!</p>
//             </div>
//           </div>
//         `;
//       }
//     } catch (error) {
//       console.error('Explore error:', error);
//       Toast.error('Failed to load profiles');
//     }

//     this.renderNav();
//   }

//   async like(profileId) {
//     try {
//       const res = await fetch(`${API}/explore/like`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ profileId })
//       });

//       const data = await res.json();

//       if (data.matched) {
//         const statusRes = await fetch(`${API}/subscription/status`, {
//           headers: { 'Authorization': `Bearer ${this.token}` }
//         });
//         const status = await statusRes.json();

//         if (status.canConnect) {
//           await this.useConnection(data.matchId);
//           Toast.success('🎉 It\'s a Match! Chat unlocked!');
//         } else {
//           this.showSubscriptionOffer(data.matchId);
//           return;
//         }
//       }

//       this.showExplore();
//     } catch (error) {
//       console.error('Like error:', error);
//       Toast.error('Failed to like profile');
//       this.showExplore();
//     }
//   }

//   async pass(profileId) {
//     try {
//       await fetch(`${API}/explore/pass`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ profileId })
//       });

//       this.showExplore();
//     } catch (error) {
//       console.error('Pass error:', error);
//       this.showExplore();
//     }
//   }
//   // ... continuing from Part 1

//   showSubscriptionOffer(matchId) {
//     const overlay = document.createElement('div');
//     overlay.id = 'subscription-overlay';
//     overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;padding:1rem';

//     overlay.innerHTML = `
//       <div class="card" style="max-width:450px;text-align:center;animation:slideUp 0.3s">
//         <div style="font-size:4rem;margin-bottom:1rem">🎉</div>
//         <h2 style="margin-bottom:0.5rem">It's a Match!</h2>
//         <p style="color:var(--text-secondary);margin-bottom:2rem">
//           You've used your ${PRICING.FREE_CONNECTIONS} free connections
//         </p>

//         <div style="background:var(--gradient);color:white;padding:2rem;border-radius:16px;margin-bottom:2rem">
//           <h3 style="margin:0 0 0.5rem 0;font-size:1.75rem">Unlimited for 1 Month</h3>
//           <div style="font-size:3.5rem;font-weight:800;margin:0.5rem 0">${PRICING.MONTHLY_UNLIMITED_WLD} WLD</div>
//           <div style="opacity:0.9">Unlimited connections for 30 days</div>
//         </div>

//         <div style="text-align:left;background:var(--bg-secondary);padding:1.25rem;border-radius:12px;margin-bottom:2rem">
//           <div style="display:flex;align-items:center;margin-bottom:0.75rem">
//             <span style="font-size:1.25rem;margin-right:0.5rem">✅</span>
//             <span>Unlimited connections for 30 days</span>
//           </div>
//           <div style="display:flex;align-items:center;margin-bottom:0.75rem">
//             <span style="font-size:1.25rem;margin-right:0.5rem">✅</span>
//             <span>Unlimited messages</span>
//           </div>
//           <div style="display:flex;align-items:center;margin-bottom:0.75rem">
//             <span style="font-size:1.25rem;margin-right:0.5rem">✅</span>
//             <span>Premium badge</span>
//           </div>
//           <div style="display:flex;align-items:center">
//             <span style="font-size:1.25rem;margin-right:0.5rem">✅</span>
//             <span>Priority support</span>
//           </div>
//         </div>

//         <button class="btn" onclick="window.app.purchaseSubscription('${matchId}')" style="margin-bottom:1rem">
//           🌍 Pay ${PRICING.MONTHLY_UNLIMITED_WLD} WLD
//         </button>

//         <button onclick="document.getElementById('subscription-overlay').remove();window.app.showExplore()" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;font-size:1rem">
//           Maybe Later
//         </button>
//       </div>
//     `;

//     document.body.appendChild(overlay);
//   }

//   async purchaseSubscription(matchId) {
//     try {
//       if (!MiniKit.isInstalled()) {
//         Toast.error('Please open this app in World App');
//         return;
//       }

//       Toast.info('Preparing payment...');

//       const res = await fetch(`${API}/subscription/initiate`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = await res.json();

//       if (!data.success) {
//         Toast.error(data.error || 'Payment initiation failed');
//         return;
//       }

//       const payload = {
//         reference: data.reference,
//         to: WLD_RECEIVING_WALLET,
//         tokens: [{
//           symbol: Tokens.WLD,
//           token_amount: tokenToDecimals(PRICING.MONTHLY_UNLIMITED_WLD, Tokens.WLD).toString()
//         }],
//         description: `${APP_NAME} - 1 Month Unlimited`
//       };

//       const { finalPayload } = await MiniKit.commandsAsync.pay(payload);

//       if (finalPayload.status === 'success') {
//         document.getElementById('subscription-overlay').innerHTML = `
//           <div class="card" style="max-width:400px;text-align:center">
//             <div class="spinner" style="margin:0 auto 1rem"></div>
//             <h3>Verifying payment...</h3>
//           </div>
//         `;

//         await this.verifySubscription(data.reference, finalPayload.transaction_id, matchId);
//       } else {
//         Toast.warning('Payment cancelled');
//         document.getElementById('subscription-overlay')?.remove();
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       Toast.error('Payment failed. Please try again.');
//       document.getElementById('subscription-overlay')?.remove();
//     }
//   }

//   async verifySubscription(reference, transactionId, matchId, attempts = 0) {
//     try {
//       const res = await fetch(`${API}/subscription/verify`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ reference, transactionId })
//       });

//       const data = await res.json();

//       if (data.success && data.verified) {
//         document.getElementById('subscription-overlay').innerHTML = `
//           <div class="card" style="max-width:400px;text-align:center">
//             <div style="font-size:4rem;margin-bottom:1rem">✅</div>
//             <h2 style="color:var(--success)">Subscription Active!</h2>
//             <p style="color:var(--text-secondary);margin:1rem 0 2rem 0">
//               Unlimited connections for 30 days!
//             </p>
//             <button class="btn" onclick="window.app.handleSubscriptionSuccess('${matchId}')">
//               Continue
//             </button>
//           </div>
//         `;
//       } else if (attempts < 30) {
//         setTimeout(() => this.verifySubscription(reference, transactionId, matchId, attempts + 1), 2000);
//       } else {
//         Toast.error('Payment verification timeout');
//         document.getElementById('subscription-overlay')?.remove();
//       }
//     } catch (error) {
//       console.error('Verify error:', error);
//       Toast.error('Verification failed');
//       document.getElementById('subscription-overlay')?.remove();
//     }
//   }

//   async handleSubscriptionSuccess(matchId) {
//     document.getElementById('subscription-overlay')?.remove();
//     if (matchId) {
//       await this.useConnection(matchId);
//     }
//     Toast.success('Subscription activated! Enjoy unlimited connections!');
//     this.showWallet();
//   }

//   async useConnection(matchId) {
//     try {
//       await fetch(`${API}/subscription/use-connection`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ matchId })
//       });
//     } catch (error) {
//       console.error('Connection error:', error);
//     }
//   }

//   async showChat() {
//     this.currentPage = 'chat';

//     try {
//       const res = await fetch(`${API}/chat/matches`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const data = await res.json();

//       document.getElementById('app').innerHTML = `
//         <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//           <div style="max-width:600px;margin:0 auto;padding:1rem">
//             <h1 style="font-size:2rem;margin-bottom:1.5rem">💬 Messages</h1>

//             ${data.matches && data.matches.length > 0 ? `
//               <div style="display:flex;flex-direction:column;gap:1rem">
//                 ${data.matches.map(match => `
//                   <div class="card" style="cursor:pointer" onclick="window.app.openChat('${match.matchId}', '${match.profile.name}')">
//                     <div style="display:flex;align-items:center;gap:1rem">
//                       <div style="width:60px;height:60px;background:var(--gradient);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:white;font-weight:700">
//                         ${match.profile.name.charAt(0)}
//                       </div>
//                       <div style="flex:1">
//                         <h3 style="margin:0;font-size:1.125rem">${match.profile.name}, ${match.profile.age}</h3>
//                         <p style="margin:0.25rem 0 0 0;color:var(--text-secondary);font-size:0.875rem">
//                           ${match.lastMessage ? match.lastMessage.content : 'Start chatting...'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 `).join('')}
//               </div>
//             ` : `
//               <div style="text-align:center;padding:3rem 1rem">
//                 <div style="font-size:4rem;margin-bottom:1rem">💬</div>
//                 <h2 style="margin-bottom:0.5rem;color:var(--text-primary)">No messages yet</h2>
//                 <p style="color:var(--text-secondary);margin-bottom:2rem">Start swiping to get matches!</p>
//                 <button class="btn" onclick="window.app.navigate('explore')">Find Matches</button>
//               </div>
//             `}
//           </div>
//         </div>
//       `;
//     } catch (error) {
//       console.error('Chat error:', error);
//       Toast.error('Failed to load chats');
//     }

//     this.renderNav();
//   }

//   async openChat(matchId, name) {
//     this.currentMatchId = matchId;
//     this.currentMatchName = name;

//     try {
//       const res = await fetch(`${API}/chat/messages/${matchId}`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const data = await res.json();

//       document.getElementById('app').innerHTML = `
//         <div style="height:100vh;display:flex;flex-direction:column;background:var(--bg-secondary)">
//           <div style="background:var(--bg-primary);padding:1rem;border-bottom:1px solid var(--border-color);display:flex;align-items:center;gap:1rem">
//             <button onclick="window.app.navigate('chat')" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text-primary)">←</button>
//             <div style="width:40px;height:40px;background:var(--gradient);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700">
//               ${name.charAt(0)}
//             </div>
//             <h2 style="margin:0;font-size:1.25rem">${name}</h2>
//           </div>

//           <div id="messageContainer" style="flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:0.5rem">
//             ${data.messages && data.messages.length > 0 ? data.messages.map(msg => `
//               <div style="display:flex;${msg.isMine ? 'justify-content:flex-end' : 'justify-content:flex-start'}">
//                 <div class="message-bubble ${msg.isMine ? 'mine' : 'theirs'}">
//                   ${msg.content}
//                   ${msg.imageUrl ? `<img src="${msg.imageUrl}" class="message-image" onclick="window.open('${msg.imageUrl}')" />` : ''}
//                   <div style="font-size:0.75rem;opacity:0.7;margin-top:0.25rem">
//                     ${new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                   </div>
//                 </div>
//               </div>
//             `).join('') : '<p style="text-align:center;color:var(--text-secondary);margin:auto">Start your conversation...</p>'}
//           </div>

//           <div style="background:var(--bg-primary);border-top:1px solid var(--border-color);padding:1rem">
//             ${this.showEmojiPicker ? `
//               <div class="emoji-picker-container" id="emojiPicker">
//                 <div style="background:var(--bg-primary);border:1px solid var(--border-color);border-radius:12px;padding:1rem;max-width:300px;display:grid;grid-template-columns:repeat(8,1fr);gap:0.5rem">
//                   ${['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺️','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱'].map(emoji => `
//                     <button onclick="window.app.insertEmoji('${emoji}')" style="background:none;border:none;font-size:1.5rem;cursor:pointer;padding:0.25rem;border-radius:4px;transition:all 0.2s" onmouseover="this.style.background='var(--bg-secondary)'" onmouseout="this.style.background='none'">
//                       ${emoji}
//                     </button>
//                   `).join('')}
//                 </div>
//               </div>
//             ` : ''}

//             <div style="display:flex;gap:0.5rem;align-items:center">
//               <input type="file" id="imageInput" accept="image/*" style="display:none" onchange="window.app.handleImageSelect(event)" />
//               <button onclick="document.getElementById('imageInput').click()" class="image-upload-btn" title="Upload image">📷</button>
//               <button onclick="window.app.toggleEmojiPicker()" class="image-upload-btn" title="Add emoji">😊</button>
//               <input type="text" id="messageInput" placeholder="Type a message..." style="flex:1" onkeypress="if(event.key==='Enter') window.app.sendMessage()" />
//               <button onclick="window.app.sendMessage()" class="btn" style="width:auto;padding:0.875rem 1.5rem">Send</button>
//             </div>
//           </div>
//         </div>
//       `;

//       const container = document.getElementById('messageContainer');
//       container.scrollTop = container.scrollHeight;
//     } catch (error) {
//       console.error('Open chat error:', error);
//       Toast.error('Failed to load messages');
//     }
//   }

//   toggleEmojiPicker() {
//     this.showEmojiPicker = !this.showEmojiPicker;
//     this.openChat(this.currentMatchId, this.currentMatchName);
//   }

//   insertEmoji(emoji) {
//     const input = document.getElementById('messageInput');
//     input.value += emoji;
//     input.focus();
//   }

//   handleImageSelect(event) {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         Toast.error('Image too large. Max 5MB.');
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.selectedImage = e.target.result;
//         Toast.success('Image selected! Send your message.');
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   async sendMessage() {
//     const input = document.getElementById('messageInput');
//     const content = input.value.trim();

//     if (!content && !this.selectedImage) return;

//     try {
//       const res = await fetch(`${API}/chat/send`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           matchId: this.currentMatchId,
//           content: content,
//           imageUrl: this.selectedImage
//         })
//       });

//       const data = await res.json();

//       if (data.success) {
//         input.value = '';
//         this.selectedImage = null;
//         this.showEmojiPicker = false;
//         this.openChat(this.currentMatchId, this.currentMatchName);
//       } else {
//         Toast.error('Failed to send message');
//       }
//     } catch (error) {
//       console.error('Send error:', error);
//       Toast.error('Failed to send message');
//     }
//   }

//   async showWallet() {
//     this.currentPage = 'wallet';

//     try {
//       const res = await fetch(`${API}/subscription/status`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const status = await res.json();

//       document.getElementById('app').innerHTML = `
//         <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//           <div style="max-width:600px;margin:0 auto;padding:1rem">

//             <h1 style="font-size:2rem;margin-bottom:1.5rem">💳 Wallet</h1>

//             ${status.hasActiveSubscription ? `
//               <div class="card" style="margin-bottom:1.5rem;background:var(--gradient);color:white;text-align:center;padding:2rem">
//                 <div style="font-size:4rem;margin-bottom:1rem">💎</div>
//                 <h2 style="margin:0 0 0.5rem 0;color:white">Premium Active!</h2>
//                 <p style="margin:0;opacity:0.9">Unlimited connections until ${new Date(status.subscriptionExpiresAt).toLocaleDateString()}</p>
//               </div>
//             ` : `
//               <div class="card" style="margin-bottom:1.5rem;background:var(--gradient);color:white;text-align:center;padding:2rem;cursor:pointer" onclick="window.app.showSubscriptionOffer(null)">
//                 <div style="font-size:4rem;margin-bottom:1rem">🔒</div>
//                 <h2 style="margin:0 0 0.5rem 0;color:white">Get Unlimited</h2>
//                 <div style="font-size:2.5rem;font-weight:800;margin:0.5rem 0">${PRICING.MONTHLY_UNLIMITED_WLD} WLD</div>
//                 <p style="margin:0;opacity:0.9">30 days unlimited connections</p>
//               </div>
//             `}

//             <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem">
//               <div class="card" style="text-align:center">
//                 <div style="font-size:2.5rem;margin-bottom:0.5rem">${status.hasActiveSubscription ? '♾️' : '🔗'}</div>
//                 <h3 style="margin:0;font-size:1.5rem">${status.hasActiveSubscription ? 'Unlimited' : status.freeConnectionsRemaining}</h3>
//                 <p style="margin:0.25rem 0 0 0;color:var(--text-secondary)">Connections</p>
//               </div>

//               <div class="card" style="text-align:center">
//                 <div style="font-size:2.5rem;margin-bottom:0.5rem">📊</div>
//                 <h3 style="margin:0;font-size:1.5rem">${status.totalConnectionsUsed || 0}</h3>
//                 <p style="margin:0.25rem 0 0 0;color:var(--text-secondary)">Total Used</p>
//               </div>
//             </div>

//             <div class="card" style="background:var(--bg-tertiary)">
//               <h3 style="margin:0 0 1rem 0">🌍 World ID Verified</h3>
//               <p style="margin:0;color:var(--text-secondary)">Your identity is verified and secure</p>
//             </div>
//           </div>
//         </div>
//       `;
//     } catch (error) {
//       console.error('Wallet error:', error);
//       Toast.error('Failed to load wallet');
//     }

//     this.renderNav();
//   }

//   async showProfile() {
//     this.currentPage = 'profile';

//     document.getElementById('app').innerHTML = `
//       <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//         <div style="max-width:600px;margin:0 auto;padding:1rem">

//           <h1 style="font-size:2rem;margin-bottom:1.5rem">👤 Profile</h1>

//           <div class="card" style="margin-bottom:1.5rem;text-align:center">
//             <div class="profile-image" style="margin:1rem auto">
//               ${this.user.name ? this.user.name.charAt(0) : '?'}
//             </div>
//             <h2 style="margin:0.5rem 0">${this.user.name || 'User'}</h2>
//             <p style="color:var(--text-secondary);margin:0">🌍 World ID Verified</p>
//           </div>

//           <div class="card" style="margin-bottom:1.5rem">
//             <h3 style="margin:0 0 1rem 0">Theme</h3>
//             <div class="theme-toggle">
//               <button class="theme-btn ${this.themeManager.getCurrentTheme() === THEMES.LIGHT ? 'active' : ''}" onclick="window.app.setTheme('${THEMES.LIGHT}')">
//                 ☀️ Light
//               </button>
//               <button class="theme-btn ${this.themeManager.getCurrentTheme() === THEMES.DARK ? 'active' : ''}" onclick="window.app.setTheme('${THEMES.DARK}')">
//                 🌙 Dark
//               </button>
//               <button class="theme-btn ${this.themeManager.getCurrentTheme() === THEMES.SYSTEM ? 'active' : ''}" onclick="window.app.setTheme('${THEMES.SYSTEM}')">
//                 💻 System
//               </button>
//             </div>
//           </div>

//           <button class="btn btn-danger" onclick="window.app.logout()">
//             Logout
//           </button>
//         </div>
//       </div>
//     `;

//     this.renderNav();
//   }

//   setTheme(theme) {
//     this.themeManager.setTheme(theme);
//     Toast.success(`Theme changed to ${theme}`);
//     this.showProfile();
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.token = null;
//     this.user = null;
//     Toast.info('Logged out successfully');
//     this.showAuth();
//   }

//   navigate(page) {
//     const pages = {
//       home: () => this.showHome(),
//       explore: () => this.showExplore(),
//       chat: () => this.showChat(),
//       wallet: () => this.showWallet(),
//       profile: () => this.showProfile()
//     };

//     if (pages[page]) {
//       pages[page]();
//     }
//   }

//   renderNav() {
//     const nav = document.createElement('nav');
//     nav.className = 'bottom-nav';
//     nav.innerHTML = `
//       <button class="nav-item ${this.currentPage === 'home' ? 'active' : ''}" onclick="window.app.navigate('home')">
//         <span>🏠</span>
//         <div>Home</div>
//       </button>
//       <button class="nav-item ${this.currentPage === 'explore' ? 'active' : ''}" onclick="window.app.navigate('explore')">
//         <span>🔍</span>
//         <div>Explore</div>
//       </button>
//       <button class="nav-item ${this.currentPage === 'wallet' ? 'active' : ''}" onclick="window.app.navigate('wallet')">
//         <span>💎</span>
//         <div>Wallet</div>
//       </button>
//       <button class="nav-item ${this.currentPage === 'chat' ? 'active' : ''}" onclick="window.app.navigate('chat')">
//         <span>💬</span>
//         <div>Chat</div>
//       </button>
//       <button class="nav-item ${this.currentPage === 'profile' ? 'active' : ''}" onclick="window.app.navigate('profile')">
//         <span>👤</span>
//         <div>Profile</div>
//       </button>
//     `;

//     const existing = document.querySelector('.bottom-nav');
//     if (existing) existing.remove();
//     document.body.appendChild(nav);
//   }
// }

// window.app = new App();



// import './style.css';
// import { MiniKit, tokenToDecimals, Tokens, VerificationLevel } from '@worldcoin/minikit-js';
// import { API, APP_NAME, WORLD_APP_ID, WLD_RECEIVING_WALLET, PRICING } from './config.js';
// import { ThemeManager, THEMES } from './theme.js';
// import { Toast } from './toast.js';

// // Initialize MiniKit
// MiniKit.install(WORLD_APP_ID);

// class App {
//   constructor() {
//     this.token = localStorage.getItem('token');
//     this.user = null;
//     this.currentPage = 'auth';
//     this.themeManager = new ThemeManager();
//     this.selectedImage = null;
//     this.showEmojiPicker = false;

//     if (this.token) {
//       this.init();
//     } else {
//       this.showAuth();
//     }
//   }

//   async init() {
//     try {
//       const res = await fetch(`${API}/auth/me`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       if (res.ok) {
//         this.user = await res.json();
//         if (this.user.profile_completed) {
//           this.showHome();
//         } else {
//           this.showProfileSetup();
//         }
//       } else {
//         this.logout();
//       }
//     } catch (error) {
//       console.error('Init error:', error);
//       this.logout();
//     }
//   }

//   showAuth() {
//     this.currentPage = 'auth';
//     document.getElementById('app').innerHTML = `
//       <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem;background:var(--bg-secondary)">
//         <div class="card" style="max-width:400px;width:100%;text-align:center">
//           <div style="width:120px;height:120px;background:var(--gradient);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:4rem;margin:0 auto 1.5rem;box-shadow:0 8px 16px var(--shadow)">
//             💕
//           </div>
//           <h1 style="font-size:2.5rem;margin-bottom:0.5rem;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:800">
//             ${APP_NAME}
//           </h1>
//           <p style="color:var(--text-secondary);margin-bottom:2rem;font-size:1.1rem">
//             Verified connections, genuine hearts
//           </p>
//           <button class="btn" onclick="window.app.verifyWithWorldID()">
//             🌍 Sign in with World ID
//           </button>
//           <p style="margin-top:1.5rem;font-size:0.875rem;color:var(--text-tertiary)">
//             One person, one profile. Verified humans only.
//           </p>
//         </div>
//       </div>
//     `;
//   }

//   // async verifyWithWorldID() {
//   //   try {
//   //     console.log('🔵 Starting World ID verification...');

//   //     if (!MiniKit.isInstalled()) {
//   //       Toast.error('Please open this app in World App');
//   //       return;
//   //     }

//   //     Toast.info('Opening World ID verification...');

//   //     const { finalPayload } = await MiniKit.commandsAsync.verify({
//   //       action: 'signin',
//   //       signal: '',
//   //       verification_level: VerificationLevel.Device
//   //     });

//   //     console.log('🔵 World ID response:', finalPayload.status);

//   //     if (finalPayload.status === 'success') {
//   //       Toast.info('Verifying your World ID...');

//   //       const res = await fetch(`${API}/auth/verify`, {
//   //         method: 'POST',
//   //         headers: { 'Content-Type': 'application/json' },
//   //         body: JSON.stringify(finalPayload)
//   //       });

//   //       const data = await res.json();
//   //       console.log('🔵 Backend response:', data.success);

//   //       if (data.success) {
//   //         this.token = data.token;
//   //         this.user = data.user;
//   //         localStorage.setItem('token', this.token);

//   //         Toast.success('Welcome to Elite Connect!');

//   //         // FIXED: Add delay before navigation to ensure state is updated
//   //         setTimeout(() => {
//   //           console.log('🔵 Navigating...', data.user.profile_completed ? 'to home' : 'to profile setup');
//   //           if (data.user && data.user.profile_completed) {
//   //             this.showHome();
//   //           } else {
//   //             this.showProfileSetup();
//   //           }
//   //         }, 500);
//   //       } else {
//   //         Toast.error(data.error || 'Verification failed');
//   //       }
//   //     } else if (finalPayload.status === 'error') {
//   //       Toast.error('Verification failed');
//   //     } else {
//   //       Toast.warning('Verification cancelled');
//   //     }
//   //   } catch (error) {
//   //     console.error('❌ Verification error:', error);
//   //     Toast.error('Verification failed. Please try again.');
//   //   }
//   // }
//   // Replace your verifyWithWorldID function with this DEBUG version
//   // This will help us see EXACTLY where it's failing

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

//           console.log('🔵 [9] Setting up navigation timeout...');
//           console.log('🔵 [9.1] Profile completed?', data.user.profile_completed);

//           setTimeout(() => {
//             console.log('🔵 [10] Timeout executed, navigating...');
//             if (data.user && data.user.profile_completed) {
//               console.log('🔵 [10.1] Navigating to home');
//               this.showHome();
//             } else {
//               console.log('🔵 [10.2] Navigating to profile setup');
//               this.showProfileSetup();
//             }
//             console.log('🔵 [11] Navigation complete');
//           }, 500);

//           console.log('🔵 [9.2] Timeout set, waiting...');
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


//   showProfileSetup() {
//     this.currentPage = 'setup';
//     document.getElementById('app').innerHTML = `
//       <div style="padding:2rem 1rem;max-width:600px;margin:0 auto">
//         <h1 style="font-size:2rem;margin-bottom:0.5rem">Create Your Profile</h1>
//         <p style="color:var(--text-secondary);margin-bottom:2rem">Tell us about yourself</p>
        
//         <form id="profileForm" style="display:flex;flex-direction:column;gap:1.5rem">
//           <div>
//             <label style="display:block;margin-bottom:0.5rem;font-weight:600;color:var(--text-primary)">Name</label>
//             <input type="text" name="name" required placeholder="Your name" />
//           </div>
          
//           <div>
//             <label style="display:block;margin-bottom:0.5rem;font-weight:600;color:var(--text-primary)">Age</label>
//             <input type="number" name="age" min="18" max="100" required placeholder="18" />
//           </div>
          
//           <div>
//             <label style="display:block;margin-bottom:0.5rem;font-weight:600;color:var(--text-primary)">Gender</label>
//             <select name="gender" required>
//               <option value="">Select gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="non-binary">Non-binary</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
          
//           <div>
//             <label style="display:block;margin-bottom:0.5rem;font-weight:600;color:var(--text-primary)">Bio</label>
//             <textarea name="bio" rows="4" placeholder="Tell us about yourself..."></textarea>
//           </div>
          
//           <button type="submit" class="btn">Complete Profile</button>
//         </form>
//       </div>
//     `;

//     document.getElementById('profileForm').onsubmit = (e) => this.submitProfile(e);
//   }

//   async submitProfile(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData);

//     try {
//       Toast.info('Creating your profile...');

//       const res = await fetch(`${API}/profile/create`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await res.json();

//       if (result.success) {
//         this.user.profile_completed = true;
//         Toast.success('Profile created successfully!');
//         this.showHome();
//       } else {
//         Toast.error(result.error || 'Failed to create profile');
//       }
//     } catch (error) {
//       console.error('Profile error:', error);
//       Toast.error('Failed to create profile');
//     }
//   }

//   showHome() {
//     this.currentPage = 'home';
//     document.getElementById('app').innerHTML = `
//       <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//         <div style="max-width:600px;margin:0 auto;padding:1rem">
          
//           <div class="card" style="text-align:center;margin-bottom:1.5rem">
//             <div style="font-size:3rem;margin-bottom:0.5rem">💕</div>
//             <h1 style="font-size:1.75rem;margin:0 0 0.5rem 0">Welcome Back!</h1>
//             <p style="color:var(--text-secondary);margin:0">Ready to find your match?</p>
//           </div>

//           <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
//             <div class="card" style="text-align:center;cursor:pointer" onclick="window.app.navigate('explore')">
//               <div style="font-size:3rem;margin-bottom:0.5rem">🔍</div>
//               <h3 style="margin:0;font-size:1.25rem">Discover</h3>
//               <p style="margin:0.25rem 0 0 0;color:var(--text-secondary);font-size:0.875rem">Find profiles</p>
//             </div>
            
//             <div class="card" style="text-align:center;cursor:pointer" onclick="window.app.navigate('chat')">
//               <div style="font-size:3rem;margin-bottom:0.5rem">💬</div>
//               <h3 style="margin:0;font-size:1.25rem">Messages</h3>
//               <p style="margin:0.25rem 0 0 0;color:var(--text-secondary);font-size:0.875rem">Your chats</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;

//     this.renderNav();
//   }

//   async showExplore() {
//     this.currentPage = 'explore';

//     try {
//       const res = await fetch(`${API}/explore/profiles`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const data = await res.json();

//       if (!data.success || !data.profiles || data.profiles.length === 0) {
//         document.getElementById('app').innerHTML = `
//           <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary);display:flex;align-items:center;justify-content:center">
//             <div class="card" style="max-width:400px;text-align:center">
//               <div style="font-size:4rem;margin-bottom:1rem">😔</div>
//               <h2>No More Profiles</h2>
//               <p style="color:var(--text-secondary);margin:1rem 0">Check back later for more matches!</p>
//             </div>
//           </div>
//         `;
//       } else {
//         const profile = data.profiles[0];

//         document.getElementById('app').innerHTML = `
//           <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//             <div style="max-width:600px;margin:0 auto;padding:1rem">
              
//               <div class="profile-card">
//                 <div style="aspect-ratio:4/5;background:var(--gradient);display:flex;align-items:center;justify-content:center;font-size:8rem">
//                   ${profile.name ? profile.name.charAt(0) : '?'}
//                 </div>
                
//                 <div style="padding:1.5rem">
//                   <h2 style="font-size:2rem;margin:0 0 0.5rem 0">${profile.name}, ${profile.age}</h2>
//                   <p style="color:var(--text-secondary);margin:0 0 1rem 0">🌍 Verified Human</p>
                  
//                   ${profile.bio ? `<p style="margin:0 0 1rem 0">${profile.bio}</p>` : ''}
                  
//                   ${profile.interests && profile.interests.length > 0 ? `
//                     <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1rem">
//                       ${profile.interests.map(i => `
//                         <span style="background:var(--bg-tertiary);padding:0.5rem 1rem;border-radius:20px;font-size:0.875rem">${i}</span>
//                       `).join('')}
//                     </div>
//                   ` : ''}
                  
//                   <div style="display:flex;justify-content:center;gap:2rem;margin-top:2rem">
//                     <button class="action-btn pass" onclick="window.app.passProfile('${profile.id}')">
//                       ❌
//                     </button>
//                     <button class="action-btn like" onclick="window.app.likeProfile('${profile.id}')">
//                       ❤️
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;
//       }
//     } catch (error) {
//       console.error('Explore error:', error);
//       Toast.error('Failed to load profiles');
//     }

//     this.renderNav();
//   }

//   async likeProfile(profileId) {
//     try {
//       Toast.info('Sending like...');

//       const res = await fetch(`${API}/explore/like`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ profileId })
//       });

//       const data = await res.json();

//       if (data.success) {
//         if (data.matched) {
//           Toast.success('🎉 It\'s a match!');
//           this.showSubscriptionOffer(data.matchId);
//         } else {
//           Toast.success('Like sent!');
//           this.showExplore();
//         }
//       } else {
//         Toast.error('Failed to like profile');
//       }
//     } catch (error) {
//       console.error('Like error:', error);
//       Toast.error('Failed to like profile');
//     }
//   }

//   async passProfile(profileId) {
//     try {
//       await fetch(`${API}/explore/pass`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ profileId })
//       });

//       this.showExplore();
//     } catch (error) {
//       console.error('Pass error:', error);
//       Toast.error('Failed to pass profile');
//     }
//   }

//   async showSubscriptionOffer(matchId) {
//     try {
//       const res = await fetch(`${API}/subscription/status`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const status = await res.json();

//       if (status.canConnect) {
//         document.getElementById('app').innerHTML = `
//           <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem;background:var(--bg-secondary)">
//             <div class="card" style="max-width:400px;text-align:center">
//               <div style="font-size:5rem;margin-bottom:1rem">🎉</div>
//               <h1 style="font-size:2rem;margin-bottom:1rem">It's a Match!</h1>
//               <p style="color:var(--text-secondary);margin-bottom:2rem">
//                 ${status.hasActiveSubscription
//             ? 'Start chatting with your match!'
//             : `You have ${status.freeConnectionsRemaining} free connection${status.freeConnectionsRemaining > 1 ? 's' : ''} left`
//           }
//               </p>
//               <button class="btn" onclick="window.app.unlockChat('${matchId}')">
//                 Unlock Chat
//               </button>
//             </div>
//           </div>
//         `;
//       } else {
//         document.getElementById('app').innerHTML = `
//           <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem;background:var(--bg-secondary)">
//             <div class="card" style="max-width:400px;text-align:center">
//               <div style="font-size:5rem;margin-bottom:1rem">💎</div>
//               <h1 style="font-size:2rem;margin-bottom:1rem">Upgrade to Connect</h1>
//               <p style="color:var(--text-secondary);margin-bottom:1.5rem">
//                 You've used all ${PRICING.FREE_CONNECTIONS} free connections
//               </p>
//               <div style="background:var(--gradient);color:white;padding:2rem;border-radius:16px;margin-bottom:1.5rem">
//                 <div style="font-size:3rem;font-weight:800;margin-bottom:0.5rem">${PRICING.MONTHLY_UNLIMITED_WLD} WLD</div>
//                 <p style="margin:0;opacity:0.9">Unlimited connections for ${PRICING.MONTHLY_UNLIMITED_DAYS} days</p>
//               </div>
//               <button class="btn" onclick="window.app.purchaseSubscription('${matchId}')">
//                 Upgrade Now
//               </button>
//               <button class="btn btn-secondary" style="margin-top:1rem" onclick="window.app.showExplore()">
//                 Maybe Later
//               </button>
//             </div>
//           </div>
//         `;
//       }
//     } catch (error) {
//       console.error('Subscription offer error:', error);
//       Toast.error('Failed to load subscription info');
//     }
//   }

//   async purchaseSubscription(matchId) {
//     try {
//       if (!MiniKit.isInstalled()) {
//         Toast.error('Please open this app in World App');
//         return;
//       }

//       Toast.info('Initiating payment...');

//       const initRes = await fetch(`${API}/subscription/initiate`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const initData = await initRes.json();

//       if (!initData.success) {
//         Toast.error('Failed to initiate payment');
//         return;
//       }

//       const { finalPayload } = await MiniKit.commandsAsync.pay({
//         reference: initData.reference,
//         to: WLD_RECEIVING_WALLET,
//         tokens: [
//           {
//             symbol: Tokens.WLD,
//             token_amount: tokenToDecimals(PRICING.MONTHLY_UNLIMITED_WLD, Tokens.WLD).toString()
//           }
//         ],
//         description: 'Monthly Unlimited Subscription'
//       });

//       if (finalPayload.status === 'success') {
//         Toast.info('Verifying payment...');

//         const verifyRes = await fetch(`${API}/subscription/verify`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${this.token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             reference: initData.reference,
//             transactionId: finalPayload.transaction_id
//           })
//         });

//         const verifyData = await verifyRes.json();

//         if (verifyData.success && verifyData.verified) {
//           Toast.success('Payment successful! Welcome to Premium!');
//           if (matchId) {
//             this.unlockChat(matchId);
//           } else {
//             this.showWallet();
//           }
//         } else {
//           Toast.error('Payment verification failed');
//         }
//       } else {
//         Toast.warning('Payment cancelled');
//       }
//     } catch (error) {
//       console.error('Purchase error:', error);
//       Toast.error('Purchase failed. Please try again.');
//     }
//   }

//   async unlockChat(matchId) {
//     try {
//       Toast.info('Unlocking chat...');

//       const res = await fetch(`${API}/subscription/use-connection`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ matchId })
//       });

//       const data = await res.json();

//       if (data.success) {
//         Toast.success('Chat unlocked!');
//         this.showChat();
//       } else {
//         Toast.error(data.error || 'Failed to unlock chat');
//       }
//     } catch (error) {
//       console.error('Unlock chat error:', error);
//       Toast.error('Failed to unlock chat');
//     }
//   }

//   async showChat() {
//     this.currentPage = 'chat';

//     try {
//       const res = await fetch(`${API}/chat/matches`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const data = await res.json();

//       if (!data.success || !data.matches || data.matches.length === 0) {
//         document.getElementById('app').innerHTML = `
//           <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary);display:flex;align-items:center;justify-content:center">
//             <div class="card" style="max-width:400px;text-align:center">
//               <div style="font-size:4rem;margin-bottom:1rem">💬</div>
//               <h2>No Messages Yet</h2>
//               <p style="color:var(--text-secondary);margin:1rem 0">Start swiping to make connections!</p>
//               <button class="btn" onclick="window.app.navigate('explore')">Find Matches</button>
//             </div>
//           </div>
//         `;
//       } else {
//         document.getElementById('app').innerHTML = `
//           <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//             <div style="max-width:600px;margin:0 auto;padding:1rem">
              
//               <h1 style="font-size:2rem;margin-bottom:1.5rem">💬 Messages</h1>
              
//               <div style="display:flex;flex-direction:column;gap:1rem">
//                 ${data.matches.map(match => `
//                   <div class="card" style="cursor:pointer;display:flex;align-items:center;gap:1rem" onclick="window.app.openChat('${match.matchId}', '${match.profile.name}')">
//                     <div class="profile-image" style="width:60px;height:60px;font-size:1.5rem;margin:0">
//                       ${match.profile.name.charAt(0)}
//                     </div>
//                     <div style="flex:1">
//                       <h3 style="margin:0 0 0.25rem 0">${match.profile.name}, ${match.profile.age}</h3>
//                       ${match.lastMessage
//             ? `<p style="margin:0;color:var(--text-secondary);font-size:0.875rem">${match.lastMessage.content}</p>`
//             : `<p style="margin:0;color:var(--text-tertiary);font-size:0.875rem">Start a conversation</p>`
//           }
//                     </div>
//                   </div>
//                 `).join('')}
//               </div>
//             </div>
//           </div>
//         `;
//       }
//     } catch (error) {
//       console.error('Chat error:', error);
//       Toast.error('Failed to load chats');
//     }

//     this.renderNav();
//   }

//   async openChat(matchId, matchName) {
//     this.currentMatchId = matchId;
//     this.currentMatchName = matchName;

//     try {
//       const res = await fetch(`${API}/chat/messages/${matchId}`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const data = await res.json();

//       document.getElementById('app').innerHTML = `
//         <div style="height:100vh;display:flex;flex-direction:column;background:var(--bg-secondary)">
          
//           <div style="background:var(--bg-primary);padding:1rem;border-bottom:1px solid var(--border-color);display:flex;align-items:center;gap:1rem">
//             <button onclick="window.app.showChat()" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text-primary)">←</button>
//             <div class="profile-image" style="width:40px;height:40px;font-size:1.25rem;margin:0">
//               ${matchName.charAt(0)}
//             </div>
//             <h2 style="margin:0;flex:1">${matchName}</h2>
//           </div>
          
//           <div id="messages" style="flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:0.5rem">
//             ${data.messages && data.messages.length > 0
//           ? data.messages.map(msg => `
//                 <div class="message-bubble ${msg.isMine ? 'mine' : 'theirs'}">
//                   ${msg.content}
//                   ${msg.imageUrl ? `<img src="${msg.imageUrl}" class="message-image" />` : ''}
//                 </div>
//               `).join('')
//           : '<div style="text-align:center;color:var(--text-tertiary);margin:auto">Send a message to start chatting!</div>'
//         }
//           </div>
          
//           <div style="background:var(--bg-primary);padding:1rem;border-top:1px solid var(--border-color);display:flex;gap:0.5rem;align-items:center">
//             <input type="text" id="messageInput" placeholder="Type a message..." style="flex:1" onkeypress="if(event.key==='Enter')window.app.sendMessage()" />
//             <button class="btn" onclick="window.app.sendMessage()">Send</button>
//           </div>
//         </div>
//       `;

//       setTimeout(() => {
//         const container = document.getElementById('messages');
//         container.scrollTop = container.scrollHeight;
//       }, 100);

//     } catch (error) {
//       console.error('Open chat error:', error);
//       Toast.error('Failed to load messages');
//     }
//   }

//   async sendMessage() {
//     const input = document.getElementById('messageInput');
//     const content = input.value.trim();

//     if (!content && !this.selectedImage) return;

//     try {
//       const res = await fetch(`${API}/chat/send`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${this.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           matchId: this.currentMatchId,
//           content: content,
//           imageUrl: this.selectedImage
//         })
//       });

//       const data = await res.json();

//       if (data.success) {
//         input.value = '';
//         this.selectedImage = null;
//         this.showEmojiPicker = false;
//         this.openChat(this.currentMatchId, this.currentMatchName);
//       } else {
//         Toast.error('Failed to send message');
//       }
//     } catch (error) {
//       console.error('Send error:', error);
//       Toast.error('Failed to send message');
//     }
//   }

//   async showWallet() {
//     this.currentPage = 'wallet';

//     try {
//       const res = await fetch(`${API}/subscription/status`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const status = await res.json();

//       document.getElementById('app').innerHTML = `
//         <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//           <div style="max-width:600px;margin:0 auto;padding:1rem">
            
//             <h1 style="font-size:2rem;margin-bottom:1.5rem">💳 Wallet</h1>
            
//             ${status.hasActiveSubscription ? `
//               <div class="card" style="margin-bottom:1.5rem;background:var(--gradient);color:white;text-align:center;padding:2rem">
//                 <div style="font-size:4rem;margin-bottom:1rem">💎</div>
//                 <h2 style="margin:0 0 0.5rem 0;color:white">Premium Active!</h2>
//                 <p style="margin:0;opacity:0.9">Unlimited connections until ${new Date(status.subscriptionExpiresAt).toLocaleDateString()}</p>
//               </div>
//             ` : `
//               <div class="card" style="margin-bottom:1.5rem;background:var(--gradient);color:white;text-align:center;padding:2rem;cursor:pointer" onclick="window.app.showSubscriptionOffer(null)">
//                 <div style="font-size:4rem;margin-bottom:1rem">🔒</div>
//                 <h2 style="margin:0 0 0.5rem 0;color:white">Get Unlimited</h2>
//                 <div style="font-size:2.5rem;font-weight:800;margin:0.5rem 0">${PRICING.MONTHLY_UNLIMITED_WLD} WLD</div>
//                 <p style="margin:0;opacity:0.9">30 days unlimited connections</p>
//               </div>
//             `}
            
//             <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem">
//               <div class="card" style="text-align:center">
//                 <div style="font-size:2.5rem;margin-bottom:0.5rem">${status.hasActiveSubscription ? '♾️' : '🔗'}</div>
//                 <h3 style="margin:0;font-size:1.5rem">${status.hasActiveSubscription ? 'Unlimited' : status.freeConnectionsRemaining}</h3>
//                 <p style="margin:0.25rem 0 0 0;color:var(--text-secondary)">Connections</p>
//               </div>
              
//               <div class="card" style="text-align:center">
//                 <div style="font-size:2.5rem;margin-bottom:0.5rem">📊</div>
//                 <h3 style="margin:0;font-size:1.5rem">${status.totalConnectionsUsed || 0}</h3>
//                 <p style="margin:0.25rem 0 0 0;color:var(--text-secondary)">Total Used</p>
//               </div>
//             </div>
            
//             <div class="card" style="background:var(--bg-tertiary)">
//               <h3 style="margin:0 0 1rem 0">🌍 World ID Verified</h3>
//               <p style="margin:0;color:var(--text-secondary)">Your identity is verified and secure</p>
//             </div>
//           </div>
//         </div>
//       `;
//     } catch (error) {
//       console.error('Wallet error:', error);
//       Toast.error('Failed to load wallet');
//     }

//     this.renderNav();
//   }

//   async showProfile() {
//     this.currentPage = 'profile';

//     try {
//       const profileRes = await fetch(`${API}/profile/me`, {
//         headers: { 'Authorization': `Bearer ${this.token}` }
//       });

//       const profileData = await profileRes.json();
//       const profile = profileData.profile || {};

//       document.getElementById('app').innerHTML = `
//         <div style="padding-bottom:85px;min-height:100vh;background:var(--bg-secondary)">
//           <div style="max-width:600px;margin:0 auto;padding:1rem">
            
//             <h1 style="font-size:2rem;margin-bottom:1.5rem">👤 Profile</h1>
            
//             <div class="card" style="margin-bottom:1.5rem;text-align:center">
//               <div class="profile-image" style="margin:1rem auto">
//                 ${profile.name ? profile.name.charAt(0) : '?'}
//               </div>
//               <h2 style="margin:0.5rem 0">${profile.name || 'User'}</h2>
//               <p style="color:var(--text-secondary);margin:0">🌍 World ID Verified</p>
//             </div>
            
//             <div class="card" style="margin-bottom:1.5rem">
//               <h3 style="margin:0 0 1rem 0">Theme</h3>
//               <div class="theme-toggle">
//                 <button class="theme-btn ${this.themeManager.getCurrentTheme() === THEMES.LIGHT ? 'active' : ''}" onclick="window.app.setTheme('${THEMES.LIGHT}')">
//                   ☀️ Light
//                 </button>
//                 <button class="theme-btn ${this.themeManager.getCurrentTheme() === THEMES.DARK ? 'active' : ''}" onclick="window.app.setTheme('${THEMES.DARK}')">
//                   🌙 Dark
//                 </button>
//                 <button class="theme-btn ${this.themeManager.getCurrentTheme() === THEMES.SYSTEM ? 'active' : ''}" onclick="window.app.setTheme('${THEMES.SYSTEM}')">
//                   💻 System
//                 </button>
//               </div>
//             </div>
            
//             <button class="btn btn-danger" onclick="window.app.logout()">
//               Logout
//             </button>
//           </div>
//         </div>
//       `;
//     } catch (error) {
//       console.error('Profile error:', error);
//       Toast.error('Failed to load profile');
//     }

//     this.renderNav();
//   }

//   setTheme(theme) {
//     this.themeManager.setTheme(theme);
//     Toast.success(`Theme changed to ${theme}`);
//     this.showProfile();
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.token = null;
//     this.user = null;
//     Toast.info('Logged out successfully');
//     this.showAuth();
//   }

//   navigate(page) {
//     const pages = {
//       home: () => this.showHome(),
//       explore: () => this.showExplore(),
//       chat: () => this.showChat(),
//       wallet: () => this.showWallet(),
//       profile: () => this.showProfile()
//     };

//     if (pages[page]) {
//       pages[page]();
//     }
//   }

//   renderNav() {
//     const nav = document.createElement('nav');
//     nav.className = 'bottom-nav';
//     nav.innerHTML = `
//       <button class="nav-item ${this.currentPage === 'home' ? 'active' : ''}" onclick="window.app.navigate('home')">
//         <span>🏠</span>
//         <div>Home</div>
//       </button>
//       <button class="nav-item ${this.currentPage === 'explore' ? 'active' : ''}" onclick="window.app.navigate('explore')">
//         <span>🔍</span>
//         <div>Explore</div>
//       </button>
//       <button class="nav-item ${this.currentPage === 'wallet' ? 'active' : ''}" onclick="window.app.navigate('wallet')">
//         <span>💎</span>
//         <div>Wallet</div>
//       </button>
//       <button class="nav-item ${this.currentPage === 'chat' ? 'active' : ''}" onclick="window.app.navigate('chat')">
//         <span>💬</span>
//         <div>Chat</div>
//       </button>
//       <button class="nav-item ${this.currentPage === 'profile' ? 'active' : ''}" onclick="window.app.navigate('profile')">
//         <span>👤</span>
//         <div>Profile</div>
//       </button>
//     `;

//     const existing = document.querySelector('.bottom-nav');
//     if (existing) existing.remove();
//     document.body.appendChild(nav);
//   }
// }

// window.app = new App();


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
// // Force rebuild 1765800414


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