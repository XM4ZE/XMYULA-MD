import fetch from 'node-fetch';
import axios from 'axios'

let handler = async (m, {
	conn,
	text,
	command,
	usedPrefix
}) => {
	if (command == 'stalkfreefire') {
		if (!text) throw `Example: ${usedPrefix + command} 570098876`
		let result = await (await fetch(`https://api.botcahx.eu.org/api/stalk/ff?id=${text}&apikey=${global.btc}`)).json()
		let cap = `*Nickname:* ${result.result.userNameGame}
*User ID:* ${text}`
		m.reply(cap)
	}

	if (command == 'stalksupersus') {
		if (!text) throw `Example: ${usedPrefix + command} 20431364`
		let result = await (await fetch(`https://api.botcahx.eu.org/api/stalk/supersus?id=${text}&apikey=${global.btc}`)).json()
		let cap = `*Nickname:* ${result.result.name}
*ID:* ${text}
*UserId:* ${result.result.userId}
*SpaceId:* ${result.result.spaceId}`
		m.reply(cap)
	}

	if (command == 'stalkml') {
		let [id, zoneId] = text.split(',');
		if (!id || !zoneId) throw `Example: ${usedPrefix + command} 84830127,2169`;

		let data = await (await fetch(`https://api.botcahx.eu.org/api/stalk/ml-v2?id=${id}&server=${zoneId}&apikey=${btc}`)).json()
		let result = data.result
		if (!result.success) throw result.error;

		let output = `*MOBILE LEGENDS STALK RESULT*\n`;
		output += `╭──────────────────────\n`;
		output += `│ \`USER INFORMATION\`\n`;

		const stalkInfo = result.data.stalk_info.stalk_data.split('\n');
		stalkInfo.forEach(line => {
			output += `│ *${line}*\n`;
		});

		output += `╰──────────────────────\n\n`;

		output += `💎 \`DIAMOND SHOP ITEMS\`\n`;
		result.data.stalk_info.shop_data.diamond.goods.forEach(item => {
			output += `*❏ ${item.title} ${item.limits.reached ? 'Diamonds ❌' : 'Diamonds ✅'}*\n`;
		});
		output += `\n`;

		output += `🎁 \`EVENT SHOP ITEMS\`\n`;
		result.data.stalk_info.shop_data.event.goods.forEach(item => {
			output += `*❏ ${item.title} ${item.limits.reached ? '❌' : '✅'}*\n`;
		});
		output += `\n`;

		if (result.data.categorized_shop.weeklyPass.items.length > 0) {
			output += `📅 \`WEEKLY PASS\`\n`;
			result.data.categorized_shop.weeklyPass.items.forEach(item => {
				output += `*❏ ${item.title} ${item.limits.reached_limit ? '❌' : '✅'}*\n`;
			});
			output += `\n`;
		}

		if (result.data.categorized_shop.firstCharge.items.length > 0) {
			output += `🎯 \`FIRST CHARGE BONUS\`\n`;
			result.data.categorized_shop.firstCharge.items.forEach(item => {
				output += `*❏ ${item.title} ${item.limits.reached_limit ? 'Diamonds ❌' : 'Diamonds ✅'}*\n`;
			});
			output += `\n`;
		}

		if (result.data.categorized_shop.diamondPacks.items.length > 0) {
			output += `💎 \`DIAMOND PACKS (${result.data.categorized_shop.diamondPacks.items.length} ITEMS)\`\n`;
			result.data.categorized_shop.diamondPacks.items.forEach(item => {
				output += `*❏ ${item.title} ${item.limits.reached_limit ? ' Diamonds ❌' : 'Diamonds ✅'}*\n`;
			});
		}

		output += `\nℹ️ Total Diamond Packs: ${result.data.categorized_shop.diamondPacks.items.length} items`;
		output += `\nℹ️ First Charge Packs: ${result.data.categorized_shop.firstCharge.items.length} items`;
		output += `\nℹ️ Weekly Passes: ${result.data.categorized_shop.weeklyPass.items.length} items`;

		m.reply(output);
	}
}
handler.help = ['stalkfreefire', 'stalkml', 'stalksupersus']
handler.command = ['stalkfreefire', 'stalkml', 'stalksupersus']
handler.tags = ['tools']
handler.limit = true;

export default handler;