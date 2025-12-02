import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import testdata from '../test-data/testdata.json';

const BASE_URL = process.env.URL;
const THANK_YOU_URL = process.env.URL_THANKYOU;

test.beforeEach(async ({ page }) => {
    if (!BASE_URL) {
        throw new Error('Environment variable URL is not defined');
    }
    await page.goto(BASE_URL);
});

test.describe('ZIP Code Validation - Step 1', () => {
    test('should display validation messages for invalid ZIP codes', async ({ page }) => {
        const pm = new PageManager(page);

        await test.step('Validate empty ZIP code', async () => {
            await pm.onStepperPage().fillZipCode(testdata.invalid_inputs.zip_empty);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_1);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_1, testdata.validation.step_1.empty);
        });

        await test.step('Validate too short ZIP code', async () => {
            await pm.onStepperPage().fillZipCode(testdata.invalid_inputs.zip_short);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_1);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_1, testdata.validation.step_1.wrong);
        });

        await test.step('Validate too long ZIP code', async () => {
            await pm.onStepperPage().fillZipCode(testdata.invalid_inputs.zip_long);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_1);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_1, testdata.validation.step_1.wrong);
        });
    });
});

test.describe('Checkbox Validation - Steps 2 & 3', () => {
    test('should display validation message when no checkbox selected on step 3', async ({ page }) => {
        const pm = new PageManager(page);

        await test.step('Navigate to step 2 with valid ZIP', async () => {
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_1, testdata.titles.step_1);
            await pm.onStepperPage().fillZipCode(testdata.valid_inputs.zip);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_1);
            await pm.onCommonPage().expectStepTransitionSuccess(testdata.steps.step_1);
        });

        await test.step('Complete step 2 with checkboxes', async () => {
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_2, testdata.titles.step_2);
            await pm.onStepperPage().selectCheckbox(testdata.checkboxes.other);
            await pm.onStepperPage().selectCheckbox(testdata.checkboxes.safety);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_2);
            await pm.onCommonPage().expectStepTransitionSuccess(testdata.steps.step_2);
        });

        await test.step('Validate checkbox required on step 3', async () => {
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_3, testdata.titles.step_3);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_3);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_3, testdata.validation.step_3.choose);
        });
    });
});

test.describe('Name and Email Validation - Step 4', () => {
    test('should display validation messages for invalid name inputs', async ({ page }) => {
        const pm = new PageManager(page);

        await pm.navigateToStep4();
        await pm.onCommonPage().expectStepTitle(testdata.steps.step_4, testdata.titles.step_4);

        await test.step('Validate empty name', async () => {
            await pm.onStepperPage().fillName(testdata.invalid_inputs.name_empty);
            await pm.onStepperPage().fillEmail(testdata.valid_inputs.email);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_4);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_4, testdata.validation.step_4.empty_name);
        });

        await test.step('Validate too short name', async () => {
            await pm.onStepperPage().fillName(testdata.invalid_inputs.name_short);
            await pm.onStepperPage().fillEmail(testdata.valid_inputs.email);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_4);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_4, testdata.validation.step_4.short_name);
        });

        await test.step('Validate invalid name characters', async () => {
            await pm.onStepperPage().fillName(testdata.invalid_inputs.name_invalid);
            await pm.onStepperPage().fillEmail(testdata.valid_inputs.email);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_4);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_4, testdata.validation.step_4.invalid_name);
        });
    });

    test('should allow empty or invalid email and proceed to step 5', async ({ page }) => {
        const pm = new PageManager(page);

        await pm.navigateToStep4();
        await pm.onCommonPage().expectStepTitle(testdata.steps.step_4, testdata.titles.step_4);

        await test.step('Submit with empty email - should stay on step 4', async () => {
            await pm.onStepperPage().fillName(testdata.valid_inputs.name);
            await pm.onStepperPage().fillEmail(testdata.invalid_inputs.email_empty);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_4);
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_4, testdata.titles.step_4);
        });

        await test.step('Submit with invalid email - should stay on step 4', async () => {
            await pm.onStepperPage().fillEmail(testdata.invalid_inputs.email_invalid);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_4);
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_4, testdata.titles.step_4);
        });

        await test.step('Submit with valid email - should proceed to step 5', async () => {
            await pm.onStepperPage().fillEmail(testdata.valid_inputs.email);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_4);
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_5, testdata.titles.step_5);
        });
    });
});

test.describe('Phone Validation - Step 5', () => {
    test('should display validation messages for invalid phone numbers', async ({ page }) => {
        const pm = new PageManager(page);

        await pm.navigateToStep5();
        await pm.onCommonPage().expectStepTitle(testdata.steps.step_5, testdata.titles.step_5);

        await test.step('Validate empty phone number', async () => {
            await pm.onStepperPage().fillPhoneNumber(testdata.invalid_inputs.phone_empty);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_5);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_5, testdata.validation.step_5.empty_phone);
        });

        await test.step('Validate too short phone number', async () => {
            await pm.onStepperPage().fillPhoneNumber(testdata.invalid_inputs.phone_short);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_5);
            await pm.onCommonPage().expectStepTransitionFailure(testdata.steps.step_5, testdata.validation.step_5.wrong_phone);
        });
    });
});

test.describe('End-to-End Flow', () => {
    test('should complete form and redirect to Thank You page', async ({ page }) => {
        const pm = new PageManager(page);

        await test.step('Step 1: Enter valid ZIP code', async () => {
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_1, testdata.titles.step_1);
            await pm.onStepperPage().fillZipCode(testdata.valid_inputs.zip);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_1);
            await pm.onCommonPage().expectStepTransitionSuccess(testdata.steps.step_1);
        });

        await test.step('Step 2: Select interest checkboxes', async () => {
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_2, testdata.titles.step_2);
            await pm.onStepperPage().selectCheckbox(testdata.checkboxes.other);
            await pm.onStepperPage().selectCheckbox(testdata.checkboxes.safety);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_2);
            await pm.onCommonPage().expectStepTransitionSuccess(testdata.steps.step_2);
        });

        await test.step('Step 3: Select property type checkboxes', async () => {
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_3, testdata.titles.step_3);
            await pm.onStepperPage().selectCheckbox(testdata.checkboxes.rental_property);
            await pm.onStepperPage().selectCheckbox(testdata.checkboxes.mobile_home);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_3);
            await pm.onCommonPage().expectStepTransitionSuccess(testdata.steps.step_3);
        });

        await test.step('Step 4: Enter name and email', async () => {
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_4, testdata.titles.step_4);
            await pm.onStepperPage().fillName(testdata.valid_inputs.name);
            await pm.onStepperPage().fillEmail(testdata.valid_inputs.email);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_4);
            await pm.onCommonPage().expectStepTransitionSuccess(testdata.steps.step_4);
        });

        await test.step('Step 5: Enter phone and submit', async () => {
            await pm.onCommonPage().expectStepTitle(testdata.steps.step_5, testdata.titles.step_5);
            await pm.onStepperPage().fillPhoneNumber(testdata.valid_inputs.phone);
            await pm.onCommonPage().clickNextButton(testdata.steps.step_5);
        });

        await test.step('Verify Thank You page', async () => {
            if (!THANK_YOU_URL) {
                throw new Error('Environment variable URL_THANKYOU is not defined');
            }
            await expect(page).toHaveURL(THANK_YOU_URL);
            await expect(page.getByRole('heading', { name: testdata.thank_you.heading })).toBeVisible();
        });
    });
});
