'use client'

import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";

type Props = {
    callbackUrl?: string;
}
function LoginButton({ callbackUrl }: Props) {
    return (
        <Button
            variant="outline"
            size={"lg"}
            onClick={() => authClient.signIn.social({
                provider: "duende",
                callbackURL: callbackUrl,
            })}
            >
            Login
        </Button>
    );
}

export default LoginButton;