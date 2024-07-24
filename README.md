# Aircall

## Overview

The goal of this project is to create a small ReactJS application to display a list of calls, view call details, and manage archived calls. The following documentation provides an overview of the features, installation instructions, API usage, and other relevant information to help you understand and work with the project.

## User Stories

| #  | User Story | Description | Estimate (hour) |
|----|------------|-------------|-----------------|
| 1  | Project Setup | This story is about setting up the project environment with the necessary tools and dependencies. | 0.5 |
| 2  | Component Hierarchy | This story is to decide the structure of the components in the application. | 0.5 |
| 3  | Design a Workflow Chart | This story is to design a workflow chart to visually represent and streamline the process within the project. | 0.5 |
| 4  | Create MainPage | This story is to create a MainPage that displays a list of activity calls and handles navigation between different pages. | 2 |
| 5  | Create StateChangeComponent | This story is to create a StateChangeComponent to archive all calls that are not archived. | 2 |
| 6  | Create CallListAndCallItem Component | This story is to create a CallListAndCallItem component that displays calls with different icons for each call type and differentiates based on the `from` and `to` fields. | 2 |
| 7  | Create RenderGroupedCallsComponent | This story is to create a component that displays aggregated information about calls based on criteria such as `from`, `to`, `date`, and `call_type`. | 3 |
| 8  | Create CallItem Component | This story is to create a CallItem component that displays call details such as `to`, `from`, and icons to determine and display call types. | 2 |
| 9  | Create CallMenu Component | This story is to create a CallMenu component that allows users to toggle the archive status of individual calls. | 2 |
| 10 | Display Navigation Icons | This story is to display navigation icons to handle PhoneNumberListPage, KeyPadComponent, and SettingPage. | 0.5 |
| 11 | Create PhoneNumberListPage | This story is to create a PhoneNumberListPage to display the current callers list. | 1 |
| 12 | Create KeyPadComponent | This story is to create a KeyPadComponent to allow users to call another person. | 1 |
| 13 | Create SettingPage | This story is to create a SettingPage to handle global color settings. | 1 |
| 14 | Unit Test | This story is to write unit tests for the React application to ensure components and functionalities work as expected. | 1 |
| 15 | Deploy the Application | This story is to deploy the React application to a hosting platform, making it accessible online. | 1 |

## User Story Details

### User Story 1 - Project Setup

As a developer, I want to set up the project environment so that I can start building the required features with the necessary tools and dependencies.

#### Clone the Skeleton App Repository

**Given:** A repository URL is provided.  
**When:** I run the git clone command.  
**Then:** The repository should be cloned to my local machine.

``bash
git clone https://github.com/speer-technologies/aircall.git
cd aircall

#### Set Up Node Version Using NVM

**Given:** The project requires Node.js version 16.  
**When:** I use nvm to install and use Node.js version 16.  
**Then:** The correct Node.js version should be active in my environment.

``bash
nvm install 16
nvm use 16

#### Install Project Dependencies with Yarn

**Given:** A `package.json` file with project dependencies is present.  
**When:** I run the `yarn install` command.  
**Then:** All required dependencies should be installed.

``bash
npm install -g yarn
yarn install

#### Enhance UX/UI with Material UI

**Given:** A decision to use Material UI for improving the user experience and interface.  
**When:** I install Material UI and integrate it into the project.  
**Then:** The project's UX/UI should be enhanced using Material UI components and styling.

``bash
yarn add @mui/material @emotion/react @emotion/styled

#### Update React from version 16 to 18

**Given:** The skeleton project was using React version 16, which did not support some needed features.  
**When:** I updated React to version 18.  
**Then:** The project should now support the new features provided by React 18, improving functionality and allowing the use of the latest features.

``bash
yarn add react@18 react-dom@18

#### Install "react-icons"

**Given:** The decision to use Material UI for improving the user experience and interface, including its icon components.  
**When:** I found that the icons I needed were not available in Material UI, so I decided to use `react-icons` instead.  
**Then:** The project should now include the necessary icons from `react-icons`.

