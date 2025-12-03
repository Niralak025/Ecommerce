# Ecommerce Mobile App

A modern, cross-platform mobile e-commerce application built with React Native, TypeScript, and Redux. This app provides a seamless shopping experience with features like product browsing, cart management, and user authentication.

## 🚀 Features

- **Product Catalog**: Browse products by categories
- **Shopping Cart**: Add/remove items and manage quantities
- **User Authentication**: Secure login and registration
- **Responsive UI**: Optimized for both iOS and Android
- **State Management**: Redux for global state management
- **Type Safety**: Built with TypeScript

## 🛠 Prerequisites

- Node.js (v14 or later)
- npm or Yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- JDK 11 or later

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ecommerce
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # OR using Yarn
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

## 🏃‍♂️ Running the App

### For iOS

```bash
# Start Metro bundler
npm start
# OR
yarn start

# In a new terminal
npm run ios
# OR
yarn ios
```

### For Android

```bash
# Make sure you have an emulator running or device connected
npm run android
# OR
yarn android
```

## 📁 Project Structure

```
src/
├── api/               # API services and configurations
├── assets/            # Images, fonts, and other static files
├── components/        # Reusable UI components
├── navigation/        # Navigation configuration
├── redux/             # Redux store, actions, and reducers
├── screens/           # App screens
├── shared/            # Shared styles, themes, and utilities
└── utils/             # Helper functions and constants
```

## 🔄 Environment Setup

1. Create a `.env` file in the root directory
2. Add your environment variables:
   ```
   API_BASE_URL=your_api_url_here
   # Add other environment variables as needed
   ```
