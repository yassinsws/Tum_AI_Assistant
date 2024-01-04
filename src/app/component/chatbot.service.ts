import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import {
  map,
  Observable, tap,
} from 'rxjs';

import {
  ChatbotMessage, UploadedFile
} from './chatbot.models';

export type Response<T> = Observable<HttpResponse<T>>;

@Injectable({ providedIn: 'root' })
export class ChatbotService {

  constructor(
    private http: HttpClient,
  ) {}

  public getMessages(sessionId: number): Response<ChatbotMessage[]> {
    return this.http.get<ChatbotMessage[]>(`/api/messages`, { observe: 'response' }).pipe(
      map((response) => {
        const messages = response.body;
        if (!messages) return response;
        return Object.assign({}, response, {});
      }),
    );
  }

  public sendMessage(message: string, chatHistory: ChatbotMessage[]): Response<ChatbotMessage[]> {
    return this.http.post<ChatbotMessage[]>(`/api/send`, {
      'chat_history': chatHistory,
      'chat_input': message,
      'user': {'first_name': 'Michael', 'last_name': 'Dyer', 'username': 'good'},
      translate_response: true
    },{ observe: 'response' }).pipe(
      map((response) => {
        const messages = response.body;
        if (!messages) return response;
        return Object.assign({}, response, {});
      }),
    );
  }

  public instructorUploadFile(formData: FormData) {
    return this.http.post<UploadedFile>(`/api/form`, formData,{ observe: 'response' }).pipe(
      tap((response) => {
        if (response.body && response.body.sourceUrl) {
        }
      }),
    );
  }

}
