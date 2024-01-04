import {Component, OnInit} from "@angular/core";
import { FaqModel} from "./chatbot.models";

@Component({
  selector: 'jhi-faq',
  templateUrl: 'faq.component.html',
  styleUrl: 'faq.component.scss'
})
export class FaqComponent implements OnInit {
  faqs: FaqModel[] = [];
  public ngOnInit(): void {
      const mockFaq = [
        { question: 'FAQ1', link: 'https://angular.dev' },
        { question: 'FAQ2', link: 'https://angular.dev/tutorials' },
        { question: 'FAQ3', link: 'https://angular.dev/tools/cli' },
        { question: 'FAQ4', link: 'https://angular.dev/tools/language-service' },
        { question: 'FAQ5', link: 'https://angular.dev/tools/devtools' },
      ] as FaqModel[];
      this.faqs = [...this.faqs, ...mockFaq];
    }
}
