import {expect, test , type Locator , type Page} from '@playwright/test';

export enum OrderType {
    BUY = "BUY",
    SELL = "SELL"
}

export enum OpenOrderColumn {
    SYMBOL = "asset-open-column-symbol",
    TYPE = "asset-open-column-order-type",
    VOLUME = "asset-open-column-volume",    
    EDIT = "asset-open-button-edit",
    CLOSE = "asset-open-button-close"
}

export class DashboardPage {
    private readonly page: Page
    private readonly txtAccountName : Locator
    private readonly txtEquityValue: Locator
    private readonly txtEquityLabel: Locator
    private readonly inputStopLoss: Locator
    private readonly inputTakeProfit: Locator
    private readonly txtWatchlistTabAll : Locator
    private readonly inputStopLossPoint: Locator
    private readonly inputTakeProfitPoint: Locator
    private readonly inputEditTakeProfitPoint: Locator
    private readonly btnTradeOrder: Locator
    private inputTradeVolume: Locator
    private btnOrderConfirmationConfirm : Locator
    private btnOrderConfrimationCancel : Locator
    
    //
    private readonly lblForex : Locator
    //All list CURR
    private readonly allWatchlist : Locator

    //Edit Open Order
    private readonly dlgEditOrderConfirm : Locator
    private readonly btnEditOrderUpdatePosition : Locator
    private readonly inputEditOrderVolume : Locator
    private readonly btnEditOrderConfirmYes : Locator
    private readonly btnEditOrderCancel : Locator

    //settings
    private readonly btnSetting :Locator
    private readonly radOneClickTradingUnchecked : Locator
    private readonly radOneClickTradingChecked : Locator

    //Confirmation OCT
    private readonly btnOneClickTradingAgreeAndContinue : Locator

    //OCT buttons:
    private readonly btnOCTBuy : Locator
    private readonly btnOCTSell: Locator

    //currency
    readonly lblAUDNZD: Locator

    //Close position Dialog
    private readonly dlgClosePosition: Locator
    private readonly btnClosePositionDlgConfirm : Locator
    private readonly btnClosePositionDlgCancel : Locator
    private readonly inputClosePositionDlgVolum : Locator
    private readonly btnClosePositionDlgVolumMax : Locator

    //Open position section
    readonly lblYouHaveNoOpenPosition : Locator

    constructor(page:Page){
        this.page = page
        this.txtAccountName = page.locator('div.cVWTav')
        this.txtEquityValue = page.getByTestId('account-info-equity-value')
        this.txtEquityLabel = page.getByTestId('account-info-equity-label')
        this.inputStopLoss = page.getByTestId('trade-input-stoploss-price')
        this.inputTakeProfit = page.getByTestId('trade-input-takeprofit-price')
        this.txtWatchlistTabAll = page.getByTestId('watchlist-tab-all')
        this.inputStopLossPoint = page.getByTestId('trade-input-stoploss-points')
        this.inputTakeProfitPoint = page.getByTestId('trade-input-takeprofit-points').first()
        this.inputEditTakeProfitPoint = page.getByTestId('trade-input-takeprofit-points').nth(1)
        this.btnTradeOrder = page.getByTestId('trade-button-order')
        this.inputTradeVolume = page.getByTestId('trade-input-volume')
        this.btnOrderConfirmationConfirm = page.getByTestId('trade-confirmation-button-confirm')
        this.btnOrderConfrimationCancel = page.getByTestId('trade-confirmation-button-close')

        this.lblForex = page.getByTestId('watchlist-sub-tab-forex')

        ///All Watch list
        this.allWatchlist = page.getByTestId('watchlist-list')


        //Edit Order
        this.dlgEditOrderConfirm = page.locator('div#overlay-aqx-trader div[role="dialog"]')
        this.btnEditOrderConfirmYes = page.getByTestId('trade-confirmation-button-confirm').within(this.dlgEditOrderConfirm)
        this.btnEditOrderCancel = page.getByTestId('edit-button-cancel')

        //settings
        this.btnSetting = page.getByTestId('app-setting-dropdown-trigger')
        this.radOneClickTradingUnchecked = page.getByTestId('toggle-oct')
        this.radOneClickTradingChecked = page.getByTestId('toggle-oct-checked')

        //currency
        this.lblAUDNZD = page.locator('[data-testid="watchlist-list-item"]').filter({ hasText: 'AUDNZD' })


        //Edit Order
        this.btnEditOrderUpdatePosition = page.getByTestId('edit-button-order')
        this.inputEditOrderVolume = page.locator('div#overlay-aqx-trader div[role="dialog"] input[name="lotSize"]')        

        //OCT buttons
        this.btnOCTBuy = page.getByTestId('trade-button-oct-order-buy')
        this.btnOCTSell = page.getByTestId('trade-button-oct-order-sell')

        //OCT Confirm        
        this.btnOneClickTradingAgreeAndContinue = page.locator('div[role="dialog"] button:nth-child(2)')

        //Close Position Dlg:
        //this.dlgClosePosition = page.locator('div#overlay-aqx-trader div[role="dialog"]')
        this.dlgClosePosition = page.getByRole('dialog', {name:'Confirm To Close Position'})
        this.btnClosePositionDlgConfirm = page.getByRole('button', {name:"CONFIRM"}).within(this.dlgClosePosition)
        this.btnClosePositionDlgCancel = page.getByRole('button', {name:"CANCEL"}).within(this.dlgClosePosition)
        this.inputClosePositionDlgVolum = page.locator('div#overlay-aqx-trader div[role="dialog"] input[name="lotSize"]').within(this.dlgClosePosition)  
        this.btnClosePositionDlgVolumMax = page.getByTestId('close-order-input-volume-static-max').within(this.dlgClosePosition)

        //Open position section
        this.lblYouHaveNoOpenPosition = page.getByText("You have no open positions.")
        
    }

