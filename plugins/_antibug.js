let handler = m => m

handler.all = async function (m) {
    if (!global.db.data.users[m.sender]) return;
    
    const user = global.db.data.users[m.sender];
    const MAX = {
        MONEY: 99999999,
        BANK: Infinity,
        LIMIT: 1000,
        HEALTH: 100,
        EXP: Infinity, 
        LEVEL: 100
    };

    if (user.level > MAX.LEVEL) {
        user.level = MAX.LEVEL; 
        console.log(`Level capped for ${m.sender}`);
    }

    if (user.money > MAX.MONEY) {
        const excess = user.money - MAX.MONEY;
        user.money = MAX.MONEY;
        user.bank = (user.bank || 0) + excess;
    }

    if (user.limit > MAX.LIMIT) {
        user.limit = MAX.LIMIT;
    }

    if (user.health > MAX.HEALTH) {
        user.health = MAX.HEALTH;
    } else if (user.health < 0) {
        user.health = 0;
    }

    ['money', 'bank', 'limit', 'health', 'level'].forEach(stat => {
        if (isNaN(user[stat])) {
            user[stat] = stat === 'health' ? 100 : 0;
        }
    });
}

export default handler