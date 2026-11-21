import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<section class="notifications"><p>NOTIFICATIONS REMOTE · TEAM ENGAGEMENT</p><div class="heading"><h1>Stay informed.</h1><button>Mark all read</button></div><article class="unread"><i>↑</i><div><b>Portfolio movement</b><span>Your portfolio is up 1.75% today.</span><small>12 minutes ago</small></div></article><article><i>✓</i><div><b>Payment completed</b><span>Your scheduled payment to Greenlight Utilities was processed.</span><small>Yesterday</small></div></article><article><i>◉</i><div><b>Security reminder</b><span>Your two-factor authentication is protecting this workspace.</span><small>2 days ago</small></div></article></section>`,
  styleUrl: './app.scss'
})
export class App {}
