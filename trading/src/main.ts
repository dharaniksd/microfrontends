import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
@Component({selector:'app-root',standalone:true,template:`<main><p>TEAM B · TRADING REMOTE</p><h1>Markets, in focus.</h1><div class="summary"><span>PORTFOLIO VALUE</span><b>$206,240.48</b><i>↑ 1.75% today</i></div><h2>Watchlist</h2><div class="stock"><b>NVDA</b><span>NVIDIA Corp.</span><strong>$184.28 <i>+2.42%</i></strong></div><div class="stock"><b>MSFT</b><span>Microsoft Corp.</span><strong>$421.50 <i>+0.85%</i></strong></div><button>Place an order →</button></main>`}) export class TradingRemote{}
bootstrapApplication(TradingRemote);
