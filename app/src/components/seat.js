import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import PinchZoom from '@u/pinchzoom';
import '@s/seat.scss'

const Seat = (props) => {
    const seat = useRef(null)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (props.seat.length) {
            setWidth(props.seat[0].row.length * 35 + 5)
            setHeight(props.seat.length * 26)
        }
    }, [props.seat.length])


    useLayoutEffect(() => {
            const pz = new PinchZoom(seat.current, {})
            pz.enable()
    }, [width, height])

    const handleChooseSeat = (row) => {
        if (row.value === 2) {
            return false
        } else {
            const value = row.value === 1 ? 3 : 1
            const seat_id = row.seat_id
            props.onChoose({value, seat_id})
        }
    }

    return (
        <div className="seat">
            <div
                ref={seat}
                style={{height: `${height}px`, width: `${width}px`}}
            >
                <div>
                    {props.seat.map((line, index) => {
                        return (
                            <div className="line"
                                key={index}
                            >
                                {line.row.map((row, _index) => {
                                    return (
                                        <span className="row"
                                            key={_index}
                                        >
                                            {row.value ? <img onClickCapture={() => {handleChooseSeat(row)}}
                                                src={row.value === 1 ? require('@a/empty_seat.png') : (row.value === 2 ? require('@a/disabled_seat.png') : require('@a/chose_seat.png'))}
                                                         /> : ''}
                                        </span>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Seat