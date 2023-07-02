import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from '../profile/profile.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [OAuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'feed',
    loadChildren: () => import('../features/feed/feed.module').then(m => m.FeedModule),
    // canActivate: [OAuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('../features/customers/customers.module').then(m => m.CustomersModule),
    // canActivate: [OAuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('../features/users/users.module').then(m => m.UsersModule),
    // canActivate: [OAuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('../features/account/account.module').then(m => m.AccountModule),
    // canActivate: [OAuthGuard]
  },
  {
    path: 'icons',
    loadChildren: () => import('../features/icons/icons.module').then(m => m.IconsModule),
    // canActivate: [OAuthGuard]
  },
  {
    path: 'playground',
    loadChildren: () => import('../features/typography/typography.module').then(m => m.TypographyModule),
    // canActivate: [OAuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('../features/about/about.module').then(m => m.AboutModule),
    // canActivate: [OAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }