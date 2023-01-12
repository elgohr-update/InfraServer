import { Price } from "kraken/db/models/price";
import { log } from "logger/logger";
import { HIKE_TIME_FRAME } from "const/kraken/core";
import { ceilNumber } from "utils/ceilNumber";

export async function scanHikeTickers() {
  log("Info", "Scan hike tickers");

  const allAvailableTickers = await Price.find({
    prices: {
      $size: HIKE_TIME_FRAME, // Last two hours
    }
  }, { ticker: true });

  allAvailableTickers.forEach(async (ticker) => await checkMaxDiff(ticker.ticker));
  log("Important", "Ticker Scan completed");
}

async function checkMaxDiff(tickerName: string) {
  const ticker = await Price.findOne({ticker: tickerName});
  console.log("TICKER");
  console.log(ticker);
  const initialPrice = ticker.prices[0].price;
  console.log("START", initialPrice);

  let maxPrice = {
    price: 0,
    timestamp: 0,
  };
  let maxPriceIndex = -1;

  for (let i = 0; i < ticker.prices.length; i++) {
    if (ticker.prices[i].price > maxPrice.price) {
      maxPrice = ticker.prices[i];
      maxPriceIndex = i;
    }
  }
  const isHikePerformingNow = maxPriceIndex > 3;
  const priceDiff = ceilNumber(maxPrice.price / initialPrice, 2);

  if (isHikePerformingNow && priceDiff > 1.1) {
    log("Important", `HIKE: ${ticker.ticker} +${priceDiff}% \n`);
    return;
  }

  for (let i = 0; i < 3; i++) {
    Price.findOneAndUpdate({ticker: tickerName}, {
      $pop: {
        prices: -1
      }
    })
      .then(() => undefined)
      .catch(err => {
        log("Error", err);
      });
  }
}