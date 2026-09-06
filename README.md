# Medicare Risk Assistant

Build a modern, professional web app called "MediCare Readmission Risk Assistant" — a healthcare analytics tool that predicts a patient's 30-day hospital readmission risk.

CORE FUNCTIONALITY:

A conversational, chat-style intake form that asks the user (a patient/nurse) the following questions one at a time, like a hospital receptionist would:

1. Patient's name (text input)

2. Age (slider, 0-100)

3. Number of days admitted in hospital (slider, 1-14)

4. Number of lab procedures performed (slider, 0-120)

5. Number of medications currently taking (slider, 1-40)

6. Number of prior inpatient visits in the past year (slider, 0-10)

7. Number of prior emergency room visits in the past year (slider, 0-10)

8. Number of diagnosed medical conditions (slider, 1-16)

After all answers are collected, show a "Result" screen with:

- A risk badge: Low Risk (green), Medium Risk (yellow/orange), or High Risk (red)

- A probability percentage shown as a progress bar or gauge chart

- A short recommendation message based on the risk level (e.g. "Schedule a follow-up within 2 weeks")

- A "Check Another Patient" button to restart

DESIGN STYLE:

- Clean, modern healthcare/medical aesthetic — soft blues, teals, and whites

- Card-based layout with soft shadows and rounded corners

- Calm, trustworthy, professional feel (like a hospital patient portal, not flashy)

- Fully responsive (mobile + desktop)

- Include a hospital/medical icon or logo placeholder in the header

- Use a friendly medical-assistant tone in all copy ("Let's check your readmission risk")

PAGES/SECTIONS:

1. Landing/intro screen: brief explanation of what the tool does, "Start Assessment" button

2. Chat-style multi-step question flow (one question visible at a time, with a progress indicator showing e.g. "Step 3 of 8")

3. Result screen with risk badge, probability, and recommendation

4. A simple "About this project" footer section mentioning it's powered by a Random Forest machine learning model trained on 100,000+ real hospital records, with SHAP explainability

TECHNICAL NOTES:

- This is a frontend-only demo for now — store the questions/answers in state, and simulate the risk prediction with a simple placeholder scoring function (I will connect it to my real Python ML model's API later)

- Placeholder scoring logic: weight prior inpatient visits and medication count most heavily to produce a 0-100% risk score, then bucket into Low (<15%), Medium (15-30%), High (>30%)

- Keep the code clean and componentized so I can later swap the placeholder scoring function for a real API call to my trained model

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://care-guide-assistant.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/20caa6a2-6e28-4f08-b449-36aa50b6d10b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
