
var formulario = document.getElementById("formCliente");
formulario.onsubmit = manipularSubmissao;
const urlBackend = 'http://localhost:3040/integrantes';

function exibirClienteFormaTabela(listaClientes){

    let divTabela = document.getElementById("tabela");
    let tabela = document.createElement('table');
    tabela.className = 'table table-striped table-hover';
    let cabecalho = document.createElement('thead');
    cabecalho.innerHTML = `<tr>
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Endereço</th>
                                <th>Bairro</th>
                                <th>Cidade</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Instrumento</th>
                                <th>UF</th>
                                <th>Ações</th>
                           <tr>`
    tabela.appendChild(cabecalho);
    let corpo = document.createElement('tbody');
    for (let i=0; i<listaClientes.length; i++){
        let linha = document.createElement('tr');
        linha.innerHTML = `<td>${listaClientes[i].cpf}</td>
                          <td>${listaClientes[i].nome}</td>
                          <td>${listaClientes[i].endereco}</td>
                          <td>${listaClientes[i].bairro}</td>
                          <td>${listaClientes[i].cidade}</td>
                          <td>${listaClientes[i].email}</td>
                          <td>${listaClientes[i].telefone}</td>
                          <td>${listaClientes[i].instrumento}</td>
                          <td>${listaClientes[i].uf}</td>
                          <td>
                            <button onclick="selecionarRegistro('${listaClientes[i].cpf}',
                                                                '${listaClientes[i].nome}',
                                                                '${listaClientes[i].endereco}',
                                                                '${listaClientes[i].bairro}',
                                                                '${listaClientes[i].cidade}',
                                                                '${listaClientes[i].email}',
                                                                '${listaClientes[i].telefone}',
                                                                '${listaClientes[i].instrumento}',
                                                                '${listaClientes[i].uf}',
                                                                'editar')" type="button" class="btn btn-warning">Editar</button>
                            <button onclick="selecionarRegistro('${listaClientes[i].cpf}',
                                                                '${listaClientes[i].nome}',
                                                                '${listaClientes[i].endereco}',
                                                                '${listaClientes[i].bairro}',
                                                                '${listaClientes[i].cidade}',
                                                                '${listaClientes[i].email}',
                                                                '${listaClientes[i].telefone}',
                                                                '${listaClientes[i].instrumento}',
                                                                '${listaClientes[i].uf}',
                                                                'excluir')" type="button" class="btn btn-danger">Ecluir</button>
                          </td>`
        corpo.appendChild(linha);
                          
    }
    tabela.appendChild(corpo);
    divTabela.appendChild(tabela);
}

function obterClientesBackend(){
    fetch(urlBackend,{method:"GET"})
    .then((resposta)=>{
        return resposta.json();
    })
    .then((dados)=>{
        //return dados;
        if(dados.length > 0){
            exibirClienteFormaTabela(dados);
        }
        else{
            mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                     não existe clientes na base;
                                  </div>`
        }
    }).catch((erro)=>{
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    ${erro.message}
                              </div>`
    })
}

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
            "endereco":endereco,
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
            obterClientesBackend();
            mensagem.innerHTML = `<div class="alert alert-success" role="alert">
                                        ${dados.mensagem}
                                 </div>`
            limpaFormulario()
            location.reload();
            obterClientesBackend()
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

function selecionarRegistro(pcpf, pnome, pendereco, pbairro, pcidade, pemail, ptelefone, pinstrumento, puf, acao){
    let cpf = document.getElementById("cpf");
    let nome = document.getElementById("nome");
    let endereco = document.getElementById("endereco");
    let bairro = document.getElementById("bairro");
    let cidade = document.getElementById("cidade");
    let email = document.getElementById("email");
    let telefone = document.getElementById("telefone");
    let instrumento = document.getElementById("instrumento");
    let uf = document.getElementById("uf");

    cpf.value = pcpf;
    nome.value = pnome;
    endereco.value = pendereco;
    bairro.value = pbairro;
    cidade.value = pcidade;
    email.value = pemail;
    telefone.value = ptelefone;
    instrumento.value = pinstrumento;
    uf.value = puf;

    let btnCadastro = document.getElementById("cadastrar");
    let btnEditar = document.getElementById("editar");
    let btnExcluir = document.getElementById("excluir");

    if (acao === "excluir"){
        document.getElementById('cpf').disabled = true;
        btnCadastro.disabled = true;
        btnEditar.disabled = true;
        btnExcluir.disabled = false;
    }
    else if (acao === "editar"){
        document.getElementById('cpf').disabled = true;
        btnCadastro.disabled = true;
        btnEditar.disabled = false;
        btnExcluir.disabled = true;
    }
    else{
        document.getElementById('cpf').disabled = false;
        btnCadastro.disabled = false;
        btnEditar.disabled = true;
        btnExcluir.disabled = true;
        limpaFormulario();
    }

}

function limpaFormulario(){
    document.getElementById("cpf").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("instrumento").value = "";
    document.getElementById("uf").value = "";

}

function apagarCliente(){
    if(confirm("Você confirma a exclusão do cliente selecionado? ")){
        fetch(urlBackend, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                cpf: document.getElementById('cpf').value
            })
        }).then((resposta)=>{
            if(resposta.ok) return resposta.json();
        }).then((dados)=>{
            mensagem.innerHTML = `<div class="alert alert-success" role="alert">
                                        ${dados.mensagem}
                                 </div>`
            limpaFormulario();
            location.reload();
            obterClientesBackend();
        }).catch((erro)=>{
            mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
                                    ${erro.message}
                              </div>`
        });
    }
    else{
        limpaFormulario();
        location.reload();
        obterClientesBackend();
    }
}

function atualizarCliente(){
    if(confirm("Você confirma a atualização do cliente? ")){
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
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "cpf":cpf,
                "nome":nome,
                "endereco":endereco,
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
                obterClientesBackend();
                mensagem.innerHTML = `<div class="alert alert-success" role="alert">
                                            ${dados.mensagem}
                                     </div>`
                limpaFormulario();
                location.reload();
                obterClientesBackend();
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
    else{
        limpaFormulario();
        location.reload();
        obterClientesBackend();
    }
}

obterClientesBackend();