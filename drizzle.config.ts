import {defineConfig} from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({
    path: './.env.local'
})

if( typeof process.env.XATA_DATABASE_URL !== 'string'){
    throw new Error('please set your data base url corrent in string')
}


export default defineConfig(
    {
        dialect: 'postgresql',
        schema: './src/db/schema.ts',
        out: './src/db/migrations',
        dbCredentials:{
            url: process.env.XATA_DATABASE_URL // OR you can just put the ! on the end to tell; yes i know its there just go on

        }
    }
)