// app
import { HomeRoutes } from './home/home.routes';
import { AboutRoutes } from './about/about.routes';
import {DashboardRoutes} from "./dashboard/dashboard.routes";
import {GithubRoutes} from "./github/github.routes";
import {HeroRoutes} from "./hero/hero.routes";

export const routes: Array<any> = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...DashboardRoutes,
  ...GithubRoutes,
  ...HeroRoutes
];
