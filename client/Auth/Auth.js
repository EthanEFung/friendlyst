import auth0 from 'auth0-js';
import {
  AUTH_CONFIG
} from './auth0';
import history from './history';
import axios from 'axios';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientID,
      redirectUri: AUTH_CONFIG.redirectUri,
      audience: 'https://taeminpak.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile',
      user: {}
    })
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.setUserWhenAuthenticated = this.setUserWhenAuthenticated.bind(this);
  };

  login() {
    this.auth0.authorize()
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    console.log('getting profile::::::::::::');
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      console.log('THIS IS AUTH PROFILE', profile)
      cb(err, profile);
    });
  }

  handleAuthentication(newUser, manageChat) {
    console.log('handleAuthentication has been called')
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('this is authResult', authResult)
        this.setSession(authResult)
        axios.get('https://taeminpak.auth0.com/userinfo', {
            headers: {
              'Authorization': `Bearer ${authResult.accessToken}`
            }
          })
          .then(({
            data
          }) => {
            console.log('this is data', data, data.nickname)
            axios.post('/api/user/addUser', {
              nickname: data.nickname,
              email: data.name,
              profilePicture: data.picture
            })
            .then(({ data }) => {
              console.log('this is addUser data: ', data)
              newUser(data[0])
              manageChat(data[0].nickname)
            })
          })
      }
    })
  }
  setUserWhenAuthenticated(newUser, manageChat) {
    this.getProfile((err, profile)=>{
				if(err){
					throw err;
				} else {
					axios.post('/api/user/addUser', {
							nickname: profile.nickname,
							email: profile.name,
							profilePicture: profile.picture
						})
						.then(({ data }) => {
							console.log('this is addUser data: ', data);
							newUser(data[0]);
							manageChat(data[0].nickname);
						});
				}
			})
  }

  getProfileInfo() {
    console.log(this.auth0);
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log('hey its the auth result', authResult);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}