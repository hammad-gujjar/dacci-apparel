import { createAuthClient } from "better-auth/react"
import { myPlugin } from "./plugins"
export const authClient = createAuthClient({
    plugins: [myPlugin()]
})