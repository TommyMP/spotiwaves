import React from "react";

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}

const clientId = '0ae08cb5d8c74b8ab77f73cba2dedcbb';
export const redirectUri = 'http://localhost:3000';
//export const redirectUri = 'https://tommymp.github.io/spotiwaves/';

class Login extends React.Component {
 


    handleLogin() {
        let codeVerifier = generateRandomString(128);
        
        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            let state = generateRandomString(16);
            let scope = 'user-top-read';
          
            localStorage.setItem('code_verifier', codeVerifier);
          
            let args = new URLSearchParams({
              response_type: 'code',
              client_id: clientId,
              scope: scope,
              redirect_uri: redirectUri,
              state: state,
              code_challenge_method: 'S256',
              code_challenge: codeChallenge
            });
          
            window.location = 'https://accounts.spotify.com/authorize?' + args;
          });
    }

    render() {
        return (
            <>
            <h1>Spotiwaves</h1>
            <div className="login-container">
                <button className="login-btn" onClick={this.handleLogin}>Login with Spotify</button>
            </div>
            </>
        )
    }
    
}

export default Login;