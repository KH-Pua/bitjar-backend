const CronJob = require('cron').CronJob;
const axios = require("axios");

const db = require("../db/models");
const {product} = db;

// pool id from defi llama
const poolId = {
    "WETH AAVE": "e880e828-ca59-4ec6-8d4f-27182a4dc23d",
    "WBTC AAVE": "7e382157-b1bc-406d-b17b-facba43b716e",
    "USDC AAVE": "aa70268e-4b52-42bf-a116-608b370f9501",
}

const fetchPoolData = async (poolId) => {
  try {
    const response = await axios.get(`https://yields.llama.fi/chart/${poolId}`);

    // Access the data array in the response
    const poolDataArray = response.data.data;
    console.log(poolDataArray[poolDataArray.length - 1].apy);

    // Return the latest element of the data array
    return poolDataArray[poolDataArray.length - 1];
  } catch (error) {
    console.error("Error fetching pool data:", error);
    return null;
  }
};

const apyUpdater = async () => {
  let poolDataArray = [];

  // Get APY info from defi llama
  // 1. Convert object into array and map it to become sequelize update function that includes pool data from defi llama.
  await Promise.all(
    poolDataArray = Object.keys(poolId).map(async (id) => {
    console.log("enter first map")
      const returnedPoolData = await fetchPoolData(poolId[id]);
      if (returnedPoolData) {
        const infoToUpdate = {
          apr: returnedPoolData.apy,
          tvl: returnedPoolData.tvlUsd,
        };

        const condition = {
          where: {
            productName: id,
          },
        };
        return product.update(infoToUpdate, condition);
      }
    }),
    console.log(poolDataArray)
  ).catch((error) => {
    console.error("Error querying pool data:", error);
  });

  // 2.Update the "product" table
  await Promise.all(poolDataArray)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.error("Error updating the product table with latest apy:", error);
    });
};

const apyUpdateJob = new CronJob ('0 */30 * * * *', 
        apyUpdater, // onTick
        null, // onComplete
        true, // start
    );

apyUpdater();

module.exports = apyUpdateJob;