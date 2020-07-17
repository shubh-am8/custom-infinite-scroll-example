import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent } from './tweets.component';
import { TweetComponent } from './tweet/tweet.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, InfiniteScrollModule, RouterModule, SharedModule],
  declarations: [TweetsComponent, TweetComponent]
})
export class TweetsModule {}
