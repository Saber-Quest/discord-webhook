const { EmbedBuilder, WebhookClient, AttachmentBuilder } = require('discord.js');
const { io } = require('socket.io-client');
const { createCanvas, loadImage } = require('canvas');

function convertIds(id) {
    switch (id) {
        case "ap":
            return {
                image: "./images/arrow_pieces_icon.png",
                name: "Arrow Pieces"
            }
        case "bcn":
            return {
                image: "./images/badcut_notes_icon.png",
                name: "Bad Cut Notes"
            }
        case "bp":
            return {
                image: "./images/blue_cube_pieces_icon.png",
                name: "Blue Note Pieces"
            }
        case "bd":
            return {
                image: "./images/blue_debris_icon.png",
                name: "Blue Debris"
            }
        case "bn":
            return {
                image: "./images/blue_notes_icon.png",
                name: "Blue Notes"
            }
        case "bs":
            return {
                image: "./images/blue_saber_icon.png",
                name: "Blue Saber"
            }
        case "b":
            return {
                image: "./images/bombs_icon.png",
                name: "Bombs"
            }
        case "bt":
            return {
                image: "./images/bsmg_token.png",
                name: "BSMG Token"
            }
        case "ht":
            return {
                image: "./images/hitbloq_token.png",
                name: "Hitbloq Token"
            }
        case "cw":
            return {
                image: "./images/crouch_wall_icon.png",
                name: "Crouch Wall"
            }
        case "ct":
            return {
                image: "./images/cube_community_token.png",
                name: "CC Token"
            }
        case "gn":
            return {
                image: "./images/golden_note_icon.png",
                name: "Golden Note"
            }
        case "gp":
            return {
                image: "./images/golden_pieces_icon.png",
                name: "Golden Pieces"
            }
        case "rcp":
            return {
                image: "./images/red_cube_pieces_icon.png",
                name: "Red Note Pieces"
            }
        case "rd":
            return {
                image: "./images/red_debris_icon.png",
                name: "Red Debris"
            }
        case "rn":
            return {
                image: "./images/red_notes_icon.png",
                name: "Red Notes"
            }
        case "rs":
            return {
                image: "./images/red_saber_icon.png",
                name: "Red Saber"
            }
        case "st":
            return {
                image: "./images/scoresaber_token.png",
                name: "ScoreSaber Token"
            }
        case "sn":
            return {
                image: "./images/silver_note_icon.png",
                name: "Silver Note"
            }
        case "sp":
            return {
                image: "./images/silver_pieces_icon.png",
                name: "Silver Pieces"
            }
        case "w":
            return {
                image: "./images/wall_icon.png",
                name: "Wall"
            }
        case "115":
            return {
                image: "./images/115.png",
                name: "115"
            }
        case "bpp":
            return {
                image: "./images/blue_poodle_icon.png",
                name: "Blue Poodle"
            }
        case "bsl":
            return {
                image: "./images/blue_slider_icon.png",
                name: "Blue Slider"
            }
        case "bst":
            return {
                image: "./images/blue_stack.png",
                name: "Blue Stack"
            }
        case "bto":
            return {
                image: "./images/blue_tower.png",
                name: "Blue Tower"
            }
        case "br":
            return {
                image: "./images/bomb_reset_icon.png",
                name: "Bomb Reset"
            }
        case "dn":
            return {
                image: "./images/double_notes_icon.png",
                name: "Double Notes"
            }
        case "rpp":
            return {
                image: "./images/red_poodle_icon.png",
                name: "Red Poodle"
            }
        case "rsl":
            return {
                image: "./images/red_slider_icon.png",
                name: "Red Slider"
            }
        case "rst":
            return {
                image: "./images/red_stack.png",
                name: "Red Stack"
            }
        case "rto":
            return {
                image: "./images/red_tower.png",
                name: "Red Tower"
            }
    }
}

