import {Locator, Page} from "@playwright/test";

export class TicketsInfoPage {
    page: Page;
    constructor(page: Page) {
        this.page = page
    }

    get priceLabel(): Locator {
        return this.page.locator('tr>td.price');
    }

    get seatLabel(): Locator {
        return this.page.locator('td.item>div');
    }
}