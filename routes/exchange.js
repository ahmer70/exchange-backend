const express = require("express");
const router = express.Router();
const axios = require("axios");

const fixer = require("fixer-api");
const accessKey = process.env.accessKey
fixer.set({ accessKey });

const { JWT } = require("../middlewares/jwtAuth");


router.get('/lookup', JWT, async (req, res) => {
    try {
        const countryName = req.query.name;
        const countryInfo = await axios.get(`https://restcountries.com/v3.1/alpha/${countryName}`);
        let currencies = countryInfo.data[0].currencies
        if (typeof currencies != 'object') throw new Error('Currency not found')
        let cur = Object.keys(currencies)
        const exchangeRates = await fixer.latest(({ base: "EUR", symbols: [cur] }));

        const result = {
            fullName: countryInfo.data[0].name.common,
            population: countryInfo.data[0].population,
            currencies: {
                code: cur[0],
                exchangeRateToEUR: exchangeRates.rates[cur]
            },
        };

        res.json(result);
    } catch (error) {
        console.log("error.message", error.message)
        res.status(403).send(error.message);
    }
});
module.exports = router;
