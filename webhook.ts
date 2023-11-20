import { EmbedBuilder, AttachmentBuilder, WebhookClient } from "discord.js";
import { io } from "socket.io-client";
import { createCanvas, loadImage } from "canvas";
import dotenv from "dotenv";
dotenv.config();

interface ChallengeCompletedData {
    id: string;
    diff: number;
    rewards: {
        qp: number;
        items: {
            id: string;
            rarity: string;
            value: number;
            image: string;
        }[];
        value: number;
    }
}

interface CraftedData {
    items: {
        id: string;
        image: string;
    }[];
    user: string;
}

interface DailyData {
    name: string;
    type: string;
    description: string;
    difficulties: {
        challenge: number;
        difficulty: number;
    }[];
}

interface ShopDataItem {
    id: string;
    name_id: string;
    name: string;
    rarity: string;
    price: number;
    image: string;
}

interface ShopData extends Array<ShopDataItem> { }

interface User {
    userInfo: {
        id: string;
        username: string;
        about: string;
        images: {
            avatar: string;
            banner: boolean;
            border: boolean;
        },
        preference: string;
        patreon: boolean;
        autoComplete: boolean;
        banned: boolean;
    },
    stats: {
        challengesCompleted: number;
        rank: number;
        qp: number;
        value: number;
    },
    today: {
        diff: number;
        completed: boolean;
    }
}

enum Difficulty {
    Easy = 1,
    Normal = 2,
    Expert = 3,
}

function getColor(rarity: string) {
    switch (rarity) {
        case "Common":
            return "#ffffff";
        case "Uncommon":
            return "#5CD722";
        case "Rare":
            return "#2594FA";
        case "Epic":
            return "#AD00FF";
        case "Legendary":
            return "#FFD600";
        default:
            return "#ffffff";
    }
}

const userWebhook = new WebhookClient({ url: process.env.USER_WEBHOOK });
const siteWebhook = new WebhookClient({ url: process.env.SITE_WEBHOOK });

const socket = io(process.env.SOCKET_URL);

socket.on("connect", () => {
    console.log("Connected to SaberQuest");
});

socket.on("disconnect", () => {
    console.log("Disconnected from SaberQuest");
});

socket.on("challengeCompleted", async (data: ChallengeCompletedData) => {
    const difficulty = Difficulty[data.diff];
    const rewards = data.rewards;

    const user: User = await fetch(`${process.env.SQ_URL}/profile/${data.id}`).then((res) => res.json());

    const canvas = createCanvas(200 * rewards.items.length, 200);
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < rewards.items.length; i++) {
        const image = await loadImage(rewards.items[i].image);
        ctx.drawImage(image, 200 * i, 0, 200, 200);
    }

    const attachement = new AttachmentBuilder(canvas.toBuffer(), { name: "rewards.png" });

    const embed = new EmbedBuilder()
        .setTitle("Challenge Completed")
        .setDescription(`**${user.userInfo.username}** has completed the daily challenge on **${difficulty}** difficulty!\n\nThey got **${rewards.qp}** QP and their value increased by **${rewards.value}**.`)
        .setThumbnail(user.userInfo.images.avatar)
        .setImage("attachment://rewards.png")
        .setColor("Random")
        .setFooter({ text: `The user now has ${user.stats.qp} QP and their value is ${user.stats.value} (#${user.stats.rank})` });

    userWebhook.send({ embeds: [embed], files: [attachement], avatarURL: user.userInfo.images.avatar })
});

socket.on("crafted", async (data: CraftedData) => {
    const canvas = createCanvas(200 * 5, 200);
    const ctx = canvas.getContext("2d");

    const items = data.items;

    const user = await fetch(`${process.env.SQ_URL}/profile/${data.user}`).then((res) => res.json());

    const image1 = await loadImage(items[0].image);
    const plus = await loadImage("https://saberquest.xyz/images/plus.png");
    const image2 = await loadImage(items[1].image);
    const equals = await loadImage("https://saberquest.xyz/images/equals.png");
    const result = await loadImage(items[2].image);

    ctx.drawImage(image1, 0, 0, 200, 200);
    ctx.drawImage(plus, 200, 0, 200, 200);
    ctx.drawImage(image2, 400, 0, 200, 200);
    ctx.drawImage(equals, 600, 0, 200, 200);
    ctx.drawImage(result, 800, 0, 200, 200);

    const attachement = new AttachmentBuilder(canvas.toBuffer(), { name: "crafted.png" });

    const embed = new EmbedBuilder()
        .setTitle(`${user.userInfo.username} Crafted an Item`)
        .setThumbnail(user.userInfo.images.avatar)
        .setImage("attachment://crafted.png")
        .setColor("Random")
        .setFooter({ text: `The user's value is ${user.stats.value} (#${user.stats.rank})` });

    userWebhook.send({ embeds: [embed], files: [attachement], avatarURL: user.userInfo.images.avatar })
});

//socket.on("daily", async (data: DailyData) => {
//    const difficulties = data.difficulties.map((diff) => {
//        const name = Difficulty[diff.difficulty];
//        const challenge = diff.challenge;
//
//        return {
//            name: name,
//            value: challenge,
//        }
//    })
//})

socket.on("shop", async (data: ShopData) => {
    const canvas = createCanvas(220 * 5, 200);
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const image = await loadImage(item.image);
        ctx.strokeStyle = getColor(item.rarity);
        ctx.lineWidth = 10;
        ctx.strokeRect(220 * i, 0, 200, 200);
        ctx.drawImage(image, 220 * i, 0, 200, 200);
    }

    const attachement = new AttachmentBuilder(canvas.toBuffer(), { name: "shop.png" });

    const embed = new EmbedBuilder()
        .setTitle("New Items in the Shop")
        .setImage("attachment://shop.png")
        .setColor("Random");

    siteWebhook.send({ embeds: [embed], files: [attachement] });
});