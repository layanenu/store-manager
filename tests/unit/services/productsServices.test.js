const { expect } = require("chai");
const sinon = require("sinon");
const { productService } = require("../../../src/services");
const { productModel } = require("../../../src/models");

const { products } = require("./mocks/products.service.mock");

describe("Verificando service produtos", function () {
  describe("listagem de produtos", function () {
    it("retorna a lista completa de produtos", async function () {
      // arrange
      sinon.stub(productModel, "listAllProducts").resolves(products);

      // act
      const result = await productService.listAllProducts();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
  it("retorna um erro caso o produto não exista", async function () {
    // arrange
    sinon.stub(productModel, "getProductById").resolves(undefined);

    // act
    const result = await productService.getProductById(1);

    // assert
    expect(result.type).to.equal(404);
    expect(result.message).to.equal("Product not found");
  });

  it("retorna o produto caso ID existente", async function () {
    // arrange
    sinon.stub(productModel, "getProductById").resolves(products[0]);

    // act
    const result = await productService.getProductById(1);

    // assert
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(products[0]);
  });
});
