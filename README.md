# Mobbeel Frontend - Technical Challenge

![workflow](https://github.com/manuelmartin-developer/mobbeel-technical-challenge/actions/workflows/publish.yml/badge.svg)

## Description

This project is a technical challenge for Mobbeel. It is a simple web application that allows the user to scan a ID document and extract an croppe image of the document.

## Run project locally

### 1. Clone the repository

```bash
git clone git@github.com:manuelmartin-developer/mobbeel-technical-challenge.git
```

### 2. Install dependencies

```bash
cd mobbeel-technical-challenge
npm install
```

### 3. Set the environment variables

Create a `.env` file in the root of the project with the following content:

```bash
VITE_BASE_URL=https://endpoint.example.com
```

Replace `https://endpoint.example.com` with the URL of the API endpoint.

### 4. Build the project

```bash
npm run build
```

### 5. Run the project

```bash
npm run preview
```

### 6. Open the browser

Open the browser and go to `http://localhost:3000`.

## Run project with Docker

### 1. Clone the repository

```bash
git clone git@github.com:manuelmartin-developer/mobbeel-technical-challenge.git
```

### 2. Set the environment variables

Create a `.env` file in the root of the project with the following content:

```bash
VITE_BASE_URL=https://endpoint.example.com
```

Replace `https://endpoint.example.com` with the URL of the API endpoint.

### 3. Build the Docker image

```bash
docker build -t mobbeel-technical-challenge .
```

### 4. Run the Docker container

```bash
docker run -p 3000:3000 --env-file .env mobbeel-technical-challenge
```

### 5. Open the browser

Open the browser and go to `http://localhost:3000`.

<hr>

# Decision Making

## Technologies

### React + Vite

I feel comfortable working with React and Vite. I have been working with React years ago and Vite is the perfect match for building React applications. Development experience is very smooth and the build process is very fast.

### TypeScript ❤️

I fall in love when I started working with TypeScript years ago. It is a must for me.

### Sass

Like TypeScript and React, sass is a library than I use in all my projects. With sass I can write more maintainable and scalable stylesheets, her syntax provides a lot of features that make the stylesheets more powerful.

### Docker

When I learned about Docker, I think it is a game changer. It is a very powerful tool for building, shipping and running applications. If my VPS has some disk space (not always 😬), I use Docker to deploy my applications.

### GitHub Actions

This project is using GitHub Actions to build and deploy the application. I have been using GitHub Actions for a while and I think it is a very powerful tool for automating the software development process.

Workflow:

- **💅 Format**

  - Run Prettier to format the code.

- **🕵️ Lint**

  - Run ESLint to lint the code.

- **🧪 Unit Tests**

  - Run Vitest (Jest) to run the unit tests.

- **🔬 E2E Test**

  - Run Cypress to run the end-to-end tests.

- **🚀 Publish**
  - Build the application and publish it to develop preview with Vercel.

This workflow is triggered when a pull request is opened or updated, and when a pull request is merged to the main branch.

You can see the workflow [here](https://github.com/manuelmartin-developer/mobbeel-technical-challenge/actions).

## UX/UI Experience

### UX

I have tried to make the application as simple as possible. The user can scan a ID document and extract an croppe image of the document.

To make the application more user-friendly, The process of scanning the document is divided into steps. The user can see the progress in the progress stepper ans see the result in the last step.

### UI

I have used a simple and clean design. I have used the colors of the Mobbeel logo to make the application more consistent with the Mobbeel brand.

Application will be developed with a mobile-first approach. The application is responsive and looks good on all devices.

<hr>

# Testing

## Unit Tests

I have written some unit tests for the components and services. Library chosen for testing is Vitest (Jest). Vitest is a very powerful library for testing React applications. This in one of the advantages of using Vite, it have a great ecosystem.

To run the unit tests:

```bash
npm test
```

Also, you can see the test coverage:

```bash
npm test:ui
```

## E2E Tests

E2E tests are written with Cypress. Cypress is a very powerful tool for testing web applications. It is very easy to write and run the tests.

To run the E2E tests:

```bash
npm test:cy
```

Also, you can see the tests running in the browser:

```bash
npm cy:open
```

<hr>

# Deployment

For development and testing purposes, `dev` branch is deployed to Vercel. The application is deployed automatically when a pull request is merged to the `dev` branch.

You can see the application running [here](https://mobbeel-technical-challenge.vercel.app/).

For production, I would use Docker to deploy the application to a VPS.

You can see the production deployment [here](https://mobbeel-technical-challenge.manuelmartin.dev/).

<hr>

# Discarted features

- **Camera selector**

  - I have discarded some features to make the application more simple. For example, I have discarded the feature to select the camera to scan the document. Always the environment camera is used. But maybe it would be a good feature to add a camera selector.

- **Pre-commit hooks**

  - Husky and lint-staged pre-commit hooks have been added to the project, but I have discarded the feature because github actions already cover this.

<hr>

# Improvements

- **Tests are not even enough**

  - More tests... More tests... More tests... always more tests.

- **Code Documentation**

  - Almost all types and functions are documented. But it would be a good feature to add a more complex documentation system.

- **User Notifications**

  - User notifications are very important en UX design. The applications uses a simple toast to notify the user about the result of the scanning process. But it would be a good feature to add a more complex notification system.

- **Internationalization**

  - The application is only in English. It would be a good feature to add internationalization to the application.

- **Accessibility**

  - Some of the components used in the applications has been developed with accessibility in mind. But it would be a good feature to check this and improve the accessibility of the application.

- **Cross-browser compatibility**

  - The application has been tested in the latest versions of Chrome, Firefox, Edge and Safari. But it would be a good feature to check the compatibility with older versions of the browsers.

- **And so much more...**

<hr>

# Conclusion

I have enjoyed a lot developing this project. It's have been developed with a lot of love and care. I hope you like it.
