import http from 'http';
import express from 'express';
import session from 'express-session';
import rotalogin from './rotas/rotalogin.js';
import autenticar from './segurança/autenticar.js';

const hostname = 'localhost';
const porta = 3010;

const app = express();

app.use(session({
    secret:"minH3s", //chave
    resave: true, //salvar sempre estado sessao
    saveUninitialized:false, //nao criar sessao para quem nao estiver logado
    cookie:{
        maxAge: 1000 * 60 * 30 //login valido por 30min
    }
}));
app.use(express.urlencoded({extended:false}));
app.use("/login", rotalogin);   // executa primeiro
app.use(express.static('./public'));  //acesso publico
app.use(autenticar, express.static('./private')); // acesso privado

const servidor = http.createServer(app);

servidor.listen(porta, hostname, () => {
    console.log("Servidor escutando em " + hostname + ":" + porta);
    console.log("Login: cris Senha: 123")
});