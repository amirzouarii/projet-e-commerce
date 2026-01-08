import axios from 'axios'
import { ADD_CATEGORY, FAIL_CATEGORIES, GET_CATEGORIES, LOAD_CATEGORIES } from '../actionTypes/categoryActionTypes'

export const getCategories = () => async (dispatch) => {
  dispatch({ type: LOAD_CATEGORIES })
  try {
    const result = await axios.get('/api/category')
    dispatch({ type: GET_CATEGORIES, payload: result.data })
  } catch (error) {
    dispatch({ type: FAIL_CATEGORIES, payload: error.response?.data || error.message })
  }
}

export const addCategory = (category) => async (dispatch) => {
  dispatch({ type: LOAD_CATEGORIES })
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }
    const result = await axios.post('/api/category', category, config)
    dispatch({ type: ADD_CATEGORY, payload: result.data })
    // refresh list
    dispatch(getCategories())
  } catch (error) {
    dispatch({ type: FAIL_CATEGORIES, payload: error.response?.data || error.message })
  }
}
