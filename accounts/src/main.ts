import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
@Component({selector:'app-root',standalone:true,template:`<main><p>TEAM A · ACCOUNTS REMOTE</p><h1>Your accounts</h1><section><article><small>EVERYDAY CHECKING</small><b>$12,840.32</b><span>•••• 4821</span></article><article><small>HIGH-YIELD SAVINGS</small><b>$29,839.68</b><span>4.25% APY</span></article></section><h2>Latest activity</h2><div class="row"><span>Northstar Market</span><b>−$64.20</b></div><div class="row"><span>Payroll deposit</span><b class="in">+$4,200.00</b></div></main>`}) export class AccountsRemote{}
bootstrapApplication(AccountsRemote);
