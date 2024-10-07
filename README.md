# Next.js GPT Boilerplate

This boilerplate provides a solid foundation for building GPT-powered applications using Next.js, with API documentation, authentication, and payments all pre-configured.

## Features

- **API Documentation Generation**: Automatically generates API docs based on the standard folder structure when endpoints are defined. You can find examples and structure inside the `api` folder.
- **Authentication**: Includes a custom Work OS Auth Kit layouts.
- **Payments Integration**: Configured with Razorpay for handling payments, with payment data lifecycle managed using **Drizzle ORM** in a SQL database.
- **UI Components**: UI components are built using **shadcn** for a seamless and responsive user interface.
- **Database ORM**: Uses **Drizzle ORM** for managing database interactions with defined schemas.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/JohnVersus/nextjs-gpt-boilerplate.git
cd nextjs-gpt-boilerplate
```

### 2. Install Dependencies

Ensure `pnpm` is installed. If not, install it globally:

```bash
npm install -g pnpm
```

Install project dependencies:

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file and add your environment variables:

```bash
API_KEY=test
NODE_ENV=development
SITE_URL=""

DB_NAME=xxx
DB_USER=xxx
DB_PASSWORD=xxx
DB_HOST=xxx

WORKOS_CLIENT_ID="client_..." # retrieved from the WorkOS dashboard
WORKOS_API_KEY="sk_test_..." # retrieved from the WorkOS dashboard
WORKOS_REDIRECT_URI="http://localhost:3000/callback" # configured in the WorkOS dashboard
WORKOS_COOKIE_PASSWORD="<your password>" # generate a secure password here

RAZORPAY_KEY_ID= "xxx"
RAZORPAY_KEY_SECRET: "xxx"
```

### 4. Setup Database

To generate the database schema and apply migrations:

```bash
pnpm run db:generate
pnpm run db:migrate
```

### 5. Start the Development Server

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

The `api` folder defines your API endpoints. This boilerplate includes demo endpoints for a bookstore (add, delete, fetch books). Refer to the `api` folder for more details.

## Authentication and Payments

- **Authentication**: Custom work OS authentication is set up under the `auth-layout` folder.
- **Payments**: Razorpay is integrated for handling payments, and payment data is stored using Drizzle ORM in a SQL database.

## UI Components

Pre-built UI components are implemented using shadcn library. You can customize them under the `components` folder, which includes:

- **Header**
- **Footer**
- **Hero**
- **Roadmap**

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---
