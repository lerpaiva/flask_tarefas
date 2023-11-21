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
            <span type="button" class="material-symbols-outlined text-success" data-bs-toggle="modal" data-bs-target="#exampleModal1">
            edit
            </span>
            <span type="button" class="material-symbols-outlined text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal2">
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


