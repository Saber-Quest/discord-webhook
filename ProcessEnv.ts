import { z } from "zod";

export const env = z.object({
    USER_WEBHOOK: z.string(),
    SITE_WEBHOOK: z.string(),
    SOCKET_URL: z.string(),
    SQ_URL: z.string(),
});

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof env> {}
    }
}