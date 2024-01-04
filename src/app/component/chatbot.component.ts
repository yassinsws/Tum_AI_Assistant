import {Component, OnInit} from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";


@Component({
  selector: 'jhi-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit {
  faUser = faUser;
  isLogin = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
    if(this.router.url.endsWith('/user')) {
      this.isLogin = true;
    }
  }
  onRedirect() {
    this.router.navigate(['/login']);
  }
}
