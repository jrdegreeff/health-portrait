# Health Portrait

TODO: description

## Running Locally

- Run `npm run serve`, which compiles the frontend for hot-reloading with webpack and serves it at port `8080`.
- Open a new terminal (with the original one still open) and run `npm run dev` to start the backend at port `3000`.
- To view the website, connect to [localhost:8080](http://localhost:8080)

## API Routes

TODO: document API routes

#### `GET /`

This renders the `index.html` file that will be used to interact with the backend

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
- A object with the created insurance card

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
- A object with the edited insurance card

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
- A object with the created medical contact

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
- A object with the edited medical contact

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
- A object with the created medication

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
- A object with the edited medication

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
