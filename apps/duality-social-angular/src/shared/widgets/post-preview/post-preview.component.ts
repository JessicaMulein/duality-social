import { Component, Input, ViewEncapsulation } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-post-preview",
  templateUrl: "./post-preview.component.html",
  styleUrls: ["./post-preview.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [SafeHtmlPipe]
})
export class PostPreviewComponent {
  @Input()
  public set PreviewInput(value: string) {
    this._previewInput = value;
    // POST to /api/feed/preview
    this.http.post<any>('/api/feed/preview', { content: this._previewInput })
      .pipe(
        tap((response) => {
          const parsedInput = response?.data?.preview;
          this._previewOutput = this._safeHtmlPipe.transform(parsedInput);
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Failed to fetch post preview:', error);
        }
      });
  }

  private _previewInput = "";

  constructor(
    private _safeHtmlPipe: SafeHtmlPipe,
    private http: HttpClient
  ) {}

  public get PreviewOutput(): SafeHtml {
    return this._previewOutput;
  }
  public set PreviewOutput(value: SafeHtml) {
    this._previewOutput = value;
  }
  private _previewOutput: SafeHtml = "" as SafeHtml;
}