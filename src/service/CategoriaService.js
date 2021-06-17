import axios from 'axios';

const API_URL = 'http://localhost:8080'

class TipoInsercoesService {

    retrieveAllCategorias() {
        return axios.get(`${API_URL}/tipo-insercoes`)
    }
}
export default new TipoInsercoesService();