import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskComponent } from './pages/ask/ask.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { NewPostsComponent } from './pages/new-posts/new-posts.component';
import { ShowComponent } from './pages/show/show.component';

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
    path: 'new-posts',
    component: NewPostsComponent
  },
  {
    path: 'show',
    component: ShowComponent
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
