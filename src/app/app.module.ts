import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostsComponent } from './pages/new-posts/new-posts.component';
import { AskComponent } from './pages/ask/ask.component';
import { ShowComponent } from './pages/show/show.component';
import { JobsComponent } from './pages/jobs/jobs.component';

import { HttpClientModule } from '@angular/common/http'
import { TopPostsComponent } from './pages/top-posts/top-posts.component';
import { PostComponent } from './components/post/post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NewPostsComponent,
    AskComponent,
    ShowComponent,
    JobsComponent,
    TopPostsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
