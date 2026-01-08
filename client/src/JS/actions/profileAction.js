import axios from 'axios'
import { CREATE_PROFILE, FAIL_PROFILE, GET_PROFILE, LOAD_PROFILE, UPDATE_PROFILE } from '../actionTypes/profileActionTypes'

export const getProfile = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE })
  try {
    const config = { headers: { authorization: localStorage.getItem('token') } }
    const result = await axios.get(`/api/profile/${userId}`, config)
    dispatch({ type: GET_PROFILE, payload: result.data })
  } catch (error) {
    dispatch({ type: FAIL_PROFILE, payload: error.response?.data || error.message })
  }
}

export const createProfile = (profile) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE })
  try {
    const config = { headers: { authorization: localStorage.getItem('token') } }
    const result = await axios.post('/api/profile', profile, config)
    dispatch({ type: CREATE_PROFILE, payload: result.data })
  } catch (error) {
    dispatch({ type: FAIL_PROFILE, payload: error.response?.data || error.message })
  }
}

export const updateProfile = (userId, profile) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE })
  try {
    const config = { headers: { authorization: localStorage.getItem('token') } }
    const result = await axios.put(`/api/profile/${userId}`, profile, config)
    dispatch({ type: UPDATE_PROFILE, payload: result.data })
  } catch (error) {
    dispatch({ type: FAIL_PROFILE, payload: error.response?.data || error.message })
  }
}