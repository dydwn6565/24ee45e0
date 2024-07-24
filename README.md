# Aircall

## User Stories

| #  | User Story                                                | Description                                                                                                    | Estimate (hour) |
|----|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------|
| 1  | Project Setup                                             | This story is about how to set up a project with pre-requirement.                                              | 0.5             |
| 2  | Component Hierarchy                                       | This story is to decide the structure of the components.                                                         | 0.5             |
| 3  | Design a Workflow Chart                                  | This story is to design the workflow chart.                                                                     | 0.5             |
| 4  | Create Activity Feed Page                                | This story is to create an activity feed page with an activity feed call list.                                 | 2               |
| 5  | Display Activity Detail on Activity Feed Page            | This story is to display activity details on the create activity feed page.                                     | 1               |
| 6  | Create Archive Page                                      | This story is to create an archive page with an archive call list.                                              | 2               |
| 7  | Display Archive Details on Archived Page                 | This story is to create an archive detail page.                                                                 | 1               |
| 8  | Button to Archive All Calls and Unarchive All Calls       | This story is to create the function to handle all archive calls to unarchive calls vice versa.                 | 0.5             |
| 9  | Unit Test                                                 | This story is to analyze the unit test point and state it.                                                        | 1               |
| 10 | Deploy the Application                                   | This story is about deploying this application on Vercel.                                                        | 1               |

## User Story 2 - Component Hierarchy (0.5 hour)

This user story is to create and manage an activity feed page that displays a list of calls, both archived and unarchived.

### Component Hierarchy

- **App**: The main application component that houses the entire app structure.
- **Header**: Displays the header of the application with navigation controls.
- **ActivityFeedPage**: The page displaying unarchived calls.
  - **CallList**: Displays a list of calls.
  - **CallItem**: Displays details for each call.
  - **ArchiveControls**: Contains buttons to archive/unarchive all calls.
- **ArchivedCallsPage**: The page displaying archived calls.
  - **CallList**: Displays a list of archived calls.
  - **CallItem**: Displays details for each archived call.
  - **ArchiveControls**: Contains buttons to archive/unarchive all calls.

## User Story 3 - Design a Workflow Chart (0.5 hour)

This story is to design a workflow chart to visually represent and streamline the process within the project.

## User Story 4 - Create Activity Feed Page (2 hours)

This story is to create an activity feed page that displays a list of activity calls. The page should include a simple list of all unarchived calls.

### HTTP Request

- **Endpoint:** `https://aircall-backend.onrender.com/activities`
- **Method:** GET
- **Description:** This HTTP request is to get the calls.

### HTTP Response Success

- **Status:** 200
- **Description:** This HTTP response returns the calls list.
- **Parameter:**
    json
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

## HTTP Response Error

### Status
**500 (Internal Server Error)**  
Error occurs while the server is in process to respond to the client’s request.  
    json
{
    "status": 500
}

### User Story 5 - Display Activity Details on Activity Feed Page - 1 hour
This story is to display the details of an unarchived call. The details include:
- Direction (inbound or outbound)
- Sender’s number (`from`)
- Recipient’s number (`to`)
- Aircall number (`via`)
- Duration of the call
- Call type (`call_type`)
- Date and time (`created_at`)
- Archive status
- Unique identifier (`id`)

### User Story 6 - Create Archive Page - 2 hours
This user story is to create an archive page that displays a list of archived calls. The page should include a simple list of all archived calls.

#### HTTP Request

**EndPoint**  
`https://aircall-backend.onrender.com/activities`

**Method**  
GET

**Description**  
This HTTP request is to get the calls.

#### HTTP Response Success

**Status**  
200

**Description**  
This HTTP response returns the calls list.  
    json
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
        "created_at": string,
        "price": integer
    }
]

## HTTP Response Error

### Status
**500 (Internal Server Error)**  
Error occurs while the server is in process to respond to the client’s request.  
    json
{
    "status": 500
}

### User Story 7 - Display Archive Details on Archived Page - 1 hour
This story is to display the details of an archived call. The details include:
- Direction (inbound or outbound)
- Sender’s number (`from`)
- Recipient’s number (`to`)
- Aircall number (`via`)
- Duration of the call
- Call type (`call_type`)
- Date and time (`created_at`)
- Archive status
- Unique identifier (`id`)

### User Story 8 - Button to Archive All Calls and Unarchive All Calls - 0.5 hour
This story is to change all unarchived calls to archived calls and vice versa.

#### HTTP Request

**EndPoint**  
`https://aircall-backend.onrender.com/activities/<call_id>`

**Method**  
PATCH

**Description**  
This HTTP request is to update the calls.

#### HTTP Response Success

**Status**  
200

**Description**  
This HTTP response returns the calls list.  
    json
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
        "created_at": string,
        "price": integer
    }
]

### Status
**500 (Internal Server Error)**  
Error occurs while the server is in process to respond to the client’s request.  
    json
{
    "status": 500
}

### User Story 9 - Unit Test - 1 hour
This user story involves writing unit tests for the React application. The goal is to ensure that the components and functionalities are thoroughly tested to verify they work as expected and to catch any potential bugs or issues early in the development process. The unit tests should cover various scenarios, including edge cases, to ensure robustness and reliability of the application.

**Test Scenarios:**
- **Data Fetching:** Verify that the component correctly fetches and displays a list of calls from the API.
- **Rendering:** Confirm that each call is rendered with the correct details, including `from`, `to`, `direction`, `created_at`, and `call_type`.
- **Empty State:** Check how the component handles cases where no calls are available.

### User Story 10 - Deploy the Application - 1 hour
This user story involves deploying the React application to a hosting platform to make it accessible online. The goal is to ensure that the application is correctly deployed, fully functional, and available for review by stakeholders or recruiters.