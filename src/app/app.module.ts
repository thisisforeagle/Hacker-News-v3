import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

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
import { PaginationComponent } from './components/pagination/pagination.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { CommentComponent } from './components/comment/comment.component';
import { ErrorService } from './services/error.service';

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
    TimeStampPipe,
    PaginationComponent,
    PostPageComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    TimeagoModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
