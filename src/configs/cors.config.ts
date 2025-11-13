import { ICorsConfig } from "../types/cors";

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(",") || [];

export const corsConfig = (): ICorsConfig => {
    return {
        origin: (origin, callback) => {
            if (!origin || !allowedOrigins.includes(origin)) {
                return callback(new Error('Not allowed by CORS'), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        allowedHeaders: ["Content-Type"],
        optionsSuccessStatus: 200,
    }
}

