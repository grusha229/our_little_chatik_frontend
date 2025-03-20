import React, { useCallback } from 'react'
import Button from '../../controls/Button/Button'
import { useLogoutUserMutation } from '../../../services/auth';

export default function LogoutButton() {
    const [ logoutUser ] = useLogoutUserMutation();
    const handleLogoutClicked = useCallback(() => {
        logoutUser({});
    }, []);

    return (
        <Button
            onClick={handleLogoutClicked}
        >
            Logout
        </Button>
    )
}
