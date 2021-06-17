import "antd/dist/antd.css";
import {Table, Button, message, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegistroService from "../../service/InvestimentoService";

const { Header, Content, Footer } = Layout;
const { Column } = Table;

export default function ListarInvestimentos() {
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        refreshInvestimentos();
        return () => {

        }
    }, [])

    async function refreshInvestimentos() {
        RegistroService.retrieveAllRegistros()
            .then(
                response => {
                    setRegistros(response.data)
                }
            )
    }

    function Remove(record) {
        RegistroService.deleteInvestimento(record.id)
        message.success('Investimento removido com sucesso!');
        document.location.reload(true);
    }

    return (

        <div className="container">
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/realizar-registro">
                                Realizar registro
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/listar-registros">
                                Listar registros
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px'}}>
                    <div className="site-layout-content">
                        <h2>REGISTROS</h2>


                     

                        <Table dataSource={registros}>
                            <Column title="Valor inicial Caixa" dataIndex="valorInicialCaixa" key="valorInicialCaixa" />
                            <Column title="Tipo inserção" dataIndex={['insercao','nome']} key="insercao" />
                            <Column title="valor" dataIndex="valor" key="valor" />
                            <Column title="Data da inserção" dataIndex="dataInsercao" key="dataInsercao" />
                            <Column title="Pagamento" dataIndex={['tipoPagamento','nome']} key="tipoPagamento" />
                            <Column title="Descricao" dataIndex="descricao" key="descricao" />
                            <Column title="Remover" key="atualizar"
                                render={(text, record) => (<Button onClick={() => Remove(record)}
                                    type="primary">Remover</Button>)}

                            />

                        </Table>

                    </div>
                    <Footer style={{ textAlign: 'center'}}>LEH Panificadora ©2021 - Created by Pedro Cruz</Footer>

                </Content>
            </Layout>
        </div>
    );

}




