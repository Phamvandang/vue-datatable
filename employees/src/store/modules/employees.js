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
    createEmployees(data) {
        let params = {
            name: data.name,
            salary: data.salary,
            age: data.age,
        }
        return axios.post('http://dummy.restapiexample.com/api/v1/create', params).then(res => {
            return res.data
        }).catch(error => {
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
