import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login.component";
import {ChatbotComponent} from "./component/chatbot.component";
import {UpdateFileComponent} from "./component/update-file.component";

const routes: Routes = [
  { path: '', component: ChatbotComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: ChatbotComponent },
  { path: 'upload', component: UpdateFileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
