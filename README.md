# [Timeturner](https://harrypotter.fandom.com/wiki/Time-Turner)

## Requirements Gathering

### Functional Requirements

-   User Authentication
    -   Signup
    -   login
    -   logout
-   Add/Edit/Delete Tasks/Topics
-   Categorize topics (DSA, System Design)
-   Track time spent on each topic
    -   Start and Stop timer for tasks
    -   View tasks list with time spent
    -   Generate reports on time spent per category and task

### Non-Functional Requirements

-   Responsive design (works on desktop and mobile)
-   Secure user data storage
-   Fast load times and real-time updates

## System Design

### High Level Design

-   **Architecture**
    -   **Frontend:** React with Typescript
    -   **Backend:** Node.js with Express and Typescript
    -   **Database:** MongoDB
-   Auth Service
-   Tasks Service
-   Reports Service
-   Tracker Service

### Low Level Design

-   **Components:**

    -   **HomePage:**

        -   List of tasks & its sub-tasks with title, and total time spent.
        -   Each task having accordian showing history of time spent.
        -   Add new task button
        -   Edit and delete options for each task
        -   Quick access button to start timer
        -   Each Task have a start timer button to start specifically

    -   **TrackerPage:**

        -   Current Task name and description
        -   Timer Display
        -   Start/Stop Button

    -   **DashboardPage:**

        -   Displays google like calendar and shows time spent on that calendar daywise
        -   Display pi charts showing time spent topic wise.

    -   **LoginPage:** Login and Signup

-   **Routes:**
    -   **/auth:** Handle user authentication
    -   **/tasks:** CRUD operations for tasks
    -   **/track:** Record time entries

### Database Design

-   Users

    ```ts
    interface User {
        _id: ObjectId;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }
    ```

-   Tasks

    ```ts
    interface Task {
        _id: ObjectId;
        userId: ObjectId(User);
        title: string;
        description: string;
        status: "active" | "completed";
        parent: ObjectId(Task) | NULL;
        createdAt: Date;
        updatedAt: Date;
    }
    ```

-   TimeEntries

    ```ts
    interface TimeEntry {
        _id: ObjectId;
        userId: ObjectId(User);
        taskId: ObjectId(Task);
        startTime: Date;
        endTime: Date;
        duration: number; // in seconds
        createdAt: Date;
        updatedAt: Date;
    }
    ```

## Implementation

### Create project folder

-   `mkdir time-turner && cd time-turner`

### Initialize project

-   `npm init`
-   `git init`
-   `code .gitignore`

    ```gitignore
    # Dependencies
    node_modules/

    # Production Build
    dist/
    build/

    # Logs
    *.log

    # Editor
    .vscode/*

    # OS generated files
    .DS_Store

    # Environment variables
    .env

    # Parcel-specific
    .parcel-cache/
    .cache/
    ```

### Configure project version (NVM)

-   `echo $(node -v) >> .nvmrc` // DO NOT DO THIS IF YOU ALREADY HAVE .nvmrc FILE
-   `echo "engine-strict=true" >> .npmrc` // DO NOT DO THIS IF YOU ALREADY HAVE .npmrc FILE
-   NVM Installation
    -   Check if NVM already exists, if not continue
        -   `nvm -v`
    -   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
    -   Refresh terminal config
        -   `source ~/.bashrc` // FOR LINUX USERS
        -   `source ~/.zshrc` // FOR MAC USERS
-   Update version using nvm
    -   `nvm install`
    -   `nvm use`
-   Update `package.json` file

    ```json
    {
        "engines": {
            "node": ">=20.12.2",
            "npm": ">=10.8.2"
        }
    }
    ```

### Setup Express

-   Install Express.js
    -   `npm i express`
-   Install Nodemon
    -   `npm i -D nodemon`
-   Update `package.json` scripts

    ```json
    {
        "scripts": {
            "start": "NODE_ENV=production node dist/server.js",
            "dev": "npx nodemon dist/server.js"
        }
    }
    ```

### Setup Typescript

-   Install Typescript and necessary types
    -   `npm i -D typescript @types/node @types/express`
-   Create a TypeScript configuration file (tsconfig.json)
    -   `npx tsc --init`
-   Update Configuration

    -   `code tsconfig.json`

        ```json
        {
            "compilerOptions": {
                "target": "es2016",
                "module": "commonjs",
                "rootDir": "./src",
                "outDir": "./dist",
                "moduleResolution": "node",
                "esModuleInterop": true,
                "forceConsistentCasingInFileNames": true,
                "strict": true,
                "skipLibCheck": true,

                "removeComments": true,
                "noImplicitThis": true,
                "noImplicitAny": true,
                "strictNullChecks": true,
                "strictBindCallApply": true,
                "noUnusedLocals": true,
                "noImplicitReturns": true,
                "noUnusedParameters": true,
                "resolveJsonModule": true,
                "strictFunctionTypes": true,
                "resolveJsonModule": true
            },
            "exclude": ["node_modules"],
            "include": ["./src/**/*.ts"]
        }
        ```

