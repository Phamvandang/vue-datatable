import axios from 'axios'

const state = {}
const mutations = {}
const actions = {
    getEmployees() {
        return axios.get('http://dummy.restapiexample.com/api/v1/employees').then(res => {
            return res.data
        })
        .catch(error => {
            return error.response && error.response.data || ''
        })
    },
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
  }
