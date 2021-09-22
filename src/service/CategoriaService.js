import axios from 'axios';

const API_URL =  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080' 

class TipoInsercoesService {

    retrieveAllCategorias() {
        return axios.get(`${API_URL}/tipo-insercoes`)
    }
}
export default new TipoInsercoesService();