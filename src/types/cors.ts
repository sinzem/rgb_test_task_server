export type ICorsConfig = {
    origin: (
        origin: string | undefined, 
        callback: (err: Error | null, allow?: boolean) => void
    ) => void;
    methods: string[];
    credentials: boolean;
    allowedHeaders?: string[];
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
};