# Weather Notification API (Legacy Project)

**Note:** This is an archived project from my early stages of learning Node.js. It demonstrates foundational backend concepts but does not reflect my current architectural standards.

## Overview
A backend service that allows users to subscribe to daily weather updates for a specific city. 

## Key Features
* **Double Opt-in:** Secure email verification using cryptographic tokens.
* **API Integration:** Fetches real-time data from the WeatherAPI.
* **Background Jobs:** Uses `node-cron` for automated daily email dispatches.