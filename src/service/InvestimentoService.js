import axios from 'axios';

const API_URL = 'http://localhost:8080'

class RegistroService {

    retrieveAllRegistros() {
        return axios.get(`${API_URL}/caixa`)
    }
    saveInvestimento(registro) {
        return axios.post(`${API_URL}/caixa`, registro)
    }
    deleteInvestimento(codigo) {
        return axios.delete(`${API_URL}/caixa/${codigo}`)
    }
}
export default new RegistroService();