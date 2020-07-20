import React from 'react';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';

import Drawer from './components/drawer';

import Home from './screen/home';
import DetalhesEstabelecimento from './screen/detalhes_estabelecimento';
import Signin from './screen/user/signin';
import Signin2 from './screen/user/signin2';
import Login from './screen/user/login';
import Bemvindo from './screen/bem_vindo';
import Favoritos from './screen/favoritos';
import VerFoto from './screen/ver_foto';
import Edit from './screen/user/edit';
import ForgotPassword from './screen/user/forgot_password';



export default props => (

    <Router >

        <Scene key="root" hideNavBar>

            <Stack key="stack0" hideNavBar>
                <Scene key='bemvindo' hideDrawerButton component={Bemvindo} hideNavBar />
                <Scene key='login' hideDrawerButton component={Login} hideNavBar />
                <Scene key='signin' hideDrawerButton component={Signin} hideNavBar />
                <Scene key='signin2' hideDrawerButton component={Signin2} hideNavBar />
                <Scene key='forgotPassword' hideDrawerButton component={ForgotPassword} hideNavBar />
            </Stack>

            <Scene
                drawer
                hideNavBar
                key="drawerMenu"
                contentComponent={Drawer}
                drawerWidth={null}
                drawerPosition='left'
            >
                <Stack key="stack1" hideNavBar>
                   
                    <Scene key='home' hideDrawerButton component={Home} hideNavBar  />
                    <Scene key='detalhesEstabelecimento' hideDrawerButton component={DetalhesEstabelecimento} hideNavBar />
                    <Scene key='favoritos' hideDrawerButton component={Favoritos} hideNavBar  />
                    <Scene key='verFoto' hideDrawerButton component={VerFoto} hideNavBar  />
                    <Scene key='edit' hideDrawerButton component={Edit} hideNavBar />
                </Stack>

            </Scene>

        </Scene>

    </Router>
); 