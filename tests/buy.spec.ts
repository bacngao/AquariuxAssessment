import {expect} from "@playwright/test"
import { LoginPage } from "../pages/loginPage"
import { DashboardPage, OpenOrderColumn } from "../pages/dashBoardPage"
import {test } from "../fixtures/fixtureLoginDashboard"

test.describe("Buy something", ()=>{
    test("Place Buy Market Orders with Stop Loss and Take Profit.", 
            {tag:"@buy-with-stop-loss-take-profit"}, 
            async ({page, aquariusLoginPage, aquariusDashboardPage}) =>{        
        await aquariusDashboardPage.waitForPageLoad()
        await aquariusDashboardPage.switchToWatchListTabAll()  
        await aquariusDashboardPage.selectCurrency('AUDCAD')
        await aquariusDashboardPage.waitForPageLoad()
        await aquariusDashboardPage.enterTradeVolume()
        await aquariusDashboardPage.enterStopLossPoint("234")
        await aquariusDashboardPage.enterTakeProfitPoint("456")
        await aquariusDashboardPage.clickTradeOrderButton()
        await aquariusDashboardPage.doOrderConfirmmationYes()
        //assert the Order
        expect(await aquariusDashboardPage.getOpenOrderColumnValue(1,OpenOrderColumn.SYMBOL)).toEqual('AUDCAD')
        expect(await aquariusDashboardPage.getOpenOrderColumnValue(1,OpenOrderColumn.TYPE)).toEqual('BUY')
        
        //Modify the Order 
        await aquariusDashboardPage.clickOnOpenOrderColumn(1, OpenOrderColumn.EDIT)
        await aquariusDashboardPage.waitForEditOrderDlgDisplay()        
        //Edit Take Profit Point Value
        await aquariusDashboardPage.enterEditTakeProfitPoint("222")
        await aquariusDashboardPage.clickEditOrderUpdatePositionButton()
        await aquariusDashboardPage.doEditOrderConfirmationYes()   
        
        //close position        
        await aquariusDashboardPage.clickOnOpenOrderColumn(1,OpenOrderColumn.CLOSE)        
        await aquariusDashboardPage.waitForClosePositionDlgDisplay()
        await aquariusDashboardPage.clickClosePositionDlgVolumMax() 
        await aquariusDashboardPage.doClosePositionConfirmYes()        
        await expect(aquariusDashboardPage.lblYouHaveNoOpenPosition).toBeVisible()        
    })

    test("Place Buy/Sell Market Orders with One-Click Trading enabled.",
            {tag:"@buy-with-one-click-trading"}, 
            async ({page, aquariusLoginPage, aquariusDashboardPage}) =>{
        await aquariusDashboardPage.waitForPageLoad()
        //switch to One Click Trading mode
        await aquariusDashboardPage.clickSettingIcon()
        await aquariusDashboardPage.doOneClickTrading(true)
        await aquariusDashboardPage.doOneClickTradingAgreeAndContinueYes()
        await aquariusDashboardPage.switchToWatchListTabAll()  
        await aquariusDashboardPage.selectCurrency('AUDCAD')
        await aquariusDashboardPage.enterTradeVolume('0.02')
        await aquariusDashboardPage.clickOCTBuyButton()
        //assert the Order
        expect(await aquariusDashboardPage.getOpenOrderColumnValue(1,OpenOrderColumn.SYMBOL)).toEqual('AUDCAD')
        expect(await aquariusDashboardPage.getOpenOrderColumnValue(1,OpenOrderColumn.TYPE)).toEqual('BUY')
        //back to normal mode
        await aquariusDashboardPage.clickSettingIcon()
        await aquariusDashboardPage.doOneClickTrading(false) 
        //close position        
        await aquariusDashboardPage.clickOnOpenOrderColumn(1,OpenOrderColumn.CLOSE)        
        await aquariusDashboardPage.waitForClosePositionDlgDisplay()
        await aquariusDashboardPage.clickClosePositionDlgVolumMax() 
        await aquariusDashboardPage.doClosePositionConfirmYes()        
        await expect(aquariusDashboardPage.lblYouHaveNoOpenPosition).toBeVisible()       
    })  
})