import { useState } from 'react'

export function useYellowRowInput(initialValue = "") {
    const [yellowRowInput, setYellowRowInput] = useState(initialValue)
    const changeYellowRowInput = function (value) {
        setYellowRowInput(value)
    }

    return [
        yellowRowInput,
        changeYellowRowInput
    ]
}