import { Page, Locator, expect } from '@playwright/test';

export class StepperPage {
    private readonly page: Page;
    private readonly formContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formContainer = page.locator('#form-container-1');
    }

    //Locators
    private get zipCodeInput(): Locator {
        return this.formContainer.locator('[data-zip-code-input]');
    }

    private get nameInput(): Locator {
        return this.formContainer.locator('[data-name-input]');
    }

    private get emailInput(): Locator {
        return this.formContainer.locator('input[name="email"]').first();
    }

    private get phoneInput(): Locator {
        return this.formContainer.locator('input[name="phone"][type=tel]').first();
    }

    private getCheckboxInput(label: string): Locator {
        return this.formContainer.getByLabel(label);
    }

    private getCheckboxLabel(label: string): Locator {
        return this.formContainer.locator('label').filter({ hasText: label });
    }

    //Actions
    async fillZipCode(zipCode: string): Promise<void> {
        await this.zipCodeInput.click();
        await this.zipCodeInput.fill(zipCode);
    }

    async fillName(name: string): Promise<void> {
        await this.nameInput.click();
        await this.nameInput.fill(name);
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.click();
        await this.emailInput.fill(email);
    }

    async fillPhoneNumber(phoneNumber: string): Promise<void> {
        await this.phoneInput.click();
        await this.phoneInput.fill(phoneNumber);
    }

    async selectCheckbox(checkboxLabel: string): Promise<void> {
        const label = this.getCheckboxLabel(checkboxLabel);
        const checkboxInput = this.getCheckboxInput(checkboxLabel);
        
        await label.waitFor({ state: 'visible' });
        await label.click();
        await expect(checkboxInput).toBeChecked();
    }

    //Assertions
    async expectPhoneInputMaxDigits(maxDigits: number = 10): Promise<void> {
        const longText = '2'.repeat(20);

        await this.phoneInput.click();
        await this.phoneInput.fill(longText);

        const actualValue = await this.phoneInput.inputValue();
        const digitsOnly = actualValue.replace(/\D/g, '');

        expect(digitsOnly.length).toBe(maxDigits);
    }
}
