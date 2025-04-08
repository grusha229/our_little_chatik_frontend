import React, { useCallback } from 'react'
import Button from '@app/ui/Button/Button'
import { useLogoutUserMutation } from '@app/services/auth';

export default function LogoutButton() {
    const [ logoutUser ] = useLogoutUserMutation();
    const handleLogoutClicked = useCallback(() => {
        logoutUser({});
    }, [logoutUser]);

    return (
        <Button
            onClick={handleLogoutClicked}
        >
            Logout
        </Button>
    )
}
