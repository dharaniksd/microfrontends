# Northstar Banking Microfrontends

Northstar is an Angular workspace split into a platform shell and two business-domain applications. It demonstrates how separate teams can build and release their areas independently while preserving a consistent navigation and visual language.

## Architecture

```text
                        ┌────────────────────────────────┐
                        │ Shell / Host · Platform team    │
                        │ localhost:4200                 │
                        │ navigation · auth boundary     │
                        │ shared layout · route ownership│
                        └───────────────┬────────────────┘
                                        │
                  ┌─────────────────────┴─────────────────────┐
                  │                                           │
      ┌───────────▼────────────┐                  ┌───────────▼────────────┐
      │ Accounts · Team A      │                  │ Trading · Team B       │
      │ localhost:4201         │                  │ localhost:4202         │
      │ balances · activity    │                  │ markets · orders       │
      └────────────────────────┘                  └────────────────────────┘
```

| Application | Owner | Local URL | Responsibility |
| --- | --- | --- | --- |
| Shell | Platform team | [localhost:4200](http://localhost:4200) | navigation, authentication boundary, layout, overview dashboard and remote route ownership |
| Accounts | Team A | [localhost:4201](http://localhost:4201) | account balances and recent account activity |
| Trading | Team B | [localhost:4202](http://localhost:4202) | portfolio view, watchlist and trade entry point |

Each application has its own `main.ts`, styles and independently runnable Angular build target. The shared public integration contract lives in [contracts/remote-routes.ts](contracts/remote-routes.ts). This keeps the shell aware only of a remote's stable name, base route and deployment entry—not its internal feature code.

## How it works

1. The shell starts at `/` and renders the global sidebar, top bar and financial overview.
2. Selecting **Accounts** or **Trading** changes the shell route to `/accounts` or `/trading`.
3. The route identifies the owning team and links to the independently running app during local development.
4. Each team can develop, test and build its app without rebuilding the other team's UI.

The included implementation uses route placeholders as the local integration boundary. For a production deployment, replace those placeholders in [shell/src/app/app.ts](shell/src/app/app.ts) with a Module Federation or Native Federation loader. The contract already provides the intended `remoteEntry.json` URL for each remote.

## Design

The interface is deliberately calm and information-led:

- A deep evergreen navigation rail establishes the platform layer; the active route is clearly highlighted.
- A warm off-white canvas keeps the financial content readable and reduces visual noise.
- High-contrast portfolio cards pair serif display headings with compact, monospace-style data labels.
- The overview prioritizes net worth, available cash, investments and upcoming payments before deeper actions.
- Accounts and Trading share colors, spacing and card language, but remain entirely separate Angular applications.
- The shell layout adapts for narrow screens by collapsing the side navigation and stacking the key metrics.

## Prerequisites

- Node.js **20, 22 or 24 LTS** (Node 25 is an experimental/odd-numbered release and Angular will warn about it).
- npm 10 or later.

Verify your environment:

```bash
node --version
npm --version
```

## Setup

Clone the repository and install its locked dependencies:

```bash
git clone https://github.com/dharaniksd/microfrontends.git
cd microfrontends
npm install
```

If you already have the project inside the Angular workspace used for this exercise, its absolute location is:

```bash
cd /Users/dharaniks/Documents/workspace/angular/microfrontends
```

## Run locally

Start each application in a separate terminal. The commands stay running in watch mode.

**Terminal 1 — Accounts (Team A)**

```bash
npm run start:accounts
```

Open [http://localhost:4201](http://localhost:4201).

**Terminal 2 — Trading (Team B)**

```bash
npm run start:trading
```

Open [http://localhost:4202](http://localhost:4202).

**Terminal 3 — Shell / Host**

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200). Make sure another Angular application is not already using port `4200`; stop it with `Ctrl+C` or use a different port.

## Build

Create production builds for the full workspace:

```bash
npm run build
```

Or build applications separately, which mirrors independent team delivery:

```bash
npm run build:shell
npm run build:accounts
npm run build:trading
```

Angular writes build output to `dist/`, which is intentionally excluded from Git.

## Project structure

```text
microfrontends/
├── shell/                    # Host application and shared platform chrome
│   └── src/app/app.ts        # Shell routes and dashboard
├── accounts/                 # Team A remote application
├── trading/                  # Team B remote application
├── contracts/
│   └── remote-routes.ts      # Stable shell-to-remote integration contract
├── angular.json              # Build and serve targets
└── package.json              # Workspace scripts and dependencies
```

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm start` | Serve the shell at port 4200 |
| `npm run start:accounts` | Serve Accounts at port 4201 |
| `npm run start:trading` | Serve Trading at port 4202 |
| `npm run build` | Build all three apps |
| `npm run build:shell` | Build only the shell |
| `npm run build:accounts` | Build only Accounts |
| `npm run build:trading` | Build only Trading |
