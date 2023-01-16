const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models"); //Barrel

const connection = require("../../../src/models/db/connection");
const { products } = require("./mocks/products.model.mock"); //Products Mock

describe("Testes de unidade do model de products", function () {
  it("Recuperando a lista de produtos", async function () {
    // Arrange (arranjo): considera a configuração de tudo que é necessário para a execução do teste,
    // geralmente é aqui que são definidos os dublês para funções chamadas dentro da função que será testada no caso de uso.
    sinon.stub(connection, "execute").resolves([products]);
    // Act (ação): define a execução do teste por meio da chamada de uma função sob teste;
    const result = await productModel.listAllProducts();  
    // Assert (asserção): estabelece a verificação do resultado do teste, resultando na falha ou sucesso do mesmo.
    expect(result).to.be.deep.equal(products);
  });
  it("Recuperando um produto a partir do seu id", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([[products[0]]]);
    // Act
    const result = await productModel.getProductById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });  

  afterEach(function () {
    sinon.restore();
  });
});