function Craft(item1, item2) {
    switch (item1) {
        case "ap": {
            switch (item2) {
                case "bp": return "bn"
                case "rcp": return "rn"
                case "bst": return "bsl"
                default: return "none"
            }
        }
        case "bcn": {
            switch (item2) {
                default: return "none"
            }
        }
        case "bp": {
            switch (item2) {
                case "ap": return "bn"
                default: return "none"
            }
        }
        case "bd": {
            switch (item2) {
                default: return "none"
            }
        }
        case "bn": {
            switch (item2) {
                case "rn": return "dn"
                case "bn": return "bst"
                case "bs": return "bd"
                case "rs": return "bcn"
                case "sp": return "sn"
                default: return "none"
            }
        }
        case "bst": {
            switch (item2) {
                case "bn": return "bto"
                default: return "none"
            }
        }
        case "bs": {
            switch (item2) {
                case "bn": return "bd"
                case "rn": return "bcn"
                default: return "none"
            }
        }
        case "b": {
            switch (item2) {
                case "rn": return "br"
                case "bn": return "br"
                default: return "none"
            }
        }
        case "bt": {
            switch (item2) {
                default: return "none"
            }
        }
        case "cw": {
            switch (item2) {
                default: return "none"
            }
        }
        case "ct": {
            switch (item2) {
                default: return "none"
            }
        }
        case "gn": {
            switch (item2) {
                default: return "none"
            }
        }
        case "gp": {
            switch (item2) {
                case "sn": return "gn"
                default: return "none"
            }
        }
        case "rcp": {
            switch (item2) {
                case "ap": return "rn"
                default: return "none"
            }
        }
        case "rn": {
            switch (item2) {
                case "bn": return "dn"
                case "rn": return "rst"
                case "rs": return "rd"
                case "bs": return "bcn"
                case "sp": return "sn"
                default: return "none"
            }
        }
        case "rst": {
            switch (item2) {
                case "rn": return "rto"
                default: return "none"
            }
        }
        case "st": {
            switch (item2) {
                default: return "none"
            }
        }
        case "sn": {
            switch (item2) {
                case "gp": return "gn"
                default: return "none"
            }
        }
        case "sp": {
            switch (item2) {
                case "bn": return "sn"
                case "rn": return "sn"
                default: return "none"
            }
        }
        case "w": {
            switch (item2) {
                default: return "none"
            }
        }
        case "rs": {
            switch (item2) {
                case "rn": return "rd"
                case "bn": return "bcn"
                default: return "none"
            }
        }
        case "115": {
            switch (item2) {
                default: return "none"
            }
        }
        case "bpp": {
            switch (item2) {
                default: return "none"
            }
        }
        case "rpp": {
            switch (item2) {
                default: return "none"
            }
        }
        case "bsl": {
            switch (item2) {
                case "bsl": return "bpp"
                default: return "none"
            }
        }
        case "rsl": {
            switch (item2) {
                case "rsl": return "rpp"
                default: return "none"
            }
        }
        case "bto": {
            switch (item2) {
                case "ap": return "bsl"
                default: return "none"
            }
        }
        case "rto": {
            switch (item2) {
                case "ap": return "rsl"
                default: return "none"
            }
        }
        case "bst": {
            switch (item2) {
                default: return "none"
            }
        }
        case "rst": {
            switch (item2) {
                default: return "none"
            }
        }
        case "bre": {
            switch (item2) {
                default: return "none"
            }
        }
        case "br": {
            switch (item2) {
                default: return "none"
            }
        }
        case "dn": {
            switch (item2) {
                case "b": return "br"
                default: return "none"
            }
        }
    }
}

const webhook = new WebhookClient({ url: env.WEBHOOK_1 });
const webhook2 = new WebhookClient({ url: env.WEBHOOK_2 });

const socket = io('ws://saberquest.xyz:8080');

socket.on('connect', () => {
    console.log('Connected to SaberQuest');
});

socket.on('challengeCompleted', async (data) => {
    const canvas = createCanvas(200 * data.rewards.collectibles.length, 200);
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < data.rewards.collectibles.length; i++) {
        const collectible = data.rewards.collectibles[i];
        const image = await loadImage(convertIds(collectible).image);
        ctx.drawImage(image, 200 * i, 0, 200, 200);
    }

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "collectibles.png" });

    const user = await fetch(`https://saberquest.xyz/api/user/${data.id}`).then(res => res.json());
    const name = user.name;
    const avatar = user.profilePicture;

    const embed = new EmbedBuilder()
        .setTitle(`${name} has completed a challenge!`)
        .setThumbnail(avatar)
        .setDescription(`They have completed the **${data.difficulty}** challenge.\n\nThey got **${data.rewards.points} QuestPoints** and the following collectibles:`)
        .setImage("attachment://collectibles.png")
        .setFooter({ text: `User's value is now ${user.value} and they now have ${user.qp} QuestPoints.` })

    webhook.send({
        embeds: [embed],
        files: [attachment]
    });
});

