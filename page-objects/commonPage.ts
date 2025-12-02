import { Page, Locator, expect } from '@playwright/test';

export class CommonPage {
    private readonly page: Page;
    private readonly formContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formContainer = page.locator('#form-container-1');
    }

    // Locators
    private getNextButton(step: string): Locator {
        return this.formContainer.locator(`button[data-tracking="btn-${step}"]`);
    }

    private getStepContainer(step: string): Locator {
        return this.formContainer.locator(`.steps.${step}`);
    }

    private getStepTitle(step: string): Locator {
        return this.getStepContainer(step).locator('.stepTitle__hdr');
    }

    private getErrorMessage(): Locator {
        return this.formContainer.locator('.hasError');
    }

    // Actions
    async clickNextButton(step: string): Promise<void> {
        const nextButton = this.getNextButton(step);
        await nextButton.waitFor({ state: 'visible' });
        await expect(nextButton).toBeEnabled();
        await nextButton.click();
    }

    // Assertions
    async expectStepTransitionSuccess(step: string): Promise<void> {
        const stepContainer = this.getStepContainer(step);
        await expect(stepContainer).toHaveAttribute('class', /moveLeftOut/);
        await expect(this.getErrorMessage()).toHaveCount(0);
    }

    async expectStepTransitionFailure(step: string, errorMessage: string): Promise<void> {
        const stepContainer = this.getStepContainer(step);
        await expect(stepContainer).not.toHaveAttribute('class', /moveLeftOut/);
        await expect(this.getErrorMessage()).toContainText(errorMessage);
    }

    async expectStepTitle(step: string, titleText: string): Promise<void> {
        const stepTitle = this.getStepTitle(step);
        await expect(stepTitle).toBeVisible();
        await expect(stepTitle).toHaveText(titleText);
    }

    async expectStepperProgress(step: number): Promise<void> {
        const progressValue = this.formContainer.locator('.stepProgress [data-current-progress]');
        const externalStepElement = this.formContainer.locator('.stepProgress [data-form-progress-current-step]');
        const internalStepElement = this.formContainer.locator('.stepProgress [data-current-step]');
        const totalStepsElement = this.formContainer.locator('.stepProgress [data-form-progress-total-steps]');

        const totalSteps = Number(await totalStepsElement.textContent());
        const expectedProgress = Math.round((step / totalSteps) * 100);

        await expect(externalStepElement).toHaveText(String(step));
        await expect(internalStepElement).toHaveAttribute('data-current-step', String(step - 1));
        await expect(progressValue).toHaveAttribute('data-current-progress', String(expectedProgress));
    }
}
