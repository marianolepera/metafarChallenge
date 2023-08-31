import stockServices from "./stockService";

describe("Testing API services", () => {

    it("Testing get data stocks service", async () => {
        const data = await stockServices.getDataStocks();
        expect(typeof data).toBe("object");
      });


    it("Testing search data by symbol service", async () => {
        const symbol="AAC"
        const data = await stockServices.searchDataBySymbol(symbol);

        const responseExpected = [{
            country : "United States",
            currency : "USD",
            exchange : "NYSE",
            id : 1,
            mic_code : "XNYS",
            name :  "AAC Holdings Inc",
            symbol : "AAC",
            type : "Common Stock"
          }];

        expect(typeof data).toBe("object");
        expect(data).toEqual(responseExpected);
    });

    it("Testing get data chart historico service", async () => {
        const symbol="AAC"
        const intervalo ="5min"
        const startDate = "2023-08-15"
        const endDate = "2023-08-31"
        const data = await stockServices.getDataChartHistorico(symbol, intervalo, startDate, endDate);
        expect(data?.status).toBe("ok");
      });

      it("Testing get data chart real service", async () => {
        const symbol="AAC"
        const intervalo ="5min"
        const data = await stockServices.getDataChartTiempoReal(symbol, intervalo);
        expect(data?.status).toBe("ok");
      });

})