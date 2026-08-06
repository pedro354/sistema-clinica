import dotenv from 'dotenv'

const environment = process.env.NODE_ENV ?? 'development'

type EnvKeys = "development" | "production" | "test"

function isEnvVariable(value: string ): value is EnvKeys {
    return ["development", "production", "test"].includes(value)
}

interface EnvironmentConfig {
    path: string;
}

const envPaths: Record<EnvKeys, EnvironmentConfig> = {
    development: {
       path: '.env.development'
    },
    production: {
        path: '.env.production'
    },
    test: {
        path: '.env.test'
    }
}

if (!isEnvVariable(environment)) {
    throw new Error(`Invalid NODE_ENV value: ${environment}`);
}

dotenv.config({ path: envPaths[environment].path })