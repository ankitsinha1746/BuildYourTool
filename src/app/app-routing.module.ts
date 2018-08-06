import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LinksPageComponent } from './pages/links-page/links-page.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { ContactsPageComponent } from './Pages/contacts-page/contacts-page.component';


const app_routes: Routes = [
    { path: '', pathMatch: 'full', component: LinksPageComponent  },
    { path: 'link', pathMatch: 'full', component: LinksPageComponent },
    { path: 'Contacts', pathMatch: 'full', component: ContactsPageComponent },
    { path: '**', pathMatch: 'full', component: ErrorPageComponent } //catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(
        app_routes,
        { enableTracing: true } // <-- debugging purposes only
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
