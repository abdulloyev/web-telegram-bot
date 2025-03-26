const TelegramBot = require("node-telegram-bot-api");

// botToken
const token = "7182918972:AAEaabxcPeRSYVH8tYv-PsJ5DsrC4jNnFwg";

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.on("message", async msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const firstName = msg.chat.first_name;

    // /start command
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        `Xush kelibsiz <b>${firstName}</b>!
        `,
        {
          parse_mode: "HTML",
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Kurslarni ko'rish 🧑‍💻",
                  web_app: {
                    url: "https://abu-web-bot.vercel.app/",
                  },
                },
              ],
            ],
          },
        }
      );

      if (msg.web_app_data?.data) {
        console.log("Web app data:", msg.web_app_data?.data);
      }
    }
  });
};

bootstrap();
