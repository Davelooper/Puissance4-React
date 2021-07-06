import { useState } from "react"

/**
 * Handle the alert to display.
 * Return the appropriate alert.
 * @param {string} initialAlert 
 * @returns {Array}
 */
export function useAlert(initialAlert = '') {
    const [alert, setTheAlert] = useState(initialAlert)

    const setAlert = function (alert) {
        setTheAlert(alert)
    }

    return [
        alert,
        setAlert
    ]
}
