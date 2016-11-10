import {DashboardComponent} from "./dashboard.component";
import {HeroDetailComponent} from "../hero/hero-detail.component";

export const DashboardRoutes: Array<any> = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'heroes/:id',
    component: HeroDetailComponent
  }
];
