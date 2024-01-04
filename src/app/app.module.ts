import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputBarComponent} from "./component/input-bar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatbotService} from "./component/chatbot.service";
import {HttpClientModule} from "@angular/common/http";
import {FaqComponent} from "./component/faq.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FileUploadComponent} from "./component/FileUploadComponent";
import {NgOptimizedImage} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from "./component/login.component";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {ChatbotComponent} from "./component/chatbot.component";
import {RouterModule} from "@angular/router";
import {UpdateFileComponent} from "./component/update-file.component";

@NgModule({
  declarations: [
    AppComponent,
    InputBarComponent,
    FaqComponent,
    FileUploadComponent,
    LoginComponent,
    ChatbotComponent,
    UpdateFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(), ChatbotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
