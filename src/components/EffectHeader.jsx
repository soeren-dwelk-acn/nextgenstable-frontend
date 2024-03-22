import * as React from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const eventfunction = (event) => {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
        event.target.innerText = event.target.innerText
            .split("").map((letter, index) => {
                if (index < iteration) return event.target.dataset.value[index];
                else return letters[Math.floor(Math.random() * 26)]
            }).join("");
        if (iteration >= event.target.dataset.value.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
};

export default function EffectHeader() {
    return (
        <h1>
            Horse Feeding Automation <i onMouseOver={eventfunction} data-value='Next Gen Stables'> Next Gen Stables </i>
        </h1>
    )
}