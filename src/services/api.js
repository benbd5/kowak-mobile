import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { actionTypes } from '../contexts/AuthContext'

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true,
  timeout: 10000
})

const csrf = () => api.get('/sanctum/csrf-cookie')

const register = async ({ credentials }) => {
  fetch('http://10.0.2.2:8000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRF-TOKEN': 'eyJpdiI6ImMyUHozZFVUNnNGaVdGY2hwYThtRXc9PSIsInZhbHVlIjoiWVlwK3hFN2JDdjZMMmhUdGFTeGN0WklzOEd0dVZUYVBTUkdTUXY5a3BtWXZURGsySXFhQUJveWJyWVdCSTByWVlYUk9YczhMOVFmVjBPSEQwdkJmZ3pYVWM4amNOK3JNWU1HcmFqcVdBOUdRUnA0bXh3OVVhMXRjemRkNkN5VU0iLCJtYWMiOiI2OTU4OWM4ZDg0MDg5MmEzMmE5MTk5NTBkMDA5YjlkOTg0MTIxNTRlZDI4Y2IzZGJiOWQ4YjA4MGQ2OGI5MjAwIiwidGFnIjoiIn0%3D',
      Authorization: 'Bearer test'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
    .then(data => {
      console.log('data', data)
      // return data
    })
    .catch(error => console.log('error', error))
}

const login = async (credentials, dispatch) => {
  var axios = require('axios');
  var data = credentials

  var config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: data
  };


  axios.get("http://10.0.2.2:8000/sanctum/csrf-cookie").then(responseCsrf => {
    console.log('responseCsrf', responseCsrf);
    axios
      .post('http://10.0.2.2:8000/api/sanctum/token', data, config)
      .then(function (responseSanctumToken) {
        console.log('responseSanctumToken', responseSanctumToken);
        AsyncStorage.setItem('access_token', JSON.stringify(responseSanctumToken.data.access_token))

        // const token = response.config.headers['X-XSRF-TOKEN'];
        // console.log('login token', token);
        // axios.defaults.headers.common['X-XSRF-TOKEN'] = token
        // AsyncStorage.setItem('token', JSON.stringify(token))

        // const token = responseCsrf.headers['set-cookie'][0].split(';')[0].split('=')[1]
        // console.log('login token', token);
        // axios.defaults.headers.common['X-XSRF-TOKEN'] = token
        // AsyncStorage.setItem('token', JSON.stringify(token))

      }).catch(function (error) {
        console.log('error csrf-cookie', error);
      });
    loginAfter(data, dispatch)
  }
  ).catch(error => console.log('error api sanctum', error))
}

const loginAfter = async (credentials, dispatch) => {
  var axios = require('axios');
  var data = credentials
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  var config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`
    },
    data: data
  };

  axios
    .post('http://10.0.2.2:8000/login', data, config)
    .then(function (response) {
      console.log('response login', response);
      dispatch({ type: actionTypes.LOGIN, data: { user: response.data.user, token: userToken } })
      return response.data
    })
    .catch(function (error) {
      console.log('error login', error);
    }
    )
}

const forgotPassword = async ({ setErrors, setStatus, email }) => {
  await csrf()

  setErrors([])
  setStatus(null)

  api
    .post('/forgot-password', { email })
    .then(response => setStatus(response.data.status))
    .catch(error => {
      if (error.response.status !== 422) throw error

      setErrors(Object.values(error.response.data.errors).flat())
    })
}

const resetPassword = async ({ setErrors, setStatus, ...props }) => {
  await csrf()

  setErrors([])
  setStatus(null)

  api
    .post('/reset-password', { token: router.query.token, ...props })
    .then(response => router.push('/login?reset=' + btoa(response.data.status)))
    .catch(error => {
      if (error.response.status != 422) throw error

      setErrors(Object.values(error.response.data.errors).flat())
    })
}

const resendEmailVerification = ({ setStatus }) => {
  api
    .post('/email/verification-notification')
    .then(response => setStatus(response.data.status))
}

const logout = async () => {
  var axios = require('axios');

  var config = {
    method: 'post',
    url: ' http://10.0.2.2:8000/logout',
    headers: {
      'Accept': 'application/json',
    }
  };

  axios(config)
    .then(function (response) {
      console.log('logout', JSON.stringify(response.data));
      AsyncStorage.clear()
    })
    .catch(function (error) {
      console.log('logout error', error);
    });
}

const userProfile = async () => {
  var axios = require('axios');
  // On récupère le token de l'utilisateur connecté pour le passer dans le header
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  axios.get("http://10.0.2.2:8000/api/user", {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRF-TOKEN': userToken,
      'X-XSRF-TOKEN': userToken,
      'Cookie': `XSRF-TOKEN=${userToken}`,
      Authorization: `Bearer ${userToken}`
    }
  })
    .then(response => {
      // console.log('response', response);
      return response.data
    })
    .catch(error => console.log('error', error))
}

const getAllWorkspaces = async () => {
  var axios = require('axios');
  // On récupère le token de l'utilisateur connecté pour le passer dans le header
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  try {
    const res = await axios.get("http://10.0.2.2:8000/api/workSpace", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': userToken,
        Authorization: `Bearer ${userToken}`
      }
    })
    const workspaces = res.data.page.data
    return workspaces
  } catch (error) {
    console.log('error', error);
  }
}

const showSpecificWorkspace = async (id) => {
  var axios = require('axios');
  // On récupère le token de l'utilisateur connecté pour le passer dans le header
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  try {
    const res = await axios.get(`http://10.0.2.2:8000/api/workSpace/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': userToken,
        Authorization: `Bearer ${userToken}`
      }
    })
    const workspace = res.data.item
    console.log('api showSpecificWorkspace', workspace);
    return workspace
  } catch (error) {
    console.log('error', error);
  }
}

const postWorkspace = async (infos) => {
  var axios = require('axios');
  var data = infos
  // On récupère le token de l'utilisateur connecté pour le passer dans le header
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null
  console.log('userToken', userToken);
  console.log('data', data);
  var config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': userToken,
      Authorization: `Bearer ${userToken}`
    },
    data: data
  };

  axios
    .post('http://10.0.2.2:8000/api/workSpace', data, config)
    .then(function (response) {
      console.log('response postWorkspace', response);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}


export {
  register,
  login,
  forgotPassword,
  resetPassword,
  resendEmailVerification,
  logout,
  userProfile,
  getAllWorkspaces,
  postWorkspace,
  showSpecificWorkspace
}