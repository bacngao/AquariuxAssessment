import { test as base } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";
import { DashboardPage } from '../pages/dashBoardPage';

type MyFixtures = {
    aquariusLoginPage: LoginPage
    aquariusDashboardPage: DashboardPage
};

export const test = base.extend<MyFixtures>({
    aquariusLoginPage: async ({page}, use) => {
        const login = new LoginPage(page)
        await login.doNavigate()
        await login.doLogin()
        await use(login)
    },
    aquariusDashboardPage: async ({page}, use)=> {
        const dashboard = new DashboardPage(page)
        //await dashboard.verifyDashboardPageIsDisplaying()
        dashboard.waitForPageLoad()        
        await use(dashboard)
    }
})