    public async waitForPageLoad() {
        await this.page.waitForResponse(res => res.url().includes('/web/trade') || res.status() == 200)        
        await this.page.waitForLoadState("domcontentloaded")
        await this.page.waitForLoadState("load")
        await this.txtWatchlistTabAll.waitFor({state:'visible'})
        await this.btnTradeOrder.waitFor({state:'visible'})
        await this.inputTradeVolume.waitFor({state:'visible'})
        await this.inputTakeProfitPoint.waitFor({state:'visible'})
        await this.inputStopLossPoint.waitFor({state:'visible'})
    }

    public async verifyDashboardPageIsDisplaying(){
        await expect(this.txtWatchlistTabAll).toBeVisible()
    }

    public async switchToWatchListTabAll(){
        await this.txtWatchlistTabAll.waitFor({state:"visible"})
        await this.txtWatchlistTabAll.click()
        await this.lblAUDNZD.waitFor({state:'visible'})
    }

    public async enterTradeVolume(value : string = '0.01') {
        await this.inputTradeVolume.waitFor({state:'visible'})
        await this.inputTradeVolume.click()
        await this.inputTradeVolume.fill(value)
    }
    public async enterEditOpenTradeVolume(value : string = '0.01') {
        await this.inputEditOrderVolume.waitFor({state:'visible'})
        await this.inputEditOrderVolume.click()
        await this.inputEditOrderVolume.fill(value)
    }

    public async enterClosePositionTradeVolume(value : string = '0.01') {
        await this.dlgClosePosition.waitFor({state:'visible'})
        await this.inputClosePositionDlgVolum.waitFor({state:'visible'})
        await this.inputClosePositionDlgVolum.click()
        await this.inputClosePositionDlgVolum.fill(value)       
    }

    public async enterStopLoss(value: number){
        await this.inputStopLoss.fill(value.toString())
    }

    public async enterTakeProfit(value:number){
        await this.inputTakeProfit.fill(value.toString())
    }

    public async enterStopLossPoint(value: string){
        await this.inputStopLossPoint.waitFor({state:'visible'})
        await this.inputStopLossPoint.fill(value)
    }

    public async enterTakeProfitPoint(value:string){
        await this.inputTakeProfitPoint.waitFor({state:'visible'})
        await this.inputTakeProfitPoint.fill(value)
    }

    public async enterEditTakeProfitPoint(value:string){
        await this.inputEditTakeProfitPoint.waitFor({state:'visible'})
        await this.inputEditTakeProfitPoint.fill(value)
    }

