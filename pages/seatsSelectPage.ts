import {Locator, Page} from "@playwright/test";
import {waitFor} from "../helpers/waitings";
import {BasePage} from "./basePage";
import {TicketsInfoPage} from "./ticketsInfoPage";

export class SeatsSelectPage {
    page: Page;
    constructor(page: Page) {
        this.page = page
    }

    get changeSectionButton(): Locator {
        return this.page.getByText('Change Section');
    }

    get confirmPopupButton(): Locator {
        return this.page.locator('//*[.="Confirm"]');
    }

    get dialogWindow(): Locator {
        return this.page.locator('[role="dialog"]');
    }

    get ticketInfoLabel(): Locator {
        return this.page.locator('.syos-lineitem__title');
    }

    get ticketPriceLabel(): Locator {
        return this.page.locator('.syos-price__value');
    }

    get confirmSeatsButton(): Locator {
        return this.page.getByText('Confirm seats');
    }

    async clickConfirmSeatsButton(): Promise<TicketsInfoPage> {
        await this.confirmSeatsButton.click();
        await waitFor(async () => (await this.restrictionMessage.isVisible()));
        return new TicketsInfoPage(this.page);
    }

    get restrictionMessage(): Locator {
        return this.page.locator('.restriction-message-wrapper');
    }

    async goToBasePage(): Promise<BasePage> {
        await this.changeSectionButton.click();
        await this.confirmPopupButton.click({force: true});
        await waitFor(async () => !(await this.dialogWindow.count() !== 0));
        return new BasePage(this.page);
    }
}