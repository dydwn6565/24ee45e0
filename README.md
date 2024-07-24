Aircall React Application
Overview
The goal of this project is to create a small ReactJS application to display a list of calls, view call details, and manage archived calls. This README provides an overview of the features, installation instructions, API usage, and other relevant information to help you understand and work with the project.

User Stories
#	User Story	Description	Estimate (hours)
1	Project Setup	Set up the project environment with the necessary tools and dependencies.	0.5
2	Component Hierarchy	Decide the structure of the components.	0.5
3	Design a Workflow Chart	Design a workflow chart to visually represent and streamline the project process.	0.5
4	Create Activity Feed Page	Create a page displaying a list of unarchived calls.	2
5	Display Activity Details on Activity Feed Page	Display detailed information about each unarchived call on the activity feed page.	1
6	Create Archive Page	Create a page displaying a list of archived calls.	2
7	Display Archive Details on Archived Page	Display detailed information about each archived call on the archive page.	1
8	Button to Archive All Calls and Unarchive All Calls	Implement functionality to archive all calls and unarchive all calls.	0.5
9	Unit Test	Analyze and write unit tests for the application.	1
10	Deploy the Application	Deploy the application to a hosting platform (e.g., Vercel).	1
User Story Details
User Story 1 - Project Setup
Objective: Set up the project environment for development.

Clone the Repository:

bash
Copy code
git clone https://github.com/speer-technologies/aircall.git
cd aircall
Set Up Node Version:

bash
Copy code
nvm install 16
nvm use 16
Install Project Dependencies:

bash
Copy code
npm install -g yarn
yarn install
Enhance UX/UI with Material UI:

bash
Copy code
yarn add @mui/material @emotion/react @emotion/styled
Update React Version:

bash
Copy code
yarn add react@18 react-dom@18
Install react-icons:

bash
Copy code
yarn add react-icons
Install Jotai for State Management:

bash
Copy code
yarn add jotai
Install and Configure ESLint:

bash
Copy code
yarn add eslint@7.32.0 prettier@2.3.2 eslint-config-prettier@8.3.0 eslint-plugin-prettier@3.4.0 eslint-plugin-react@7.24.0 --dev
yarn add eslint@7.32.0 eslint-plugin-react@7.27.1 babel-eslint@10.1.0 prettier --dev
yarn add eslint-plugin-react-hooks --dev
npx husky install
npx husky add .husky/pre-commit "yarn lint"
User Story 2 - Component Hierarchy
Objective: Define the component hierarchy for the application.

App: The main application component.
Header: Displays the header with navigation controls.
ActivityFeedPage: Displays unarchived calls.
CallList & CallItem: List and detail of unarchived calls.
ArchiveControls: Buttons to archive/unarchive all calls.
ArchivedCallsPage: Displays archived calls.
CallList & CallItem: List and detail of archived calls.
ArchiveControls: Buttons to archive/unarchive all calls.
User Story 3 - Design a Workflow Chart
Objective: Design a workflow chart to streamline the project process.

User Story 4 - Create Activity Feed Page
Objective: Create a page to display a list of unarchived calls.

API Endpoint: https://aircall-backend.onrender.com/activities
Method: GET
Success Response: Returns a list of calls with details.
User Story 5 - Display Activity Details
Objective: Display detailed information about unarchived calls.

User Story 6 - Create Archive Page
Objective: Create a page to display a list of archived calls.

API Endpoint: https://aircall-backend.onrender.com/activities
Method: GET
Success Response: Returns a list of archived calls with details.
User Story 7 - Display Archive Details
Objective: Display detailed information about archived calls.

User Story 8 - Archive and Unarchive All Calls
Objective: Implement functionality to archive and unarchive all calls.

API Endpoint: https://aircall-backend.onrender.com/activities/<call_id>
Method: PATCH
Success Response: Updates call archive status.
User Story 9 - Unit Test
Objective: Write unit tests for the application to ensure components and functionalities work as expected.

Test Scenarios:
Fetch and display a list of calls.
Render call details correctly.
Handle empty state.
User Story 10 - Deploy the Application
Objective: Deploy the application to a hosting platform like Vercel.