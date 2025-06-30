# Book Recommender Application

A React-based book recommendation application that suggests books based on user preferences using AI generation.

![Book Recommender Screenshot](/public/thumbnail.png)

## Overview

This application allows users to:

- Input their favorite books
- Select preferred genres, moods, and book lengths
- Receive AI-generated book recommendations tailored to their preferences

The app integrates with:

- OpenLibrary API for book search functionality
- Domo AI for generating personalized book recommendations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Follow these steps to set up the project:

- Clone this repository
- Install dependencies:

  ```bash
  npm install
  ```

- Configure environment variables if needed (see [Configuration](#configuration) section)

## Dependencies

This project depends on:

- **React** - Frontend UI library
- **Ant Design** - UI component library for styling
- **ryuu.js** - Domo platform SDK
- **@domoinc/ryuu-proxy** - Proxy for communicating with Domo APIs

## Configuration

The application uses Domo's AI capabilities through the ryuu.js library. Make sure you have:

- An active Domo account

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run upload`

Builds the application and deploys it to your Domo instance. This script:

1. Runs the `build` script
2. Navigates to the build directory
3. Publishes the app to Domo using the Domo CLI
4. Returns to the project root directory

```bash
npm run upload
```

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## How the Application Works

### User Interface

The Book Recommender app offers an intuitive interface with:

1. A search field to find and select favorite books using the OpenLibrary API
2. Dropdown menus for selecting genre preferences, mood, and book length
3. A "Get Recommendations" button to generate personalized book recommendations
4. A results view displaying recommended books with titles, authors, and personalized explanations

### Technical Architecture

The application uses:

- **React** and **Ant Design** for the frontend UI
- **OpenLibrary API** for real-time book search capabilities
- **Domo AI integration** to generate personalized book recommendations based on:
  - User's favorite books
  - Selected genre preferences
  - Desired mood/tone
  - Preferred book length

### Data Flow

1. User inputs their book preferences and favorites
2. Application sends this data to the Domo AI API
3. AI processes the inputs using the defined system and user prompts
4. Results are transformed into a standardized JSON format
5. UI displays the recommendations with relevant explanations

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deployment

This application is designed to be deployed to the Domo platform. Use the provided upload script to deploy:

```bash
npm run upload
```

This will build the application and deploy it to your Domo instance using the Domo CLI.

### Prerequisites for Deployment

- Domo CLI tools installed
- Proper authentication configured for your Domo instance
- Appropriate permissions to publish applications

## Customization

You can customize various aspects of the application:

- Modify the UI components in `App.js` and `App.css`
- Adjust the AI prompts in the `userPrompt` and `systemPrompt` variables
- Add or remove genres, moods, and book length options as needed
- Change the visual theme by updating the styling in `App.css`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

_For Create React App specific documentation, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)._