``bash
yarn add react-icons

#### Install "jotai"

**Given:** The need for global state management in the project.  
**When:** I installed Jotai and used it to manage global state by utilizing atoms.  
**Then:** The project should now have global state management implemented using Jotai, with state being efficiently managed and shared across components.

``bash
yarn add jotai

#### Install ESLint

**Given:** The need to set up code linting and formatting tools, and to enforce linting rules before commits.

**When:** I installed ESLint, Prettier, and related packages with specific versions for linting and formatting.

``bash
#### Install ESLint, Prettier, and related packages
yarn add eslint@7.32.0 prettier@2.3.2 eslint-config-prettier@8.3.0 eslint-plugin-prettier@3.4.0 eslint-plugin-react@7.24.0 --dev
yarn add eslint@7.32.0 eslint-plugin-react@7.27.1 babel-eslint@10.1.0 prettier --dev

#### Install ESLint plugin for React hooks
yarn add eslint-plugin-react-hooks --dev

#### Set up Husky to enforce linting on pre-commit
npx husky install
npx husky add .husky/pre-commit "yarn lint"
yarn lint


## User Story 2 - Component Hierarchy

This user story is to create and manage an Activity Feed Page that displays a list of calls, both archived and unarchived.

### Component Hierarchy

- **App**: The main application component that houses the entire app structure.

- **Header**: Displays the header of the application with navigation controls.

- **ActivityFeedPage**: The page displaying unarchived calls.
  - **CallList**: Lists all unarchived calls.
    - **CallItem**: Displays detailed information about a call.

  - **ArchiveControls**: Contains buttons to archive/unarchive all calls.

- **ArchivedCallsPage**: The page displaying archived calls.
  - **CallList**: Lists all archived calls.
    - **CallItem**: Displays detailed information about a call.

  - **ArchiveControls**: Contains buttons to archive/unarchive all calls.

## User Story 3 - Design a Workflow Chart

**Duration**: 0.5 hour

This user story is to design a workflow chart to visually represent and streamline the process within the project.

### Tasks
- Create a visual representation of the project's workflow.
- Ensure the chart clearly outlines the process steps and their relationships.
- Use appropriate tools (e.g., Figma, Lucidchart) to design the workflow chart.

## User Story 4 - Create MainPage

**Duration**: 2 hours

This user story is to create a MainPage that displays a list of activity calls. The page should include a simple list of all unarchived calls and facilitate navigation between different pages.

### Tasks

1. **Set up Navigation State**
   - Use Jotai atoms to manage the current navigation state, which will determine which page is displayed.

2. **Create Page Components**
   - Define different components for each page:
     - **CallPage**: Displays the list of calls.
     - **PhoneNumberPage**: Manages phone number inputs and related actions.
     - **KeyPadPage**: Displays a keypad for input.
     - **SettingPage**: Provides settings and configuration options.

3. **Switch Components Based on Navigation State**
   - Use a Switch statement or condition rendering to display the appropriate page component based on the current navigation state.

### API Endpoints

#### Get Calls

