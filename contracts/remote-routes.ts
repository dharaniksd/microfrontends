/** Stable contract owned jointly by the shell and remote teams. */
export const remoteRoutes = {
  accounts: { basePath: 'accounts', remoteName: 'accounts', entry: 'http://localhost:4201/remoteEntry.json' },
  trading: { basePath: 'trading', remoteName: 'trading', entry: 'http://localhost:4202/remoteEntry.json' }
} as const;
