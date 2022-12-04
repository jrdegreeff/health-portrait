# Health Portrait

TODO: description

## Running Locally

- Run `npm run serve`, which compiles the frontend for hot-reloading with webpack and serves it at port `8080`.
- Open a new terminal (with the original one still open) and run `npm run dev` to start the backend at port `3000`.
- To view the website, connect to [localhost:8080](http://localhost:8080)

## API Routes

### Shared Account

#### `POST /api/accounts` - Create a shared account

**Body**

- `name` _{string}_ - The shared account owner's name
- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- The created shared account's details
- The username registered

**Throws**

- `403` if there is a user already logged in
- `400` if `name` is empty or missing
- `400` if `username` or `password` is not in correct format or missing
- `409` if `username` is already in use

#### `PATCH /api/accounts` - Update a shared account's details

**Body**

- `name` _{string}_ - The new name for the shared account

**Returns**

- A success message
- The updated shared account details

**Throws**

- `401` if the user is not logged in
- `400` if `name` is empty

#### `DELETE /api/accounts` - Delete a shared account

**Returns**

- A success message

**Throws**

- `401` if the user is not logged in

#### `POST /api/accounts/credentials` - Create a credential for a shared account

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- The created shared account's details

**Throws**

- `401` if the user is not logged in
- `400` if `username` or `password` is not in correct format or missing
- `409` if `username` is already in use

#### `PATCH /api/accounts/credentials` - Update the session credential's details

**Body**

- `username` _{string}_ - The user's new username (optional)
- `password` _{string}_ - The user's new password (optional)

**Returns**

- A success message
- The updated shared account details
- The updated username

**Throws**

- `401` if the user is not logged in
- `400` if `username` or `password` is not in correct format
- `400` if `username` and `password` are both missing

#### `DELETE /api/accounts/credentials/:username` - Delete a credential from the shared account

**Returns**

- A success message
- The updated shared account details

**Throws**

- `401` if the user is not logged in
- `404` if no credential with username `username` exists
- `403` if the credential `username` doesn't belong to the user's shared account

#### `GET /api/accounts/session` - Get the session shared account

**Returns**

- A success message
- The signed in shared account's details, or null if not signed in
- The username used to authenticate, or null if not signed in

#### `POST /api/accounts/session` - Sign in user

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- The shared account's details
- The username used to authenticate

**Throws**

- `403` if the user is already logged in
- `400` if username or password is not in correct format or missing
- `401` if the user login credentials are invalid

#### `DELETE /api/accounts/session` - Sign out user

**Returns**

- A success message

**Throws**

- `401` if user is not logged in

### Insurance Card

#### `GET /api/insurance-cards` - Get a user's insurance cards

**Returns**

- An array of insurance cards created by the user in alphabetical order with respect to their purpose

**Throws**

- `401` if user is not logged in

#### `POST /api/insurance-cards` - Create a new insurance card

**Body**

- `subscriber_name` _{string}_ - The insurance card's subscriber
- `member_id` _{string}_ - The insurance card's member ID (optional)
- `group_number` _{string}_ - The insurance card's group number (optional)
- `plan_number` _{string}_ - The insurance card's plan number (optional)
- `plan_type` _{string}_ - The insurance card's plan type (optional)
- `purpose` _{string}_ - The insurance card's purpose 
- `notes` _{string}_ - Notes about the insurance card (optional)

**Returns**

- A success message
- A object with the created insurance card

**Throws**

- `401` if the user is not logged in
- `400` If the subscriber_name or purpose is empty or a stream of empty spaces

#### `PATCH /api/insurance-cards/:insuranceCardId` - Edit the information of an insurance card

**Body**

- `subscriber_name` _{string}_ - The insurance card's subscriber (optional)
- `member_id` _{string}_ - The insurance card's member ID (optional)
- `group_number` _{string}_ - The insurance card's group number (optional)
- `plan_number` _{string}_ - The insurance card's plan number (optional)
- `plan_type` _{string}_ - The insurance card's plan type (optional)
- `purpose` _{string}_ - The insurance card's purpose (optional)
- `notes` _{string}_ - Notes about the insurance card (optional)

**Returns**

- A success message
- A object with the edited insurance card

**Throws**

- `401` if the user is not logged in
- `403` if the user is not the owner of the insurance card
- `400` If the subscriber_name or purpose is empty or a stream of empty spaces
- `404` if the insuranceCardId is invalid

#### `DELETE /api/insuranceCards/:insuranceCardId` - Delete an insurance card

**Returns**

- A success message

**Throws**

- `401` if the user is not logged in
- `403` if the user is not the owner of the insurance card
- `404` if the insuranceCardId is invalid

### Medical Contact 

#### `GET /api/medical-contacts` - Get a user's medical contacts

**Returns**

- An array of medical contacts created by user in alphabetical order with respect to the last name of the contact

**Throws**

- `401` if the user is not logged in 

#### `POST /api/medical-contacts` - Create a new medical contact

**Body**

- `active` _{string}_ - Whether the medical contact is in use or not 
- `title` _{string}_ - The medical contact's title 
- `first_name` _{string}_ - The medical contact's first name
- `last_name` _{string}_ - The medical contact's last name 
- `hospital` _{string}_ - The medical contact's associated hospital  
- `specialty` _{string}_ - The medical contact's specialty 
- `phone_number` _{string}_ - The medical contact's phone number 
- `notes` _{string}_ - Notes about the medical contact

**Returns**

- A success message
- A object with the created medical contact

**Throws**

- `401` if the user is not logged in
- `400` If the first_name or last_name is empty or a stream of empty spaces
- `400` If the phone_number is not a valid phone number (https://stackoverflow.com/a/16699507)

#### `PATCH /api/medical-contacts/:medicalContactId` - Edit the information of a medical contact

**Body**

- `active` _{string}_ - Whether the medical contact is in use or not (optional)
- `title` _{string}_ - The medical contact's title (optional)
- `first_name` _{string}_ - The medical contact's first name (optional)
- `last_name` _{string}_ - The medical contact's last name (optional)
- `hospital` _{string}_ - The medical contact's associated hospital (optional)
- `specialty` _{string}_ - The medical contact's specialty (optional)
- `phone_number` _{string}_ - The medical contact's phone number (optional)
- `notes` _{string}_ - Notes about the medical contact (optional)

**Returns**

- A success message
- A object with the edited medical contact

**Throws**

- `401` if the user is not logged in
- `403` if the user is not the owner of the medical contact
- `400` If the first_name or last_name is empty or a stream of empty spaces
- `400` If the phone_number is not a valid phone number (https://stackoverflow.com/a/16699507)
- `404` if the medicalContactId is invalid

#### `DELETE /api/medical-contacts/:medicalContactId` - Deactivates a medical contact

**Returns**

- A success message

**Throws**

- `401` if the user is not logged in
- `403` if the user is not the owner of the medical contacts
- `404` if the medicalContactId is invalid
- `409` if the medicalContactId is already deactivated 

### Medication 

#### `GET /api/medications` - Get a user's medications

**Returns**

- An array of medications created by the user in alphabetical order with respect to the name of the medication

**Throws**

- `401` if the user is not logged in 

#### `POST /api/medications` - Create a new medication

**Body**

- `name` _{string}_ - The medication's name
- `generic_name` _{string}_ - The medication's generic compound name
- `dose` _{string}_ - The medication's dose
- `notes` _{string}_ - Notes about the medication

**Returns**

- A success message
- A object with the created medication

**Throws**

- `401` if the user is not logged in
- `400` If the name, generic_name, or dose is empty or a stream of empty spaces

#### `PATCH /api/medications/:medicationId` - Edit the information of a medication

**Body**

- `name` _{string}_ - The medication's name (optional)
- `generic_name` _{string}_ - The medication's generic compound name (optional)
- `dose` _{string}_ - The medication's dose (optional)
- `notes` _{string}_ - Notes about the medication (optional)

**Returns**

- A success message
- A object with the edited medication

**Throws**

- `401` if the user is not logged in
- `403` if the user is not the owner of the medication
- `400` If the name, generic_name, or dose is empty or a stream of empty spaces
- `404` if the medicationId is invalid

#### `DELETE /api/medications/:medicationId` - Deactivates a medication

**Returns**

- A success message

**Throws**

- `401` if the user is not logged in
- `403` if the user is not the owner of the medication
- `404` if the medicationId is invalid
- `409` if the medicationId is already deactivated 

### Entry

#### `GET /api/entries` - Get all entries of the user

**Returns**
- The array of entries by the user sorted in descending order by date

**Throws** 
- `401` if the user is not logged in

#### `POST /api/entries` - Make a new entry in the log

**Body**
- `type` _{string}_ - The type of the log entry
- `detail` _{string}_ - The detail of the log entry
- `notes` _{string}_ - The log entry's notes (optional)
- `date` _{Date}_ - The date associated with the log entry

**Returns**
- A success message
- The newly created entry object

**Throws** 
- `401` if the user is not logged in
- `400` if the `type` or `detail` is empty or a stream of empty spaces, or if given `type` is not in specified set of valid types, or if `date` is empty/an invalid timestamp

#### `PATCH /api/entries/:entryId` - Editing an entry in the log

**Body**
- `type` _{string}_ - The type of the log entry (optional)
- `detail` _{string}_ - The detail of the log entry (optional)
- `notes` _{string}_ - The log entry's notes (optional)
- `date` _{Date}_ - The date associated with the log entry (optional)

**Returns**
- A success message
- The updated entry object

**Throws** 
- `401` if the user is not logged in
- `404` if the `entryId` is invalid
- `403` if the user is not the owner of the entry
- `404` if given `type` is non-empty and not in specified set of valid types

#### `DELETE /api/entries/:entryId` - Delete an entry in the log

**Returns**
- A success message

**Throws** 
- `401` if the user is not logged in
- `404` if the `entryId` is invalid
- `403` if the user is not the owner of the entry


### Trend

#### `GET /api/trends` - Get all trends for a given user  
**Returns**  
- An array of trends created by user with given username (taken from session)  
**Throws**  
- `401` if the user is not logged in

#### `GET /api/trends` - Get trend (set of points) that includes a given set of items (log entries)  
**Body**  
- `items` _{array<string>}_ - Set of items to be plotted in the trend  
- `title` _{string}_ - The title of the graph  
- `start_date` _{date}_ - Date from which to start plotting the trend graph  
- `end_date` _{date}_ - Date at which to finish plotting the trend graph  
**Returns**  
- An array of points (one trend)  
**Throws**  
- `400` if the items, title, start_date, or end_date is empty/a stream of empty spaces  
- `401` if the user is not logged in  

#### `POST /api/trends` - Add a point to a trend  
**Body**  
- `item` _{string}_ - Log entry to be added to trend  
- `title` _{string}_ - The title of the graph  
- `date` _{date}_ - The date when the entry was logged
- `value` _{int}_ - The value of the condition scale (1-5) from the first point  
**Returns**  
- A success message  
- A object with the created point  
**Throws**  
- `400` If the item, title, date, or value content is empty/a stream of empty spaces  
- `400` If the title is not one of "pain," "happiness," or "cognition"  
- `400` If the value is not one of {1, 2, 3, 4, 5}
- `401` if the user is not logged in  

#### `PATCH /api/trends/:pointId` - Update an existing point's label  
**Body**  
- `value` _{int}_ - A new value of the condition scale (1-5)  
- `date` _{date}_ - A new date  
- `title` _{string}_ - A new title of the point  
**Returns**  
- A success message  
- An object with the updated point  
**Throws**  
- `400` if the new point value, date, or title is empty  
- `400` If the title is not one of "pain," "happiness," or "cognition"  
- `400` If the value is not one of {1, 2, 3, 4, 5}  
- `401` if the user is not logged in  
- `402` if the user is not the creator of the point  
- `404` if the pointId is invalid  

#### `DELETE /api/trends/:pointId` - Delete an existing point  
**Returns**  
- A success message  
**Throws**  
- `401` if the user is not logged in  
- `403` if the user is not the creator of the point  
- `404` if the pointId is invalid  
