from flask import Flask, jsonify, request
import pandas as pd

app = Flask(__name__)

try:
    open('Text.csv', 'x')
    with open("Text.csv", "w") as arquivo:
         arquivo.write("ID,TAREFA\n") 
except:
    pass

@app.route("/list", methods=['GET'])
def listarTarefas():    
    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records')    
    return jsonify(tarefas)

@app.route("/add", methods=['POST'])
def addTarefas():
    item = request.json  
    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records') 
    id = len(tarefas) + 1
    with open("Text.csv", "a") as arquivo:
         arquivo.write(f"{id},{item["Tarefa"]}\n")    

    tarefas = pd.read_csv('Text.csv')
    tarefas = tarefas.to_dict('records')        
    return jsonify(tarefas)

@app.route("/update/<string:tarefa_velha>/<string:tarefa_nova>", methods=['PUT'])
def alterarTarefas(tarefa_velha,tarefa_nova):
    with open("Text.csv","a") as arquivo:
        for item in "Text.csv":
            if item["Tarefa"] == tarefa_velha:
                att = item["Tarefa"] = tarefa_nova
                arquivo.write(att)
                return "Tarefa alterada com sucesso"
            return "Tarefa nao alterada"   
        
@app.route("/delete/<int:indice_tarefa>", methods=['DELETE']) 
def deletarTarefas(indice_tarefa):
    with open("Text.csv","a") as arquivo:
        pass


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")

