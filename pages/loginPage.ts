import {expect, test , type Locator , type Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page
    readonly accoutId: Locator
    readonly password: Locator
    readonly submitBtn: Locator

    constructor(page:Page){
        this.page = page
        this.accoutId = page.getByTestId('login-user-id')
        this.password = page.getByTestId('login-password')
        this.submitBtn = page.getByTestId('login-submit')    
    }

    public async doNavigate(){
        await this.page.goto('')
    }

    public async doLogin(){
        await this.accoutId.fill("1243469")
        await this.password.fill("o#36M5IneRZ#")
        await this.submitBtn.click()
    }
}