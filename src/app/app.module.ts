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
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UrlRootPipe } from './pipes/url-root.pipe';
import { TimeStampPipe } from './pipes/time-stamp.pipe';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [
    AppComponent,
    NewPostsComponent,
    AskComponent,
    ShowComponent,
    JobsComponent,
    TopPostsComponent,
    PostComponent,
    FooterComponent,
    SidebarComponent,
    UrlRootPipe,
    TimeStampPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    TimeagoModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
