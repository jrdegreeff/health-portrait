# Health Portrait

TODO: description

## Running Locally

- Run `npm run serve`, which compiles the frontend for hot-reloading with webpack and serves it at port `8080`.
- Open a new terminal (with the original one still open) and run `npm run dev` to start the backend at port `3000`.
- To view the website, connect to [localhost:8080](http://localhost:8080)

## API Routes

### Shared Account

#### `POST /api/accounts` - Create an new shared account

**Body**

- `name` _{string}_ - The account owner's name
- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- The created shared account's details

**Throws**

- `403` if there is a user already logged in
- `400` if `name` is empty or missing
- `400` if `username` or `password` is not in correct format or missing
- `409` if `username` is already in use

#### `PATCH /api/accounts` - Update a shared account's details

**Body**

- `name` _{string}_ - The new name

**Returns**

- A success message
- The updated shared account details

**Throws**

- `401` if the user is not logged in
- `400` if `name` is empty

#### `DELETE /api/accounts` - Delete shared account

**Returns**

- A success message

**Throws**

- `401` if the user is not logged in

#### `POST /api/accounts/credentials` - Create an new credential for a shared account

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

- `username` _{string}_ - The new username (optional)
- `password` _{string}_ - The new password (optional)

**Returns**

- A success message

**Throws**

- `401` if the user is not logged in
- `400` if `username` or `password` is not in correct format
- `400` if `username` and `password` are both missing

#### `DELETE /api/accounts/credentials/:username` - Delete a credential from the shared account

**Returns**

- A success message

**Throws**

- `401` if the user is not logged in
- `404` if no credential with username `username` exists
- `403` if the credential `username` doesn't belong to the user's account

#### `POST /api/users/session` - Sign in user

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- The shared account's details

**Throws**

- `403` if the user is already logged in
- `400` if username or password is not in correct format or missing
- `401` if the user login credentials are invalid

#### `DELETE /api/users/session` - Sign out user

**Returns**

- A success message

**Throws**

- `401` if user is not logged in

### Insurance Card

#### `GET /api/insuranceCards?owner=USERNAME` - Get insurance cards by owner

**Returns**

- An array of insurance cards created by user with username `owner` in alphabetical order with respect to their purpose

**Throws**

- `400` if `owner` is not given
- `404` if `owner` is not a recognized username of any user

#### `GET /api/insuranceCards?purpose=PURPOSE` - Get insurance cards by purpose

**Returns**

- An array of insurance cards with purpose `PURPOSE` in alphabetical order with respect to their purpose

**Throws**

- `400` if `PURPOSE` is not given

#### `POST /api/insuranceCards` - Create a new insurance card

**Body**

- `subscriber_name` _{string}_ - The insurance card's subscriber
- `member_id` _{string}_ - The insurance card's member ID
- `group_number` _{string}_ - The insurance card's group number
- `plan_number` _{string}_ - The insurance card's plan number
- `plan_type` _{string}_ - The insurance card's plan type
- `purpose` _{string}_ - The insurance card's purpose
- `notes` _{string}_ - Notes about the insurance card

**Returns**

- A success message
- An object with the created insurance card

**Throws**

- `403` if the user is not logged in
- `400` If the subscriber_name or purpose is empty or a stream of empty spaces

#### `PATCH /api/insuranceCards/:insuranceCardId?` - Edit the information of an insurance card

**Body**

- `subscriber_name` _{string}_ - The insurance card's subscriber
- `member_id` _{string}_ - The insurance card's member ID
- `group_number` _{string}_ - The insurance card's group number
- `plan_number` _{string}_ - The insurance card's plan number
- `plan_type` _{string}_ - The insurance card's plan type
- `purpose` _{string}_ - The insurance card's purpose
- `notes` _{string}_ - Notes about the insurance card

**Returns**

- A success message
- An object with the edited insurance card

**Throws**

- `403` if the user is not logged in
- `400` If the subscriber_name or purpose is empty or a stream of empty spaces

#### `DELETE /api/insuranceCards/:insuranceCardId?` - Delete an insurance card

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the owner of the insurance card
- `404` if the insuranceCardId is invalid

### Medical Contact

#### `GET /api/medicalContacts?owner=USERNAME` - Get medical contacts by owner

**Returns**

- An array of medical contacts created by user with username `owner` in alphabetical order with respect to the last name of the contact

**Throws**

- `400` if `owner` is not given
- `404` if `owner` is not a recognized username of any user

#### `POST /api/medicalContacts` - Create a new medical contact

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
- An object with the created medical contact

**Throws**

- `403` if the user is not logged in
- `400` If the first_name, last_name, or phone_number is empty or a stream of empty spaces

#### `PATCH /api/medicalContacts/:medicalContactId?` - Edit the information of a medical contact

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
- An object with the edited medical contact

**Throws**

- `403` if the user is not logged in
- `400` If the first_name, last_name, or phone_number is empty or a stream of empty spaces

#### `DELETE /api/medicalContacts/:medicalContactId?` - Delete a medical contact

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the owner of the medical contacts
- `404` if the medicalContactId is invalid

### Medication

#### `GET /api/medications?owner=USERNAME` - Get medications by owner

**Returns**

- An array of medications created by user with username `owner` in alphabetical order with respect to the name of the medication

**Throws**

- `400` if `owner` is not given
- `404` if `owner` is not a recognized username of any user

#### `GET /api/medications?name=NAME` - Get medications by name

**Returns**

- An array of medications with name `NAME` in alphabetical order with respect to the name of the medication

**Throws**

- `400` if `NAME` is not given

#### `POST /api/medications` - Create a new medication

**Body**

- `active` _{string}_ - Whether the medication is in use or not
- `name` _{string}_ - The medication's name
- `generic_name` _{string}_ - The medication's generic compound name
- `dose` _{string}_ - The medication's dose
- `notes` _{string}_ - Notes about the medication

**Returns**

- A success message
- An object with the created medication

**Throws**

- `403` if the user is not logged in
- `400` If the name, generic_name, or dose is empty or a stream of empty spaces

#### `PATCH /api/medications/:medicationId?` - Edit the information of a medication

**Body**

- `active` _{string}_ - Whether the medication is in use or not
- `name` _{string}_ - The medication's name
- `generic_name` _{string}_ - The medication's generic compound name
- `dose` _{string}_ - The medication's dose
- `notes` _{string}_ - Notes about the medication

**Returns**

- A success message
- An object with the edited medication

**Throws**

- `403` if the user is not logged in
- `400` If the name, generic_name, or dose is empty or a stream of empty spaces

#### `DELETE /api/medications/:medicationId?` - Delete a medication

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the owner of the medication
- `404` if the medicationId is invalid

### Entry

TODO: Linda


### Trend

#### `GET /api/trends` - Get all trends for a given user  
**Returns**  
- An array of trends created by user with given username (taken from session)  
**Throws**  
- `400` if `user` is not found in session  
- `404` if `user` (taken from session) is not a recognized username of any user  

#### `POST /api/trends` - Create a new trend  
**Body**  
- `category` _{string}_ - “Appointment,” “procedure,” or “medication;” for filtering purposes  
- `title` _{string}_ - The title of the graph  
- `value` _{int}_ - The value of the condition scale (1-5) from the first point  
**Returns**  
- A success message  
- A object with the created trend  
**Throws**  
- `403` if the user is not logged in  
- `400` If the category, title, or value content is empty/a stream of empty spaces  

#### `DELETE /api/trends/:trendId` - Delete an existing trend  
**Returns**  
- A success message  
**Throws**  
- `403` if the user is not logged in  
- `403` if the user is not the creator of the trend  
- `404` if the trendId is invalid  

#### `PUT /api/trends/:trendId` - Update an existing trend  
**Body**  
- `value` _{int}_ - A new value of the condition scale (1-5), from a new log  
**Returns**  
- A success message  
- An object with the updated trend  
**Throws**  
- `403` if the user is not logged in  
- `404` if the trendId is invalid  
- `403` if the user is not the author of the trend  
- `400` if the new point value is empty  
