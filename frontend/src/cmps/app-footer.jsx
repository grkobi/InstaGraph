
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { UserMsg } from './user-msg.jsx'

export function AppFooter() {
    const count = useSelector(storeState => storeState.userModule.count)


    return (
        <footer className="app-footer">
            <p>
                
            </p>

            <UserMsg />
        </footer>
    )
}