-   Enable Cold Reloading
    -   `npm install -D ts-node`
-   Update nodemon.json

    -   `code nodemon.json`

        ```json
        {
            "watch": ["src"],
            "ext": ".ts,.js",
            "ignore": [],
            "exec": "npx ts-node ./src/server.ts"
        }
        ```

-   Update `package.json` scripts

    ```json
    {
        "scripts": {
            "start": "NODE_ENV=production node dist/server.js",
            "dev": "npx nodemon",
            "build": "npx tsc"
        }
    }
    ```

### Setup Prettier

-   Install prettier
    -   `npm install --save-dev --save-exact prettier`
    -   `node --eval "fs.writeFileSync('.prettierrc','{}\n')"`
-   Setup Husky
    -   `npm i husky lint-staged`
    -   `npx husky init`
    -   `node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"`
-   Add the following to `package.json`

    ```json
    {
        "lint-staged": {
            "**/*": "prettier --writ  e --ignore-unknown"
        }
    }
    ```

-   Add the following to `.prettierrc`

    -   `code .prettierrc`

        ```json
        {
            "printWidth": 80,
            "tabWidth": 4,
            "semi": true,
            "singleQuote": true,
            "jsxSingleQuote": true
        }
        ```

### Setup ESLint

-   Install Dependencies
    -   `npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-airbnb-base eslint-plugin-import eslint-config-prettier eslint-plugin-prettier`
-   `code .eslintrc.js`
    ```js
    module.exports = {
        root: true,
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint'],
        extends: [
            'airbnb-base',
            'plugin:@typescript-eslint/recommended',
            'prettier/@typescript-eslint',
            'plugin:prettier/recommended',
            'plugin:import/errors',
            'plugin:import/warnings',
            'plugin:import/typescript',
        ],
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        rules: {
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                },
            ],
            'no-console': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            'import/prefer-default-export': 'off',
            indent: ['error', 4, { SwitchCase: 1 }],
        },
    };
    ```
-   `code .eslintignore`

    ```txt
    node_modules
    dist
    coverage
    ```

-   update package.json
    ```json
    {
        "scripts": {
            "start": "NODE_ENV=production node dist/server.js",
            "dev": "npx nodemon",
            "build": "npx tsc",
            "prepare": "husky",
            "lint": "eslint . --ext .js,.ts",
            "lint:fix": "eslint . --ext .js,.ts --fix"
        }
    }
    ```

### Hello World

`src/app.ts`

```typescript
import express, { Response } from 'express';

const app = express();

app.get('/', (req, res: Response) => {
    return res.status(200).json({ msg: 'Hello World!' });
});

export default app;
```

`src/server.ts`

```typescript
import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### Folder Structure

```txt
Portfolio
|\_ .github/
|\_ .husky/
|\_ dist/
|\_ node_modules/
|\_ src/
    |\_ config/
        |\_ mongodb.ts
    |\_ controllers/
    |\_ docs/
        |\_ api/
        |\_ swagger/
    |\_ interfaces/
    |\_ middlewares/
    |\_ models/
    |\_ public/
        |\_ client/
    |\_ routes/
        |\_ v1/
    |\_ services/
    |\_ utils/
        |\_ constants/
        |\_ exceptions/
        |\_ helpers/
    |\_ validators/
    |\_ app.ts
    |\_ server.ts
|\_ .env
|\_ .env.sample
|\_ .gitignore
|\_ .npmrc
|\_ .nvmrc
|\_ .prettierrc
|\_ .eslint.config.mjs
|\_ nodemon.json
|\_ package-lock.json
|\_ package.json
|\_ README.md
|\_ tsconfig.json
```

### Error Handling

TODO: https://github.com/Dhamareshwarakumar/time-turner/commit/95cb7ad696d301038266df632a92d051d1e9175d

### Database (MongoDB) Setup

-   Install Mongoose

    -   `npm install mongoose`

-   Create Connection file

    -   `code config/db.ts`

    ```ts
    import mongoose from 'mongoose';

    const connectDB = () => {
        if (process.env.NODE_ENV !== 'development') {
            mongoose.set('autoIndex', false);
            mongoose.set('autoCreate', false);
        }

        mongoose
            .connect(process.env.MONGO_URI as string)
            .then((instance) => console.info(`Connected to MongoDB: host(${instance.connection.host})`))
            .catch((err) => console.error('MongoDB Connection Error: ', err));
    };

    export default connectDB;
    ```

### Fireup the app

-   Start at production
    -   `npm run build`
    -   `npm start`
-   Start at development
    -   `npm run dev`
