import dotenv from "dotenv-safe";

dotenv.config();
export default {
    apiVersionUrl: "/api/v1",

    db: {
        str: process.env.DB_URL,

        options: {
            useNewUrlParser: true,
            readPreference: "primaryPreferred",
            useUnifiedTopology: true,
        },
    },
};
