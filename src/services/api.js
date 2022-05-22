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

const register = async (credentials, dispatch) => {
  var axios = require('axios');
  var data = credentials

  var config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: data
  };

  try {
    const res = await axios.post('http://10.0.2.2:8000/register', data, config)
    login({
      email: credentials.email,
      password: credentials.password,
      device_name: 'device'
    }
      , dispatch)
    console.log('register', res.data);
    // return res.data
  } catch (error) {
    console.log('error register', error);
    return error.response.data
  }
}

const login = async (credentials, dispatch) => {
  console.log('credentials login api', credentials);
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

  try {
    const res = await axios.get("http://10.0.2.2:8000/api/user", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-TOKEN': userToken,
        'X-XSRF-TOKEN': userToken,
        'Cookie': `XSRF-TOKEN=${userToken}`,
        Authorization: `Bearer ${userToken}`
      }
    })
    const user = res.data
    return user
  } catch (error) {
    console.log('error', error);
  }
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

    // get data of next page of laravel pagination for infinite scroll
    // const nextPage = res.links.map(link => {
    //   if (link.url != null) {
    //     console.log('link', link.url);
    //     return link.url
    //   }
    // })

    const workspaces = res.data.page.data
    console.log('workspaces', workspaces);
    console.log('workspaces', res);
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

/**
 * 
 * @param {Object} infos Données récupérées du formulaire d'ajout d'un espace de travail
 */
const postWorkspace = async (infos) => {
  var axios = require('axios');
  var data = infos

  // On récupère le token de l'utilisateur connecté pour le passer dans le header
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
  try {
    const res = await axios.post('http://10.0.2.2:8000/api/workSpace', data, config)
    return res.data
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * 
 * @param {Id} id Id du workspace à modifier
 * @param {Object} infos Les informations à modifier
 * @returns 
 */
const updateWorkspace = async (infos, id) => {
  console.log('infos', infos);
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
  try {
    const res = await axios.put(`http://10.0.2.2:8000/api/workSpace/${id}`, data, config)
    const workspace = res
    return workspace
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * 
 * @param {Id} id Id du workspace à modifier
 * @returns 
 */
const deleteWorkspace = async (id) => {
  console.log('id', id.workSpaceId);
  var axios = require('axios');

  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  var config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': userToken,
      Authorization: `Bearer ${userToken}`
    }
  };
  try {
    const res = await axios.delete(`http://10.0.2.2:8000/api/workSpace/${id.workSpaceId}`, config)
    const workspace = res
    console.log('delete', workspace);
    return workspace
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * 
 * @param {Id} id Id du workspace que l'utilisateur veut liker 
 * @returns 
 */
const likeWorkspace = async (id) => {
  var axios = require('axios');
  // On récupère le token de l'utilisateur connecté pour le passer dans le header
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  var config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': userToken,
      Authorization: `Bearer ${userToken}`
    }
  };
  try {
    const res = await axios.get(`http://10.0.2.2:8000/api/like/${id}`, config)
    const workspace = res
    console.log('like', workspace);
    return workspace
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * 
 * @param {*} infos Contient l'id de l'utilisateur et les dates de début et de fin de la réservation
 * @returns 
 */
const reservationWorkspace = async (infos) => {
  var axios = require('axios');
  var data = infos

  // On récupère le token de l'utilisateur connecté pour le passer dans le header
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  var config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': userToken,
      Authorization: `Bearer ${userToken}`
    },
    data: data
  };
  try {
    const res = await axios.post(`http://10.0.2.2:8000/api/location`, data, config)
    const reservation = res
    return reservation
  } catch (error) {
    console.log('error', error);
  }
}

const getReservations = async () => {
  var axios = require('axios');

  // On récupère le token de l'utilisateur connecté pour le passer dans le header
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  var config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': userToken,
      Authorization: `Bearer ${userToken}`
    }
  };
  try {
    const res = await axios.get(`http://10.0.2.2:8000/api/location`, config)
    const reservation = res
    return reservation
  } catch (error) {
    console.log('error', error);
  }
}

const cancelReservation = async (id) => {
  var axios = require('axios');

  // On récupère le token de l'utilisateur connecté pour le passer dans le header
  const getUserToken = await AsyncStorage.getItem('access_token')
  const userToken = getUserToken ? JSON.parse(getUserToken) : null

  var config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': userToken,
      Authorization: `Bearer ${userToken}`
    }
  };
  try {
    const res = await axios.delete(`http://10.0.2.2:8000/api/location/${id.locationId}`, config)
    const reservation = res
    console.log('cancel', reservation);
    return reservation
  } catch (error) {
    console.log('error', error);
  }
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
  showSpecificWorkspace,
  updateWorkspace,
  deleteWorkspace,
  likeWorkspace,
  reservationWorkspace,
  getReservations,
  cancelReservation
}