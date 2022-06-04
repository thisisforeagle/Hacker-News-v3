import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskComponent } from './pages/ask/ask.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { NewPostsComponent } from './pages/new-posts/new-posts.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { ShowComponent } from './pages/show/show.component';
import { TopPostsComponent } from './pages/top-posts/top-posts.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'new-posts',
  },
  {
    path: 'ask',
    component: AskComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'new',
    component: NewPostsComponent
  },
  {
    path: 'top',
    component: TopPostsComponent
  },
  {
    path: 'show',
    component: ShowComponent
  },
  {
    path: 'post/:category/:id',
    component: PostPageComponent
  },
  {
    path: '**',
    redirectTo: 'new',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
