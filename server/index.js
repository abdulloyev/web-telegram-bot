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
    }

    if (msg.web_app_data?.data) {
      try {
        const data = JSON.parse(msg.web_app_data?.data);

        await bot.sendMessage(
          chatId,
          "<i>Bizga ishonch bildirganizdan tashakkur! 😊</i>",
          {
            parse_mode: "HTML",
          }
        );

        for (item of data) {
          await bot.sendMessage(
            chatId,
            `
              <b>Kurs:</b> ${item.title}
              <b>Narxi:</b> ${data.reduce(
                (a, c) => a + c.price * c.quantity,
                0
              )}
              <b>Rasmi:</b> <a href="${item.image}">Baxish</a>
              `,
            {
              parse_mode: "HTML",
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
};

bootstrap();
