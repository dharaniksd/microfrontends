# Northstar Banking Microfrontends

Northstar is an Angular workspace split into a platform shell and independently deployable business-domain applications. Profile and Notifications are true runtime-loaded microfrontends, demonstrating how teams can build and release their areas independently while preserving a consistent navigation and visual language.

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
      │ Profile · Identity     │                  │ Notifications · Engage │
      │ localhost:4203         │                  │ localhost:4204         │
      │ user identity          │                  │ alert feed             │
      └────────────────────────┘                  └────────────────────────┘
```

| Application | Owner | Local URL | Responsibility |
| --- | --- | --- | --- |
| Shell | Platform team | [localhost:4200](http://localhost:4200) | navigation, authentication boundary, layout, overview dashboard and remote route ownership |
| Profile | Identity team | [localhost:4203](http://localhost:4203) | user identity and security settings; loaded inside the shell |
| Notifications | Engagement team | [localhost:4204](http://localhost:4204) | alert feed and notification controls; loaded inside the shell |

Each federated application has its own `main.ts`, styles and independently runnable Angular build target. Native Federation produces each remote's `remoteEntry.json`; the shell resolves those entries through [federation.manifest.json](shell/src/assets/federation.manifest.json), then lazy-loads the exposed component on navigation.

## How it works

1. The shell starts at `/` and renders the global sidebar, top bar and financial overview.
2. Selecting **Profile** or **Notifications** changes the shell route to `/profile` or `/notifications`.
3. Angular's `loadRemoteModule` fetches the requested remote's `remoteEntry.json` and renders its exposed component inside the shell's `<router-outlet>`.
4. Each remote can be developed, tested, built and deployed without rebuilding the other remote's feature UI.

The federation integration is implemented in [shell/src/app/app.ts](shell/src/app/app.ts). To deploy to another environment, publish each remote's built `browser/` folder and replace its URL in `shell/src/assets/federation.manifest.json` during deployment.

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

**Terminal 4 — Profile remote**

```bash
npm run start:profile
```

**Terminal 5 — Notifications remote**

```bash
npm run start:notifications
```

Now use the Profile and Notifications sidebar items in the shell. They are fetched at runtime from ports `4203` and `4204` and displayed within the host application.

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
npm run build:profile
npm run build:notifications
```

Angular writes build output to `dist/`, which is intentionally excluded from Git.

## Deploy with Docker

Docker Compose produces three small Nginx images. Angular is compiled in a Node 22 LTS build stage, so Docker deployment is not affected by a non-LTS Node version installed on the host.

```bash
docker compose up --build -d
```

Once the services are healthy, open:

| Service | URL |
| --- | --- |
| Shell | [http://localhost:4200](http://localhost:4200) |
| Accounts | [http://localhost:4201](http://localhost:4201) |
| Trading | [http://localhost:4202](http://localhost:4202) |
| Profile remote | [http://localhost:4203](http://localhost:4203) |
| Notifications remote | [http://localhost:4204](http://localhost:4204) |

Inspect service status and logs:

```bash
docker compose ps
docker compose logs -f
```

Stop the local deployment without removing images:

```bash
docker compose down
```

To ship the applications to a registry, tag and push each Compose-built image (`northstar-shell`, `northstar-accounts`, and `northstar-trading`) to your container registry, then replace the local `build` blocks in `docker-compose.yml` with the corresponding `image:` references.

## Project structure

```text
microfrontends/
├── shell/                    # Host application and shared platform chrome
│   └── src/app/app.ts        # Shell routes and dashboard
├── accounts/                 # Team A remote application
├── trading/                  # Team B remote application
├── profile/                   # Federated Profile remote
├── notifications/             # Federated Notifications remote
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
| `npm run start:profile` | Serve the Profile microfrontend at port 4203 |
| `npm run start:notifications` | Serve the Notifications microfrontend at port 4204 |
| `npm run build` | Build all three apps |
| `npm run build:shell` | Build only the shell |
| `npm run build:accounts` | Build only Accounts |
| `npm run build:trading` | Build only Trading |
| `npm run build:profile` | Build only the Profile microfrontend |
| `npm run build:notifications` | Build only the Notifications microfrontend |