socket.on('itemBought', async (data) => {
    const canvas = createCanvas(200, 200)
    const ctx = canvas.getContext('2d');
    const item = convertIds(data.item);

    const image = await loadImage(item.image);
    ctx.drawImage(image, 0, 0, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "collectible.png" });

    const user = await fetch(`https://saberquest.xyz/api/user/${data.userId}`).then(res => res.json());
    const name = user.name;
    const avatar = user.profilePicture;

    const embed = new EmbedBuilder()
        .setTitle(`${name} has bought an item!`)
        .setThumbnail(avatar)
        .setDescription(`They bought **${item.name}** for **${data.price} QuestPoints**.`)
        .setImage("attachment://collectible.png")
        .setColor("Random")
        .setFooter({ text: `User's value is now ${data.value} and they now have ${data.qp} QuestPoints.` })

    webhook.send({
        embeds: [embed],
        files: [attachment]
    });
});

socket.on('userUpdate', async (data) => {
    if (data.type == "remove") {
        const canvas = createCanvas(200 * 5, 200)
        const ctx = canvas.getContext('2d');
        const item1 = convertIds(data.collectibles[0]);
        const item2 = convertIds(data.collectibles[1]);
        const crafted = convertIds(Craft(data.collectibles[0], data.collectibles[1]));

        const image1 = await loadImage(item1.image);
        const plus = await loadImage("./images/plus.png")
        const image2 = await loadImage(item2.image);
        const equals = await loadImage("./images/equals.png")
        const image3 = await loadImage(crafted.image);

        ctx.drawImage(image1, 0, 0, 200, 200);
        ctx.drawImage(plus, 200, 0, 200, 200);
        ctx.drawImage(image2, 400, 0, 200, 200);
        ctx.drawImage(equals, 600, 0, 200, 200);
        ctx.drawImage(image3, 800, 0, 200, 200);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "crafting.png" });

        const user = await fetch(`https://saberquest.xyz/api/user/${data.userId}`).then(res => res.json());
        const name = user.name;
        const avatar = user.profilePicture;

        const embed = new EmbedBuilder()
            .setTitle(`${name} crafted an item!`)
            .setThumbnail(avatar)
            .setDescription(`They used **${item1.name}** and **${item2.name}** to craft **${crafted.name}**.`)
            .setImage("attachment://crafting.png")
            .setColor("Random")
            .setFooter({ text: `User's value is now ${user.value}.` })

        webhook.send({
            embeds: [embed],
            files: [attachment]
        });
    }
});

socket.on('gamble', async (data) => {
    const canvas = createCanvas(200, 200)
    const ctx = canvas.getContext('2d');
    const item = convertIds(data.itemWon);

    const image = await loadImage(item.image);
    ctx.drawImage(image, 0, 0, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "gambling.png" });

    const user = await fetch(`https://saberquest.xyz/api/user/${data.userId}`).then(res => res.json());
    const name = user.name;
    const avatar = user.profilePicture;

    let color;
    switch (data.rarity) {
        case "Common":
            color = "Grey";
            break;
        case "Uncommon":
            color = "Green";
            break;
        case "Rare":
            color = "Blue";
            break;
        case "Epic":
            color = "Purple";
            break;
        case "Legendary":
            color = "Orange";
            break;
    }

    const embed = new EmbedBuilder()
        .setTitle(`${name} gambled!`)
        .setThumbnail(avatar)
        .setDescription(`They won **${item.name}**.`)
        .setImage("attachment://gambling.png")
        .setColor(color)
        .setFooter({ text: `User's value is now ${user.value} and they now have ${user.qp} QuestPoints.` })

    webhook.send({
        embeds: [embed],
        files: [attachment]
    });
});

