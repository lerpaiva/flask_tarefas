const tabela = document.querySelector('.tabela-js')



/* Listar*/
axios.get('http://127.0.0.1:5000/list').then(function(resposta){
    getData(resposta.data)
}).catch(function(error){
    console.log(error)
})

function getData(data){
    data.map((item)=>{
        tabela.innerHTML += `
        <tr>
            <th scope="row">${item.ID}</th>
            <td>${item.TAREFA}</td>
            <td>
            <span type="button" class="material-symbols-outlined text-success" data-bs-toggle="modal" data-bs-target="#exampleModal1" onclick="alterar('${item.TAREFA}')">
            edit
            </span>
            <span type="button" class="material-symbols-outlined text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="excluir(${item.ID})">
            delete
            </span>
            <td>
        </tr>
        `
        })

    }
/* ADICIONAR*/
const formTarefa = document.getElementById('formTarefa');

formTarefa.addEventListener('submit', function(event) {
    event.preventDefault();

    const tarefa = document.getElementById('exampleInputName1').value;

    const Tarefa = {
        Tarefa: tarefa
    };

    enviarDadosAPI(Tarefa);
});

function enviarDadosAPI(Tarefa) {
    axios.post('http://127.0.0.1:5000/add', Tarefa)
        .then(response => {
            console.log(response.data.Tarefa);
        })
        .catch(error => {
            console.error('Erro na requisição POST', error);
        });
}
/*  EXCLUIR*/

function excluir(itemid){
    const botao = document.getElementById('aa')
    botao.addEventListener('click', function(){
        axios.delete(`http://127.0.0.1:5000/delete/${itemid}`)
           .then(response => {
                console.log(response.data.Tarefa);
            })
            .catch(error => {
                console.error('Erro na requisição delete', error);
            });
})
} 

/* ALTERAR*/

function alterar(tarefa_antiga) {
            const btn = document.getElementById('alterarTarefa');
        
            btn.addEventListener("click", () =>{
                const tarefa_nova = document.getElementById("tarefaUP").value;
    
                if (tarefa_nova.trim() !== "") {
        
                    axios.put(`http://127.0.0.1:5000/update/${tarefa_antiga}/${tarefa_nova}`)
                        .then(response => {
                            console.log('Resposta do servidor:', response.data.Tarefa);
                        })
                        .catch(error => {
                            console.error('Erro na requisição:', error);
                            alert("Erro ao editar")
                        });
                }
                else{
                    alert("Insira uma tarefa valida")
                }
            });
        }
