import axios from 'axios';

const API_URL = 'http://localhost:8080'

class TipoPagamentosService {

    retrieveAllPagamentos() {
        return axios.get(`${API_URL}/tipo-pagamentos`)
    }
}
export default new TipoPagamentosService();