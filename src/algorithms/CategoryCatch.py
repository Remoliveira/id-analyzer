# import mysql.connector
import re
import time
import pandas as pd
pd.options.display.max_rows = 9999

identificadoresCsv = pd.read_csv('../../Identifiers.csv')
# print(identificadoresCsv)

# with open('../../Identifiers.csv', mode='r') as csv_file:
#     csv_reader = csv.DictReader(csv_file)
#     for row in csv_reader:
#         print(row)


def camelSplit(identifier):
    matches = re.finditer(
        '.+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$|_)', identifier)
    return [m.group(0).replace("_", "") for m in matches]


inicio = time.time()


for row in identificadoresCsv.iterrows():
    # print(row)
    csvEntries = row[1]
    print(csvEntries.nome)
    print('-------------------')


# with open('IdentificadoresPosProcessamentoDeCategorira.csv', mode='w') as csv_file:

#     fieldnames = ['Identificador', 'Tipo', 'Categoria', 'Posicao', 'Projeto']
#     writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
#     writer.writeheader()
#     categoria = 0

#     for projeto in identificadoresCsv:
#         print('ss', projeto[3])
#         # mycursor.execute(
#         #     "SELECT nomeIdentificador,tipo,posicao_id FROM Identificador WHERE projeto_id = '{}'".format(projeto[0]))
#         identificadores = mycursor.fetchall()

#         for identificadorTupla in identificadores:

#             identificador = identificadorTupla[0]
#             tipo = identificadorTupla[1]
#             posicao = identificadorTupla[2]
#             idSplit = camelSplit(identificador)
#             tipoSplit = camelSplit(tipo)
#             # print(len(idSplit) , " ", idSplit)
#             if(posicao == None):
#                 posicao = "Nulo"

#             # 0 - Id que nao se encaixa
#             # 1 - Número final
#             # 2 - Número meio
#             # 3 - Id igual ao tipo
#             # 4 - Id de uma letra
#             # 5 - Tem o tipo no meio do id
#             # 6 - Id camel case 2 partes
#             # 7 - Id camel case 3+
#             # 8 - Id separado por underscore
#             # 9 - Id iniciado por underscore
#             # 10 - Id somente uma palavra
#             # tirar 6 7 10 9

#             # numero final - numero meio - id igual o tipo - id de uma letra - id tem o tipo no nome - id separado por underscore - id iniciado com underscore

#             # juntar 6 7 8 no mesmo padrão
#             # duas analise, uma palavra ou mais de uma palava
#             # todos os outros
#             # atributo ou classe metodo.
#             # substring contido no nome do tipo
#             # nome do id contido no tipo

#             if(re.search("[a-zA-Z]", identificador) and len(idSplit) == 2):
#                 # print(identificador)
#                 # categoria = 6
#                 if(re.search("_+", identificador)):
#                     # print(identificador)
#                     categoria = 8
#                 else:
#                     # print(identificador)
#                     categoria = 6

#             elif(re.search("[a-zA-Z]", identificador) and len(idSplit) >= 3):
#                 # print(identificador)
#                 categoria = 7
#                 if(re.search("_+", identificador)):
#                     # print(identificador)
#                     categoria = 8
#                 else:
#                     # print(identificador)
#                     categoria = 7

#             elif(len(idSplit) == 1):
#                 # print(identificador)
#                 categoria = 10

#             if(re.search("\d$", identificador)):
#                 # print("id com numero no final: ",identificador)
#                 categoria = 1

#             elif(re.search("\d[a-zA-Z]$", identificador)):
#                 # print("id com numero no meio: ",identificador)
#                 categoria = 2

#             elif(len(identificador) == 1):
#                 # print("id uma letra: "identificador)
#                 categoria = 4

#             elif(re.search("^_\w", identificador) and len(idSplit) == 1):
#                 # print(identificador)
#                 categoria = 9

#             elif(identificador.casefold() == tipo.casefold()):
#                 # print("id == tipo ", identificador, "--", tipo)
#                 categoria = 3

#             else:
#                 # print("id com nome do tipo no meio: ",identificador,"--",tipo)
#                 # contem = False
#                 for idUnico in idSplit:
#                     for tipoUnico in tipoSplit:

#                         if(idUnico == tipoUnico):

#                             categoria = 5
#                             # print(identificador,"-----",tipo)

#             if(re.search("^[a-zA-Z_]", identificador)):

#                 writer.writerow({'Identificador': identificador, 'Tipo': tipo,
#                                 'Categoria': categoria, 'Posicao': posicao, 'Projeto': projeto[0]})

#             #     # print(categoria)

#             categoria = 0


fim = time.time()
print(fim-inicio)
