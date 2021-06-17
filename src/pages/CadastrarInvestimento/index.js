import {Form, Button, message, DatePicker, Layout, Menu, Input, InputNumber, Select} from 'antd';
import { Link } from 'react-router-dom';
import RegistroService from '../../service/InvestimentoService';
import { useEffect, useState } from 'react';
import TipoInsercoesService from '../../service/CategoriaService';
import TipoPagamentosService from '../../service/PagamentosService';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function CadastrarInvestimento() {
    const dateFormat = 'DD/MM/YYYY';
    const [insercoes, setInsercoes] = useState([]);
    const [insercao, setInsercao] = useState(null);

    const [pagamentos, setPagamentos] = useState([]);
    const [pagamento, setPagamento] = useState(null);

    useEffect(() => {
        refreshInsercoes();
        refreshPagamentos();
        return () => {

        }
    }, [])

    async function refreshInsercoes() {
        TipoInsercoesService.retrieveAllCategorias()
        .then(
            response => {
                setInsercoes(response.data)
            }
        )
    }

    async function refreshPagamentos() {
        TipoPagamentosService.retrieveAllPagamentos()
        .then(
            response => {
                setPagamentos(response.data)
            }
        )
    }

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 3,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 4,
        },
    };

    const onFinish = (values) => {
      
        let Json = {
                        
                        valorInicialCaixa: values.valorInicialCaixa,
                        dataInsercao: values.dataInsercao.format('DD/MM/YYYY'),
                        valor: values.valor,
                        descricao: values.descricao
                        ,
                         tipoPagamento:{
                                id:values.tipoPagamento
                            },
                            insercao:{
                                id:values.insercao
                            }
                    }

        RegistroService.saveInvestimento(Json);
        message.success('Operação salva com sucesso')
        document.location.reload(true);
        
    }

    const onFinishFailed = (erroInfo) => {
        message.danger('Operação salva com sucesso')
        console.log('Failed: ', erroInfo)
    }

    function handleChange (value){
        setInsercao(value);
    }

    function hChange (value){
        setPagamento(value);
    }


    return (

        <div className="container">
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
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
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">

                        <h2>INSERIR RECEITA/DISPESA</h2>
                        <Form {...layout} name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Valor inicial do caixa"
                                name="valorInicialCaixa"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o valor inicial do caixa',
                                    },
                                ]}
                            >
                                <InputNumber />

                            </Form.Item>





                            <Form.Item
                                label="Tipo da inserção"
                                name="insercao"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o tipo de insercao',
                                    },
                                ]}

                            >
                              <Select  onChange = {handleChange} >
                                  {insercoes.map((item, index) =>{
                                      return(
                                          <Option key={item.id} value={item.id}>
                                              {item.nome}
                                          </Option>
                                      )
                                  })}

                              </Select>
                            </Form.Item>




                            <Form.Item
                                label="Valor"
                                name="valor"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o valor',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>



                            <Form.Item
                                label="Data de inserção"
                                name="dataInsercao"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira a data de inserçao',
                                    },
                                ]}
                            >
                                
                                <DatePicker format={dateFormat} />
                                
                            </Form.Item>


                            <Form.Item
                                label="Forma de pagamento"
                                name="tipoPagamento"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira a forma de pagamento',
                                    },
                                ]}

                            >
                              <Select  onChange = {hChange} >
                                  {pagamentos.map((item, index) =>{
                                      return(
                                          <Option key={item.id} value={item.id}>
                                              {item.nome}
                                          </Option>
                                      )
                                  })}

                              </Select>
                            </Form.Item>







                            <Form.Item
                                label="Descrição"
                                name="descricao"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Insira a descrição',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>LEH Panificadora ©2021 - Created by Pedro Cruz</Footer>
            </Layout>
        </div>
    );

}




