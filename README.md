# Revokechain

Revokechain é uma abordagem de revogação de certificados digitais baseada na utilização de um livro razão distribuído, com o uso de uma rede de blockchain, se beneficiando das características de imutabilidade, integridade, alta disponibilidade e consenso.

Revokechain utiliza uma rede baseada no Minifabric, um lab do projeto Hyperledger Fabric. 

## Componentes:
O projeto está dividido da seguinte forma:

- [API Gateway](/krakend-gateway)
- [Aplicação](/rc-app/node/revokechain-api)
- [Smartcontract](/rc-chaincode)
- [Docs](/docs)

## API-Gateway
Revokechain utiliza o software KrakenD como o seu API gateway. O arquivo de configuração expõe os endpoints necessários para a inclusão e consulta de um certificado revogado. Além disso existe um endpoint para healthcheck da aplicação.

## Aplicação
Aplicação em NodeJS para a comunicação com o smartcontract (chaincode) da rede blockchain.

## Smartcontract
Contrato inteligente.

## Docs
diagramas da solução.