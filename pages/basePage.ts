import {Locator, Page} from "@playwright/test";
import {waitFor} from "../helpers/waitings";
import {SeatsSelectPage} from "./seatsSelectPage";

export class BasePage {
    url: string;
    page: Page;
    constructor(page: Page) {
        this.url = 'https://my.laphil.com/en/syos2/package/1183';
        this.page = page
    }

    get spinner(): Locator {
        return this.page.locator('.syos-loader--active');
    }
    get availableZones(): Locator {
        return this.page.locator('.has-zones');
    }

    get confirmSeatsButton(): Locator {
        return this.page.getByText('Confirm seats');
    }

    get gettingSeatButton(): Locator {
        return this.page.getByText('Getting Seats…');
    }

    get noSeatMessage(): Locator {
        return this.page.getByText('Your seats could not be reserved');
    }

    get noSeatCloseIcon(): Locator {
        return this.page.locator('[aria-label="Close"]');
    }

    get continueButton(): Locator {
        return this.page.getByText('Continue');
    }

    async clickContinueButton(): Promise<SeatsSelectPage> {
        await this.continueButton.click();
        await waitFor(async () => !(await this.gettingSeatButton.count() !== 0));
        return new SeatsSelectPage(this.page);
    }

    get decreaseTicketsButton(): Locator {
        return this.page.locator('[aria-label="Decrease amount of tickets"]');
    }

    get increaseTicketsButton(): Locator {
        return this.page.locator('[aria-label="Increase amount of tickets"]');
    }

    get bestAvailableButton(): Locator {
        return this.page.locator('.bestavailable-order');
    }

    async navigateTo(waitType = 'load' as 'load' | 'domcontentloaded' | 'networkidle', timeout = 30_000): Promise<void> {
        await this.page.goto(this.url, { waitUntil: waitType, timeout });
        await waitFor(async () => !(await this.spinner.count() !== 0));
    }
}