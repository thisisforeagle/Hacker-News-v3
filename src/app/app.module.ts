import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostsComponent } from './pages/new-posts/new-posts.component';
import { PastPostsComponent } from './pages/past-posts/past-posts.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { AskComponent } from './pages/ask/ask.component';
import { ShowComponent } from './pages/show/show.component';
import { JobsComponent } from './pages/jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPostsComponent,
    PastPostsComponent,
    CommentsComponent,
    AskComponent,
    ShowComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
