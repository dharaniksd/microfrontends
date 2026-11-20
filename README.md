# Banking Microfrontends

Three independently deployable Angular applications share a small route contract.

| Application | Team | URL | Responsibility |
| --- | --- | --- | --- |
| Shell | Platform | `:4200` | navigation, session/auth boundary, layout and remote discovery |
| Accounts | Team A | `:4201` | account balances, transactions and account actions |
| Trading | Team B | `:4202` | watchlists, orders and market data |

## Run locally

```bash
npm install
npm run start:accounts
npm run start:trading
npm start
```

The shell owns no account or trading business UI. At production integration, replace the two `remoteRoutes` entries in `shell/src/app/app.ts` with your federation loader (for example Native Federation or Module Federation) and point them at each team's deployed remote entry. The public route contract is documented in `contracts/remote-routes.ts`.
