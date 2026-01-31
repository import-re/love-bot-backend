export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const messages = ['I love you', 'I love you so much', 'I love you️️ <3', 'Seni Çok Seviyorum', 'Я тебя люблю'];

    try {
        const message = messages[Math.floor(Math.random()*messages.length)];


        const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: process.env.BF_CHAT_ID,
                text: message
            })
        });

        const response2 = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: process.env.ME_CHAT_ID,
                text: `Mert got a message ${message}`,
            })
        });


        const data = await response.json();

        if (!data.ok) {
            throw new Error(JSON.stringify(data));
        }

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: error.message });
    }
}