    public async clickTradeOrderButton(){
        await this.btnTradeOrder.waitFor({state:'visible'})
        await this.btnTradeOrder.click()
    }

    public async selectCurrency(curr : string){        
        await this.lblForex.waitFor({state:'visible'})
        await this.lblForex.click()
        const ele: Locator = this.page.getByTestId('watchlist-list-item').filter({hasText: `${curr}`})         
        ele.waitFor({state:'visible'})        
        await ele.click()
    }    

    public async clickSettingIcon(){
        await this.btnSetting.waitFor({state:'visible'})
        await this.btnSetting.click()
    }

    public async doOneClickTrading(bEna:boolean){        
        const checkedToggle = this.radOneClickTradingChecked
        const uncheckedToggle = this.radOneClickTradingUnchecked

        //Actiave One Click Trading
        if(bEna){
            if (await uncheckedToggle.isVisible()) {
                await uncheckedToggle.click();
            }                    
        }
        else { //Disable One Click Trading
            if(await checkedToggle.isVisible()){
                await checkedToggle.click()
            }
        }
        
    }

    public async clickOCTBuyButton(){
        await this.btnOCTBuy.waitFor({state:'visible'})
        await this.btnOCTBuy.click()
    }

    public async clickOCTSellButton(){
        await this.btnOCTSell.waitFor({state:'visible'})
        await this.btnOCTSell.click()
    }

    public async doOneClickTradingAgreeAndContinueYes(){
        await this.btnOneClickTradingAgreeAndContinue.waitFor({state:'visible'})
        await this.btnOneClickTradingAgreeAndContinue.click()
    }

    public async doOrderConfirmmationYes(){        
        await this.btnOrderConfirmationConfirm.waitFor({state:'visible'})
        await this.btnOrderConfirmationConfirm.click()        
    }

    public async doEditOrderConfirmationYes(){
        await this.btnEditOrderConfirmYes.waitFor({state:'visible'})
        await this.btnEditOrderConfirmYes.click()
    }

    public async doOrderConfirmatinNo() {
        await this.btnOrderConfrimationCancel.waitFor({state:'visible'})
        await this.btnOrderConfrimationCancel.click()
    }

    public async doClosePositionConfirmYes(){
        await this.btnClosePositionDlgConfirm.waitFor({state:'visible'})
        await this.btnClosePositionDlgConfirm.click()
    }

    public async getOpenOrderColumnValue(row: number = 1, col: OpenOrderColumn): Promise<string>{
        let strLocator : string = `table tr[data-testid="asset-open-list-item"]:nth-child(${row}) td div[data-testid="${col}"]`          
        const ele = this.page.locator(strLocator)
        await ele.waitFor({state:'visible'})
        return await ele.innerText()
    }

    public async clickOnOpenOrderColumn(row: number = 1, col:OpenOrderColumn){
        let strLocator : string = `table tr[data-testid="asset-open-list-item"]:nth-child(${row}) td button[data-testid="${col}"]` 
        const ele = this.page.locator(strLocator)
        await ele.waitFor({state:'visible'})
        await ele.click()
    }

    public async clickEditOrderUpdatePositionButton(){
        await this.btnEditOrderUpdatePosition.waitFor({state:'visible'})
        await this.btnEditOrderUpdatePosition.click()
    }

    public async clickClosePositionDlgVolumMax(){
        await this.dlgClosePosition.waitFor({state:'visible'})
        await this.dlgClosePosition.focus()
        await this.btnClosePositionDlgVolumMax.waitFor({state:'visible'})
        await this.btnClosePositionDlgVolumMax.click()
    }

    public async waitForEditOrderDlgDisplay(){
        await this.dlgEditOrderConfirm.waitFor({state:'visible'})        
        await this.btnEditOrderUpdatePosition.waitFor({state:'visible'})                        
        await this.btnEditOrderCancel.waitFor({state:'visible'}) 
    }

    public async waitForClosePositionDlgDisplay(){
        await this.dlgClosePosition.waitFor({state:'visible'})
        await this.btnClosePositionDlgCancel.waitFor({state:'visible'})
        await this.btnClosePositionDlgVolumMax.waitFor({state:'visible'})
        await this.btnClosePositionDlgConfirm.waitFor({state:'visible'})        
    }
    
}