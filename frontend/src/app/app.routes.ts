import { Routes } from '@angular/router';
import { authGuard } from './Shared/Guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./Components/Auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: "category",
        loadChildren: () => import('./Components/Category/category.module').then(m => m.CategoryModule),
        canActivate: [authGuard]
    },
    {
        path: "customer",
        loadChildren: () => import('./Components/Customer/customer.module').then(m => m.CustomerModule),
        canActivate: [authGuard]
    },
    {
        path: '**',
        loadChildren: () => import('./Components/Auth/auth.module').then(m => m.AuthModule),
        pathMatch: "full"
    },
];
