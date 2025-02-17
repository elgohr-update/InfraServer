export type TRoute =
  | TGeneralRoute
  | TAcademyRoute
  | TBudgetRoute
  | TXMRRoute
  | TKrakenRoute
  | TBinanceRoute
  | TTinkoffRoute

type TAcademyRoute =
  | "/academy"
  | "/academy/order/:course"
  | "/academy/homeworks"

type TBudgetRoute =
  | "/budget/dates/:month/:year"
  | "/budget/currency/:currency/:month/:year"
  | "/budget/mir/currency"
  | "/budget/:category/:column/:start/:end/:course/:ruble"

type TXMRRoute =
  | "/xmr/sync"
  | "/xmr/share"

type TKrakenRoute =
  | "/kraken/mainloop"
  | "/kraken/start"
  | "/kraken/stop"
  | "/kraken/tickers/prepare"
  | "/kraken/tickers/flush"
  | "/kraken/order/monitor"
  | "/kraken/order/update"

type TBinanceRoute =
  | "/binance/tickers/prepare"

type TTinkoffRoute =
  | "/tinkoff/tickers/prepare"


type TGeneralRoute =
  | "/"
  | "/cd"
  | "/done"
  | "/done/:text"
  | "/fail"
  | "/ping"
  | "/logs"
  | "/logs/flush"
