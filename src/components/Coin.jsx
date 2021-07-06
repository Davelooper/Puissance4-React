import React from "react"
import { useDrag } from 'react-dnd'

/**
 * Display the coin.
 * This element is draggable.
 * @param {*} param0 
 * @returns 
 */
export function Coin({ color, className, setAlert }) {

    function getHookByColor(color) {
        if (color === 'yellow') {
            const [{ isDragging }, drag] = useDrag(() =>
            ({
                type: 'yellowCoin',
                item: { 'color': 'yellow' },
                collect: monitor => ({
                    isDragging: !!monitor.isDragging(),
                }),
            })
            )

            return [{ isDragging }, drag]
        } else if (color === 'red') {
            const [{ isDragging }, drag] = useDrag(() => ({
                type: 'redCoin',
                item: { 'color': 'red' },
                collect: monitor => ({
                    isDragging: !!monitor.isDragging(),
                }),
            }))
            return [{ isDragging }, drag]
        }
    }

    const [{ isDragging }, drag] = getHookByColor(color)

    return <div
        className={className}
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}></div>
}