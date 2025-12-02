# Capslock Landing Page – Playwright Test Automation

This repository contains Playwright end-to-end tests for the Capslock multi-step landing page funnel.  
The main focus is on validating user input, step-by-step navigation, and the correct redirection to the final "Thank you!" page.

---

## 1. Getting Started

### 1.1 Prerequisites

- Node.js v18+  
- npm  
- macOS, Linux, or Windows

### 1.2 Installation

```bash
git clone <your-repo-url>
cd capslock-pw
npm install
npx playwright install
```

Create or update your `.env` file:

```env
URL=https://test-qa.capslock.global/
URL_THANKYOU=https://test-qa.capslock.global/thankyou
```

---

## 2. Running the Tests

Full suite:
```bash
npm test
```

Headed mode:
```bash
npm run test:headed
```

UI mode:
```bash
npm run test:ui
```

Debug mode:
```bash
npm run test:debug
```

Single spec:
```bash
npx playwright test tests/capslock_test.spec.ts
```

Single test by title:
```bash
npx playwright test -g "<test title>"
```

View report:
```bash
npm run report
```

---

## 3. Project Structure

```
capslock-pw/
├── .env
├── Bug Report.txt
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── test-data/
│   └── testdata.json
├── page-objects/
│   ├── pageManager.ts
│   ├── commonPage.ts
│   └── stepperPage.ts
└── tests/
    └── capslock_test.spec.ts
```

---

## 4. Short Written Note

### 4.1 Why these scenarios were selected

The tests cover:
- ZIP Code validations  
- Checkbox validations on steps 2 and 3  
- Name, email, and phone validations  
- Full happy path to the "Thank you!" page  
- A discovered bug (documented in Bug Report.txt)

These represent the highest-value and most business-critical flows.

---

### 4.2 Scalability & Maintainability Improvements

- Config layer for multi-environment URLs  
- Tagging strategy (@smoke, @regression, etc.)  
- Stronger page-object abstractions  
- ESLint + Prettier + TS strict mode  
- CI/CD integration with traces/screenshots  

---

### 4.3 Additional Improvements

- Change-driven landing-page testing  
- Visual regression  
- Accessibility/performance checks  
- Test reporting (Allure/Qase)  
- AI-assisted selector maintenance and triage
