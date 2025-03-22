import React from 'react'
import './Ticket.scss'
import Tabswitch from './Tabswitch/Tabswitch'
import NotificationList from './Tabswitch/Notifications'

function Notify() {
    return (
        <div className="col-md-12 mt-3 ">
            <div className="col-md-12 background_color_white1 py-3 " id="style-1">
                <h5>
                    <b>Notifications</b>
                </h5>

                <NotificationList />
            </div>
        </div>
    )
}

export default Notify
