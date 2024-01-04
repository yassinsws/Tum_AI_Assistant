import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router) {
  }
  onSubmit() {
    this.router.navigate(['/user']);
  }
}
