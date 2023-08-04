import { test, expect } from '@playwright/test';
import {waitFor} from "../helpers/waitings";
import {FileWriter} from "../helpers/fileWriter";
import {BasePage} from "../pages/basePage";
import {SeatsSelectPage} from "../pages/seatsSelectPage";
export const AREAS_NUMBERS = {
    Balcony: 9,
    Terrace: 5,
    TerrW: 7,
    Orchestra_West: 4,
    TerrE: 6,
    Orchestra_East: 3,
    Orchestra: 2,
    Front_Orchestra: 1
}

let fileWriter;
let report = {
    number_of_active_sections: 0,
    sections_with_sets_next_to_each_other: [],
    sections_with_separate_seats: [],
    sections_with_one_seat: []
};

test.beforeAll(() => {
    fileWriter = new FileWriter();
})

test.afterAll(() => {
    fileWriter.write('test-results/report.json', report);
})

test('first check', async ({ page }) => {

    test.slow();
    let basePage = new BasePage(page);
    let seatsSelectPage: SeatsSelectPage;
    await basePage.navigateTo();

    report.number_of_active_sections = await basePage.availableZones.count();

    for (const row of await basePage.availableZones.all()){
        let zoneName = await row.getAttribute('id');
        zoneName.includes('Orchestra')
            ? await page.getByText('Orchestra E/W').click()
            : await row.click({force: true});
        seatsSelectPage = await basePage.clickContinueButton();
        if (await basePage.noSeatMessage.isVisible()) {
            await basePage.noSeatCloseIcon.click();
            await basePage.decreaseTicketsButton.click();
            await basePage.clickContinueButton();
            await waitFor(async () => (await basePage.confirmSeatsButton.count() !== 0));
            if (await page.locator(`#syos-screen-${AREAS_NUMBERS[zoneName]} .seat--available`).count() >= 2){
                report.sections_with_separate_seats.push(zoneName);
            } else {
                report.sections_with_one_seat.push(zoneName);
            }
            basePage = await seatsSelectPage.goToBasePage();
            await basePage.increaseTicketsButton.click();
        } else {
            await waitFor(async () => (await basePage.confirmSeatsButton.count() !== 0));
            report.sections_with_sets_next_to_each_other.push(zoneName);
            await seatsSelectPage.goToBasePage();
        }
    }
    expect(report.number_of_active_sections).toBeGreaterThan(0);
});