
var formulario = document.getElementById("formCliente");
formulario.onsubmit = manipularSubmissao;
const urlBackend = 'http://localhost:3040/integrantes';

function gravarClienteBackend(){
    let cpf = document.getElementById("cpf").value;
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let instrumento = document.getElementById("instrumento").value;
    let uf = document.getElementById("uf").value;
    let mensagem = document.getElementById("mensagem");

    fetch(urlBackend,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "cpf":cpf,
            "nome":nome,
            "endreco":endereco,
            "bairro":bairro,
            "cidade":cidade,
            "email":email,
            "telefone":telefone,
            "instrumento":instrumento,
            "uf":uf,
        })
    }).then((resposta)=>{  //then == entao
        return resposta.json();
    }).then((dados)=>{
        if(dados.status){
            mensagem.innerHTML = `<div class="alert alert-success" role="alert">
                                        ${dados.mensagem}
                                 </div>`
        }
        else{
            mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                        ${dados.mensagem}
                                  </div>`
        }
    }).catch((erro)=> {
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    ${erro.message}
                              </div>`
    });
}

function manipularSubmissao(evento){

    if (validarCliente()){
        gravarClienteBackend();
    }
    //impede submissao seja concluida para pagina
    evento.stopPropagation();
    evento.preventDefault();
}

function validarCliente(){
    let cpf = document.getElementById("cpf").value;
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let instrumento = document.getElementById("instrumento").value;
    let uf = document.getElementById("uf").value;
    let mensagem = document.getElementById("mensagem");

    if (!cpf){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe o CPF!
                              </div>`
        return false;
    }
    else if (!nome){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe o NOME!
                              </div>`
        return false;
    }
    else if (!endereco){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe o ENDEREÇO!
                              </div>`
        return false;
    }
    else if (!bairro){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe o BAIRRO!
                              </div>`
        return false;
    }
    else if (!cidade){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe a CIDADE!
                              </div>`
        return false;
    }
    else if (!email){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe o E-MAIL!
                              </div>`
        return false;
    }
    else if (!telefone){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe o TELEFONE!
                              </div>`
        return false;
    }
    else if (!instrumento){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe o INSTRUMENTO!
                              </div>`
        return false;
    }
    else if (!uf){
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Por favor informe o UF!
                              </div>`
        return false;
    }

    mensagem.innerHTML="";
        return true;
}