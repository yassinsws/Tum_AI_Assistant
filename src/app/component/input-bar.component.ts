import {faMicrophone, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild,} from '@angular/core';
import {ChatbotService} from './chatbot.service';
import {ChatbotMessage, Sender} from './chatbot.models';

@Component({
  selector: 'jhi-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrl: './input-bar.component.scss',
})
export class InputBarComponent implements OnInit {

  @ViewChild('messageInput', {static: false}) messageInput?: ElementRef;
  @ViewChild('chatBody') chatBody!: ElementRef;

  @Output() actionStarted = new EventEmitter<any>();

  faPaperPlane = faPaperPlane

  public messages: ChatbotMessage[] = [];
  public newMessageContent = '';
  public isLoading = false;
  public sessionId?: number;

  constructor(
    private chatbotService: ChatbotService,
  ) {
  }



  public ngOnInit(): void {
    // this.chatbotService.getMessages(this.sessionId!).subscribe(response => {
    //   response.body!.map((message) => {
    //     this.addToChat(message)
    //   });
    // })
    const mockLLMMessage = {
      native: "llm",
      role: Sender.LLM,
    } as ChatbotMessage;
    const mockUserMessage = {
      native: "user",
      role: Sender.USER,
    }
    this.messages = [];
  }

  newUserMessage(message: string): ChatbotMessage {
    return {
      native: message,
      role: Sender.USER,
    };
  }



  public onSend(): void {
    console.log(this.newMessageContent);
    if (this.newMessageContent.trim() === '') {
      return;
    }

    // Start loader
    this.isLoading = true;

    this.addToChat(this.newUserMessage(this.newMessageContent));
    // Send new data
    this.chatbotService.sendMessage(this.newMessageContent, this.messages)
      .subscribe((result) => {
          this.messages = result.body!;
        },
        error => {
          console.log(error);
          this.isLoading = false;
        }
      );

    console.dir(this.messages);

    this.newMessageContent = '';
    console.log(this.newMessageContent);

    // Focus
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private addToChat(message: ChatbotMessage): void {
    const newData = [
      ...this.messages,
      Object.assign({}, message),
    ];
    this.messages = newData;
  }

  handleKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        this.onSend();
      } else {
        const textArea = event.target as HTMLTextAreaElement;
        const {selectionStart, selectionEnd} = textArea;
        const value = textArea.value;
        textArea.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
        textArea.selectionStart = textArea.selectionEnd = selectionStart + 1;
      }
    }
  }

  protected readonly Sender = Sender;
  protected readonly faMicrophone = faMicrophone;
}
