import type { BetterAuthPlugin } from "better-auth";

export const myPlugin = () => {
    return {
        id: "my-plugin",
        schema: {
            user: {
                fields: {
                    phone: {
                        type: "number",
                    },
                    deletedAt: {
                        type: "date",
                    },
                },
            },
        },
    } satisfies BetterAuthPlugin
}