// import React, { useState, useEffect } from 'react'
// import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js'
// import './App.css'

// // IMPORTANT: Update this with your backend URL!
// const API_URL = 'https://elite-connect-backend-ktv9.onrender.com/api'

// function App() {
//   const [loading, setLoading] = useState(true)
//   const [isWorldApp, setIsWorldApp] = useState(false)
//   const [authenticated, setAuthenticated] = useState(false)
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     console.log('🎬 App Starting...')
    
//     // Check if in World App
//     setTimeout(() => {
//       const installed = MiniKit.isInstalled()
//       console.log('✅ MiniKit installed:', installed)
//       setIsWorldApp(installed)
//       setLoading(false)
//     }, 1000)
//   }, [])

//   const handleSignIn = async () => {
//     try {
//       console.log('🌍 Signing in with World ID...')
      
//       const { finalPayload } = await MiniKit.commandsAsync.verify({
//         action: 'login',
//         signal: '',
//         verification_level: VerificationLevel.Device
//       })

//       console.log('📦 Payload:', finalPayload)

//       if (finalPayload.status === 'success') {
//         // Send to backend
//         const response = await fetch(`${API_URL}/api/auth/verify`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             payload: finalPayload,
//             action: 'login'
//           })
//         })

//         const data = await response.json()
//         console.log('✅ Backend response:', data)

//         if (data.success) {
//           setAuthenticated(true)
//           setUser(data.user)
//           localStorage.setItem('token', data.token)
//         } else {
//           alert('Verification failed: ' + data.error)
//         }
//       }
//     } catch (error) {
//       console.error('❌ Error:', error)
//       alert('Error: ' + error.message)
//     }
//   }

//   // Loading screen
//   if (loading) {
//     return (
//       <div className="container">
//         <div className="card">
//           <div className="logo pulse">💕</div>
//           <h1>Elite Connect</h1>
//           <p>Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   // Not in World App
//   if (!isWorldApp) {
//     return (
//       <div className="container">
//         <div className="card">
//           <div className="logo">🌍</div>
//           <h1>Open in World App</h1>
//           <p>This app only works inside World App</p>
//           <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
//             <p><strong>To test:</strong></p>
//             <ol style={{ textAlign: 'left', marginTop: '1rem' }}>
//               <li>Deploy to Vercel</li>
//               <li>Update World Portal with Vercel URL</li>
//               <li>Scan QR code with World App</li>
//             </ol>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Authenticated - Home screen
//   if (authenticated) {
//     return (
//       <div className="container">
//         <div className="card">
//           <div className="logo">✅</div>
//           <h1>Welcome!</h1>
//           <p>You're signed in with World ID</p>
//           <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
//             User: {user?.nullifier_hash?.substring(0, 10)}...
//           </p>
//           <button 
//             className="btn"
//             onClick={() => {
//               setAuthenticated(false)
//               setUser(null)
//               localStorage.removeItem('token')
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // Login screen
//   return (
//     <div className="container">
//       <div className="card">
//         <div className="logo pulse">💕</div>
//         <h1>Elite Connect</h1>
//         <p>Verified connections, genuine hearts</p>
//         <button className="btn" onClick={handleSignIn}>
//           🌍 Sign in with World ID
//         </button>
//         <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#666' }}>
//           <p>✓ Privacy-preserving verification</p>
//           <p>✓ One person, one profile</p>
//           <p>✓ Verified humans only</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react'
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js'
import './App.css'

// IMPORTANT: Update this with your backend URL!
const API_URL = 'http://localhost:5002'

function App() {
  const [loading, setLoading] = useState(true)
  const [isWorldApp, setIsWorldApp] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('🎬 App Starting...')
    
    // Check if in World App
    setTimeout(() => {
      const installed = MiniKit.isInstalled()
      console.log('✅ MiniKit installed:', installed)
      setIsWorldApp(installed)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSignIn = async () => {
    try {
      console.log('🌍 Signing in with World ID...')
      
      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: 'login',
        signal: '',
        verification_level: VerificationLevel.Device
      })

      console.log('📦 Payload:', finalPayload)

      if (finalPayload.status === 'success') {
        // Send to backend
        const response = await fetch(`${API_URL}/api/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            payload: finalPayload,
            action: 'login'
          })
        })

        const data = await response.json()
        console.log('✅ Backend response:', data)

        if (data.success) {
          setAuthenticated(true)
          setUser(data.user)
          localStorage.setItem('token', data.token)
        } else {
          alert('Verification failed: ' + data.error)
        }
      }
    } catch (error) {
      console.error('❌ Error:', error)
      alert('Error: ' + error.message)
    }
  }

  // Function to open in World App
  const openInWorldApp = () => {
    // Get current URL
    const currentUrl = window.location.href
    
    // Create World App deep link
    const deepLink = `https://worldcoin.org/mini-apps?url=${encodeURIComponent(currentUrl)}`
    
    // Try to open World App
    window.location.href = deepLink
  }

  // Loading screen
  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="logo pulse">💕</div>
          <h1>Elite Connect</h1>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Not in World App - UPDATED WITH CLICKABLE BUTTON!
  if (!isWorldApp) {
    return (
      <div className="container">
        <div className="card">
          <div className="logo">🌍</div>
          <h1>Open in World App</h1>
          <p>This app requires World App to work properly</p>
          
          {/* CLICKABLE BUTTON TO OPEN WORLD APP! */}
          <button className="btn btn-primary" onClick={openInWorldApp}>
            🚀 Open in World App
          </button>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', textAlign: 'left' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>📱 How to use:</p>
            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Tap the button above ☝️</li>
              <li>Select "Open in World App"</li>
              <li>App will open inside World App ✅</li>
            </ol>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fff3cd', borderRadius: '12px', fontSize: '0.875rem' }}>
            <strong>⚠️ Don't have World App?</strong><br/>
            Download from App Store or Play Store first!
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#999' }}>
            <p>Current URL: {window.location.href}</p>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated - Home screen
  if (authenticated) {
    return (
      <div className="container">
        <div className="card">
          <div className="logo">✅</div>
          <h1>Welcome!</h1>
          <p>You're signed in with World ID</p>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
            User: {user?.nullifier_hash?.substring(0, 10)}...
          </p>
          <button 
            className="btn"
            onClick={() => {
              setAuthenticated(false)
              setUser(null)
              localStorage.removeItem('token')
            }}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  // Login screen
  return (
    <div className="container">
      <div className="card">
        <div className="logo pulse">💕</div>
        <h1>Elite Connect</h1>
        <p>Verified connections, genuine hearts</p>
        <button className="btn" onClick={handleSignIn}>
          🌍 Sign in with World ID
        </button>
        <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#666' }}>
          <p>✓ Privacy-preserving verification</p>
          <p>✓ One person, one profile</p>
          <p>✓ Verified humans only</p>
        </div>
      </div>
    </div>
  )
}

export default App