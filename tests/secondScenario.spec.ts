import {expect, test} from "@playwright/test";
import {BasePage} from "../pages/basePage";
import {SeatsSelectPage} from "../pages/seatsSelectPage";
import {TicketsInfoPage} from "../pages/ticketsInfoPage";

test('second check', async ({ page }) => {

    let basePage = new BasePage(page);
    let seatsSelectPage: SeatsSelectPage;
    let ticketsInfoPage: TicketsInfoPage;

    await basePage.navigateTo();
    await basePage.decreaseTicketsButton.click();
    await basePage.bestAvailableButton.click();
    seatsSelectPage = await basePage.clickContinueButton();
    let ticket: {
        price: string,
        area: string;
        seat: string
    } = {
        price: await seatsSelectPage.ticketPriceLabel.innerText(),
        area: (await seatsSelectPage.ticketInfoLabel.innerText()).split(' ')[0],
        seat: (await seatsSelectPage.ticketInfoLabel.innerText()).split(' ')[(await seatsSelectPage.ticketInfoLabel.innerText()).split(' ').length-1]
    }
    ticketsInfoPage = await seatsSelectPage.clickConfirmSeatsButton();
    expect((await ticketsInfoPage.priceLabel.innerText()).includes(ticket.price)).toBeTruthy();
    expect((await ticketsInfoPage.seatLabel.first().innerText()).includes(ticket.area)).toBeTruthy();
    expect((await ticketsInfoPage.seatLabel.first().innerText()).includes(ticket.seat)).toBeTruthy();
});