socket.on('challenge', async (data) => {
    const type = data.type;
    const difficulties = data.difficulties;

    let task;
    let ssType;
    let blType;
    let hasAccuracy = false;
    let hasOtherValue = false;
    let value;

    switch (type) {
        case "pp": {
            task = "Get a play that is worth at least this much PP:";
            ssType = "ppSS";
            blType = "ppBL";
            break;
        }
        case "FCStars": {
            task = "Get an FC (Full Combo) on a map with at least this many stars:";
            ssType = "starsSS";
            blType = "starsBL";
            break;
        }
        case "xAccuracyStars": {
            task = "Get at least this much accuracy on a map with at least this many stars:";
            ssType = "starsSS";
            blType = "starsBL";
            hasAccuracy = true;
            break;
        }
        case "xAccuracyPP": {
            task = "Get at least this much accuracy on a map that is worth at least this much PP:";
            ssType = "ppSS";
            blType = "ppBL";
            hasAccuracy = true;
            break;
        }
        case "playXMaps": {
            task = "Play at least this many maps:";
            hasOtherValue = true;
            value = "maps";
            break;
        }
        case "FCNotes":{
            task = "Get an FC (Full Combo) on a map with at least this many notes:";
            hasOtherValue = true;
            value = "notes";
            break;
        }
        case "passNotes":{
            task = "Pass a map with at least this many notes:";
            hasOtherValue = true;
            value = "notes";
            break;
        }
        case "passLength": {
            task = "Pass a map that is at least this long:";
            hasOtherValue = true;
            value = "length";
            break;
        }
    }

    const embed = new EmbedBuilder()
        .setTitle(`Challenges have been updated!`)
        .setThumbnail("https://saberquest.xyz/images/icon.png")
        .setDescription(task)
        .setColor("Random")

    if (hasOtherValue) {
        embed.addFields(
            { name: "Easy", value: `**${difficulties[0][value]}**` },
            { name: "Medium", value: `**${difficulties[1][value]}**` },
            { name: "Hard", value: `**${difficulties[2][value]}**`  },
            { name: "Extreme", value: `**${difficulties[3][value]}**` }
        )
    }

    else {
        if (hasAccuracy) {
            embed.addFields(
                { name: "Easy", value: `ScoreSaber: ${difficulties[0][ssType]} **(${difficulties[0].accuracy}%)** | BeatLeader: ${difficulties[0][blType]} **(${difficulties[0].accuracy}%)**` },
                { name: "Medium", value: `ScoreSaber: ${difficulties[1][ssType]} **(${difficulties[1].accuracy}%)** | BeatLeader: ${difficulties[1][blType]} **(${difficulties[1].accuracy}%)**` },
                { name: "Hard", value: `ScoreSaber: ${difficulties[2][ssType]} **(${difficulties[2].accuracy}%)** | BeatLeader: ${difficulties[2][blType]} **(${difficulties[2].accuracy}%)**` },
                { name: "Extreme", value: `ScoreSaber: ${difficulties[3][ssType]} **(${difficulties[3].accuracy}%)** | BeatLeader: ${difficulties[3][blType]} **(${difficulties[3].accuracy}%)**` },
            )
        }

        else {
            embed.addFields(
                { name: "Easy", value: `ScoreSaber: ${difficulties[0][ssType]} | BeatLeader: ${difficulties[0][blType]}` },
                { name: "Medium", value: `ScoreSaber: ${difficulties[1][ssType]} | BeatLeader: ${difficulties[1][blType]}` },
                { name: "Hard", value: `ScoreSaber: ${difficulties[2][ssType]} | BeatLeader: ${difficulties[2][blType]}` },
                { name: "Extreme", value: `ScoreSaber: ${difficulties[3][ssType]} | BeatLeader: ${difficulties[3][blType]}` },
            )
        }
    }

    webhook2.send({
        embeds: [embed]
    });
});

socket.on('newUser', async (data) => {
    const user = await fetch(`https://saberquest.xyz/api/user/${data.userId}`).then(res => res.json());
    const name = user.name;

    webhook2.send({
        content: `**${name}** has joined SaberQuest! Check out their profile here: ${data.link}`,
    });
});

socket.on('discordConnect', async (data) => {
    const user = await fetch(`https://saberquest.xyz/api/user/${data.userId}`).then(res => res.json());
    const name = user.name;

    webhook2.send({
        content: `<@${data.discordId}> has connected their Discord account to their SaberQuest account (**${name}**)!`,
    });
});