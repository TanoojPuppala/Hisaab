# **App Name**: Hisaab AI

## Core Features:

- Feature Intro Screen: Landing screen displaying the core features (AI-Powered Analysis, Secure & Private, Smart Tracking, Local Language Support) and login/register buttons.
- Dashboard: Dashboard page providing a clear overview of the budget and recent financial activity. // Fetch dashboard data from ADK /summary endpoint
- AI Chat Assistant: AI-powered chat interface for financial insights, supporting voice input and real-time local language translation.  Uses a tool for LLM to use localized language financial terminology. // Post AI chat input to ADK GPT-based financial assistant
- Receipt Upload: Receipt upload functionality with options to take a photo or upload from gallery, with helpful tips for better scanning. // Send image to ADK backend for receipt analysis here
- Receipt History: Display of uploaded receipts in a list or card view with essential details like date, vendor, and amount.
- Wallet Management: Wallet page to manage vouchers and budget categories, allowing users to add, remove, and track budget items. // Use ADK wallet APIs to update voucher list or budgets
- User Authentication: User authentication flow for login and registration. // Connect this Login form with ADK server login endpoint

## Style Guidelines:

- Primary color: HSL 48, 100%, 50% which is RGB hex code #FFC800; a vibrant yellow to convey energy and focus on finance
- Background color: HSL 48, 20%, 95% which is RGB hex code #F7F6F2; a light, desaturated shade of yellow to provide a calm backdrop.
- Accent color: HSL 18, 67%, 47% which is RGB hex code #C7520E; a saturated, darker orange that provides constrast.
- Headline font: 'Poppins' (sans-serif) for headlines to convey a contemporary, precise feel.
- Body font: 'PT Sans' (sans-serif) for body text to combine a modern look with a little warmth and personality.
- Use clean, accessible, and easily understandable icons to enhance navigation and user experience, keeping Indian financial and language UX in mind.
- Employ a clean, minimal, and responsive design with soft shadows and rounded corners for an easy-to-understand interface.