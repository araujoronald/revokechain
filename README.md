# Revokechain

Revokechain é uma abordagem de revogação de certificados digitais baseada na utilização de um livro razão distribuído, com o uso de uma rede de blockchain, se beneficiando das características de imutabilidade, integridade, alta disponibilidade e consenso.

Revokechain utiliza uma rede baseada no Minifabric, um lab do projeto Hyperledger Fabric. 

## Componentes:
O projeto está dividido da seguinte forma:

- [API Gateway](/krakend-gateway)
- [Aplicação](/rc-app/node/revokechain-api)
- [Smartcontract](/rc-chaincode/certificate-status/go)
- [Docs](/docs)

#### instalando o Minifabric
```bash
$ curl -o minifab -sL https://tinyurl.com/yxa2q6yr && chmod +x minifab
```

#### iniciando o Minifabric
```bash
$ ./minifab up
```

#### parando o Minifabric
```bash
$ ./minifab down
```

#### retomando o Minifabric
```bash
$ ./minifab netup
```

#### instalando o smartcontract
```bash
$ ./minifab install -n certificate-status -v 1.0 -o revokechain.serpro.gov.br 
```

#### confirmando o smartcontract
```bash
$ ./minifab approve,commit,initialize,discover
```

#### invocando um método do smartcontract. Ex: GetAllAssets
```bash
$ ./minifab invoke -n certificate-status -p '"GetAllAssets"'
```
