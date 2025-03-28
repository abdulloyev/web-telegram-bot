const TelegramBot = require("node-telegram-bot-api");

// botToken
const token = "7182918972:AAEaabxcPeRSYVH8tYv-PsJ5DsrC4jNnFwg";

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.on("message", async msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const firstName = msg.chat.first_name;
    // My commands
    bot.setMyCommands([
      { command: "/start", description: "Kurslar haqida ma'limot" },
      { command: "/courses", description: "Kurslarni ko'rish" },
    ]);

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
                    url: "https://abu-telegram-bot.vercel.app",
                  },
                },
              ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        }
      );

      await bot.sendChatAction(chatId, "typing");
      await bot.sendMessage(chatId, "Kerakli bo'limni tanlang 👇");
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

        await bot.sendPhoto(
          chatId,
          "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png"
        );

        for (item of data) {
          await bot.sendMessage(
            chatId,
            `<b>${item.title}</b> - <i>${item.quantity} x ${item.price} => ${
              item.quantity * item.price
            }</i>`,
            {
              parse_mode: "HTML",
            }
          );
        }

        await bot.sendMessage(
          chatId,
          `💵 <b>Umumiy narx</b> - <i>${data
            .reduce((a, c) => a + c.price * c.quantity, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}</i>`,
          {
            parse_mode: "HTML",
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  });
};

bootstrap();