- **Endpoint**: [https://aircall-backend.onrender.com/activities](https://aircall-backend.onrender.com/activities)
- **Method**: GET
- **Description**: This HTTP request retrieves a list of calls.

#### HTTP Response Success

- **Status**: 200 OK
- **Description**: Returns a list of calls.
- **Response Body**:
  ``json
  [
    {
      "direction": "string",
      "from": integer,
      "to": integer,
      "via": integer,
      "duration": integer,
      "is-archived": boolean,
      "call_type": "string",
      "id": "string",
      "created_at": "string",
      "price": integer
    }
  ]
#### HTTP Response Error

**Status**: 500 Internal Server Error  
**Description**: An error occurs while the server is processing the client’s request.  
**Response Body**:
``json
{
  "status": 500
}

## User Story 5 - Create StateChangeComponent

In this story, the functionality is implemented to change all calls that are not archived into archived calls.

### EndPoint

**URL**: `https://aircall-backend.onrender.com/activities`  
**Method**: `PATCH`  
**Description**: This HTTP request updates the status of calls to archived.  
**Parameter**: `/1`

### HTTP Response Success

**Status**: 200 OK  
**Description**: This HTTP response returns the updated list of calls.  
**Response Body**:
``json
[
    {
        "direction": "string",
        "from": integer,
        "to": integer,
        "via": integer,
        "duration": integer,
        "is-archived": boolean,
        "call_type": "string",
        "id": "string",
        "created_at": "string",
        "price": integer
    }
]

### HTTP Response Error

**Status**: 500 Internal Server Error  
**Description**: An error occurs while the server is processing the client’s request.  
**Response Body**:
``json
{
  "status": 500
}

## User Story 6 - Create CallListAndCallItem Component

In this story, the goal is to create a `CallListAndCallItem` component that displays different icons for each call type (inbound, outbound, missed, answered) and differentiates them based on the `from` and `to` fields.

### HTTP Request

**EndPoint**: `https://aircall-backend.onrender.com/activities`  
**Method**: `PATCH`  
**Description**: This HTTP request updates the status of calls.  
**Parameter**: `/1`

### HTTP Response Success

**Status**: 200 OK  
**Description**: This HTTP response returns the updated list of calls.  
**Response Body**:
``json
[
    {
        "direction": "string",
        "from": integer,
        "to": integer,
        "via": integer,
        "duration": integer,
        "is-archived": boolean,
        "call_type": "string",
        "id": "string",
        "created_at": "string",
        "price": integer
    }
]

### HTTP Response Error

**Status**: 500 Internal Server Error  
**Description**: An error occurs while the server is processing the client’s request.  
**Response Body**:
``json
{
  "status": 500
}

## User Story 7 - Create RenderGroupedCallsComponent - 3 hours

In this story, the goal is to develop a `RenderGroupedCallsComponent` that displays aggregated information about calls based on specific criteria: `from`, `to`, `date`, and `call_type`. The logic will involve using the `reduce` function to count and group calls according to these criteria.

## User Story 8 - Create CallItem Component - 2 hours

This story involves creating a `CallItem` component that displays the `to`, `from`, and icons to determine and display call types.

## User Story 9 - Create CallMenu Component - 2 hours

In this story, the task is to develop a `CallMenu` component. This component will manage the state of calls by allowing users to toggle the archive status of individual calls. Specifically, it will provide functionality to:

- Change Active Call to Archived: Update the status of an active (unarchived) call to archived.
- Change Archived Call to Active: Change the status of an archived call back to active (unarchived).

## User Story 10 - Display Navigation Icons - 0.5 hours

This story involves displaying navigation icons to handle `PhoneNumberListPage`, `KeyPadComponent`, and `SettingPage`.

## User Story 11 - Create PhoneNumberListPage - 1 hour

This story is to create a `PhoneNumberListPage` to display the current callers list.

## User Story 12 - Create KeyPadComponent - 1 hour

This story is to create a `KeyPadComponent` to call another person.

## User Story 13 - Create SettingPage - 1 hour

This story is to create a `SettingPage` to handle global color settings.

## User Story 14 - Unit Test - 1 hour

This user story involves writing unit tests for the React application. The goal is to ensure that the components and functionalities are thoroughly tested to verify they work as expected and to catch any potential bugs or issues early in the development process. The unit tests should cover various scenarios, including edge cases, to ensure robustness and reliability of the application.

- **Test Data Fetching**: Verify that the component correctly fetches and displays a list of calls from the API.
- **Test Rendering**: Confirm that each call is rendered with the correct details, including `from`, `to`, `direction`, `created_at`, and `call_type`.
- **Test Empty State**: Check how the component handles cases where no calls are available.

## User Story 15 - Deploy the Application - 1 hour

This user story involves deploying the React application to a hosting platform to make it accessible online. The goal is to ensure that the application is correctly deployed, fully functional, and available for review by stakeholders or recruiters.
