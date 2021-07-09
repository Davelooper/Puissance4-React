import React, { useContext } from "react"
import { AlertContext } from "../contexts/AlertContext.jsx"

export function Alert() {
    const { alert } = useContext(AlertContext)

    return <>
        <p className="game__alert">{alert}</p>
    </>
}