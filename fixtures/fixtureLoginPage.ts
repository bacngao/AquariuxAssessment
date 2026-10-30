import { test as base } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";

type MyFixtures = {
    aquariusLoginPage: LoginPage
};

export const test = base.extend<MyFixtures>({
    aquariusLoginPage: async ({page}, use) => {
        const login = new LoginPage(page)
        await login.doNavigate()
        await login.doLogin()
        await use(login)
    }
})