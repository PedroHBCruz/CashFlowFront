import{ BrowserRouter, Switch, Route } from 'react-router-dom';
import CadastrarInvestimento from '../pages/CadastrarInvestimento';
import ListarInvestimentos from '../pages/ListarInvestimentos';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ListarInvestimentos}/>
                <Route exact path="/realizar-registro" component={CadastrarInvestimento}/>
                <Route exact path="/listar-registros" component={ListarInvestimentos}/>
            </Switch>
        </BrowserRouter>
    );
}