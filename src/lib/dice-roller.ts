export function rollDice(dice: Die[], bonus: number): DiceRoll {
    let total = bonus;
    let output: string = '';

    for (const die of dice) {
        for (let i = 0; i < die.amount; i++) {
            const roll = Math.floor(Math.random() * die.sides) + 1;
            if (!output) {
                output += `${roll}`;
            } else {
                output += ` + ${roll}`;
            }

            total += roll;
        }
    }

    if (bonus > 0) {
        output += ` + ${bonus}`;
    }
    output += ` = ${total}`;

    return { dice, bonus, output, total };
}

