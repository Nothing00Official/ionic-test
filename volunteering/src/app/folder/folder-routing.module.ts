import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { ProjectPage } from '../project/project.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'project/:id',
    component: ProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
