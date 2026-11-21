import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<section class="remote-card"><p>PROFILE REMOTE · TEAM IDENTITY</p><h1>Alex Morgan</h1><div class="avatar">AM</div><div class="details"><div><small>EMAIL</small><b>alex@northstar.example</b></div><div><small>MEMBER SINCE</small><b>October 2024</b></div><div><small>SECURITY</small><b class="verified">● Two-factor enabled</b></div></div><button>Manage profile</button></section>`,
  styleUrl: './app.scss'
})
export class App {}
