import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';

@Component({
  selector: 'shell-home',
  standalone: true,
  template: `
    <section class="hero"><div><p class="eyebrow">GOOD MORNING, ALEX</p><h1>Everything in one<br><em>clear view.</em></h1><p class="lede">Your financial workspace is ready. Track cash, review activity, and move when markets do.</p><button>View portfolio <span>→</span></button></div><div class="hero-card"><div class="card-top"><span>NET WORTH</span><span class="live">● LIVE</span></div><strong>$248,920.48</strong><p class="up">↑ $4,286.10 (1.75%) today</p><svg viewBox="0 0 430 130" preserveAspectRatio="none"><path d="M0,105 C36,90 44,100 74,78 S115,92 146,65 S193,88 220,55 S273,73 299,34 S352,54 380,17 S410,22 430,8"/></svg><small>09:30&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11:00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13:00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15:30</small></div></section>
    <section class="metrics"><article><span>AVAILABLE CASH</span><b>$42,680.00</b><small>Across 3 accounts</small></article><article><span>INVESTMENTS</span><b>$206,240.48</b><small class="up">↑ 1.75% today</small></article><article><span>UPCOMING</span><b>$2,480.00</b><small>2 scheduled payments</small></article></section>
    <section class="activity"><div><p class="eyebrow">RECENT ACTIVITY</p><h2>Keep your momentum.</h2></div><a routerLink="/accounts">Open accounts →</a></section>
  `
})
export class Home {}

@Component({ selector: 'app-root', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive], template: `
  <div class="app-shell"><aside><a class="brand" routerLink="/"><i>n</i> northstar</a><nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><span>⌂</span> Overview</a><a routerLink="/accounts" routerLinkActive="active"><span>▣</span> Accounts <em>Team A</em></a><a routerLink="/trading" routerLinkActive="active"><span>↗</span> Trading <em>Team B</em></a></nav><div class="sidebar-bottom"><a href="#">? Help center</a><div class="user"><div>AM</div><span><b>Alex Morgan</b><small>Personal workspace</small></span><i>⌄</i></div></div></aside><main><header><div class="crumb"><span>Workspace</span><b>/</b> Overview</div><div class="tools"><button class="search">⌕ <span>Search</span><kbd>⌘ K</kbd></button><button class="bell">♧<i></i></button></div></header><router-outlet /></main></div>` })
export class App {}

@Component({ standalone: true, template: `<section class="remote-page"><p class="eyebrow">TEAM A · INDEPENDENT REMOTE</p><h1>Accounts</h1><p>This route is reserved for the Accounts remote. Start it at <code>localhost:4201</code> during local development.</p><a href="http://localhost:4201">Open Accounts app ↗</a></section>` }) export class AccountsPlaceholder {}
@Component({ standalone: true, template: `<section class="remote-page"><p class="eyebrow">TEAM B · INDEPENDENT REMOTE</p><h1>Trading</h1><p>This route is reserved for the Trading remote. Start it at <code>localhost:4202</code> during local development.</p><a href="http://localhost:4202">Open Trading app ↗</a></section>` }) export class TradingPlaceholder {}
export const routes: Routes = [{ path: '', component: Home }, { path: 'accounts', component: AccountsPlaceholder }, { path: 'trading', component: TradingPlaceholder }];
