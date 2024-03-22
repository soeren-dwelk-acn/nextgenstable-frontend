import * as React from 'react';
import './LogoFader.css'

export default function LogoFader() {
    return (
        <div className="card">
            <img className="card-front-image card-image" src="/src/assets/acn-pride.png" height='100px' />
            <div className="card-faders">
                <img className="card-fader card-image" src="/src/assets/acn-pride.png" height='100px' />
                <img className="card-fader card-image" src="/src/assets/acn-pride.png" height='100px' />
                <img className="card-fader card-image" src="/src/assets/acn-pride.png" height='100px' />
                <img className="card-fader card-image" src="/src/assets/acn-pride.png" height='100px' />
                <img className="card-fader card-image" src="/src/assets/acn-pride.png" height='100px' />
                <img className="card-fader card-image" src="/src/assets/acn-pride.png" height='100px' />
                <img className="card-fader card-image" src="/src/assets/acn-pride.png" height='100px' />
                <img className="card-fader card-image" src="/src/assets/acn-pride.png" height='100px' />
            </div>
        </div>
    )
}