import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {Generate} from './components/Generate';
import Login from './components/Login';
import { useEffect } from 'react';
import { redirectUri } from './components/Login';


const clientId = '0ae08cb5d8c74b8ab77f73cba2dedcbb';
//const redirectUri = 'http://localhost:3000';
//const redirectUri = 'https://tommymp.github.io/spotiwaves/';


function App() {

  const [accessToken, setAccessToken] = useState(null);


  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code')

    let codeVerifier = localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier
    });

    const response = fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        setAccessToken(data.access_token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [accessToken])


  return (
    <div className="page-container">
      {accessToken ?
        <Generate accessToken={accessToken} />
        :
        <Login />
      }
    </div>
  );
}

export default App;
