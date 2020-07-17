import { TweetsService } from './state/tweets.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from './state/tweet.model';
import { TweetsQuery } from './state/tweets.query';

@Component({
  selector: 'app-tweets',
  template: `
  <div class="container">

     <infinite-scroll (scrolled)="onScroll()" style="height: 400px; overflow-y: auto">
       <app-tweet *ngFor="let tweet of tweets$ | async" [tweet]="tweet"></app-tweet>

       <div class="alert alert-dark"*ngIf="isLoading$ | async">
        Fetching tweets...
       </div>
     </infinite-scroll>

  </div>
  `
})
export class TweetsComponent implements OnInit {
  tweets$: Observable<Tweet[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private tweetsQuery: TweetsQuery,
    private tweetsService: TweetsService
  ) { }

  ngOnInit() {
    this.fetchTweets();
    this.tweets$ = this.tweetsQuery.selectAll();
    this.isLoading$ = this.tweetsQuery.selectLoading();
  }

  onScroll() {
    this.fetchTweets();
  }

  private fetchTweets() {
    if (this.tweetsQuery.getHasMore()) {
      this.tweetsService.get(this.tweetsQuery.getPage());
    }
  }
}
