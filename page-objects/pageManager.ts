import { Page } from '@playwright/test';
import { StepperPage } from './stepperPage';
import { CommonPage } from './commonPage';
import testdata from '../test-data/testdata.json';

export class PageManager {
    private readonly page: Page;
    private readonly stepperPage: StepperPage;
    private readonly commonPage: CommonPage;

    constructor(page: Page) {
        this.page = page;
        this.stepperPage = new StepperPage(this.page);
        this.commonPage = new CommonPage(this.page);
    }
    
    // Locators
    onStepperPage(): StepperPage {
        return this.stepperPage;
    }

    // Actions
    onCommonPage(): CommonPage {
        return this.commonPage;
    }

    async navigateToStep2(): Promise<void> {
        await this.commonPage.expectStepTitle(testdata.steps.step_1, testdata.titles.step_1);
        await this.stepperPage.fillZipCode(testdata.valid_inputs.zip);
        await this.commonPage.clickNextButton(testdata.steps.step_1);
        await this.commonPage.expectStepTransitionSuccess(testdata.steps.step_1);
    }

    async navigateToStep3(): Promise<void> {
        await this.navigateToStep2();
        await this.commonPage.expectStepTitle(testdata.steps.step_2, testdata.titles.step_2);
        await this.stepperPage.selectCheckbox(testdata.checkboxes.other);
        await this.stepperPage.selectCheckbox(testdata.checkboxes.safety);
        await this.commonPage.clickNextButton(testdata.steps.step_2);
        await this.commonPage.expectStepTransitionSuccess(testdata.steps.step_2);
    }

    async navigateToStep4(): Promise<void> {
        await this.navigateToStep3();
        await this.commonPage.expectStepTitle(testdata.steps.step_3, testdata.titles.step_3);
        await this.stepperPage.selectCheckbox(testdata.checkboxes.rental_property);
        await this.stepperPage.selectCheckbox(testdata.checkboxes.mobile_home);
        await this.commonPage.clickNextButton(testdata.steps.step_3);
        await this.commonPage.expectStepTransitionSuccess(testdata.steps.step_3);
    }

    async navigateToStep5(): Promise<void> {
        await this.navigateToStep4();
        await this.commonPage.expectStepTitle(testdata.steps.step_4, testdata.titles.step_4);
        await this.stepperPage.fillName(testdata.valid_inputs.name);
        await this.stepperPage.fillEmail(testdata.valid_inputs.email);
        await this.commonPage.clickNextButton(testdata.steps.step_4);
        await this.commonPage.expectStepTransitionSuccess(testdata.steps.step_4);
    }
}
