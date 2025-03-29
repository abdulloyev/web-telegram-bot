const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

// botToken
// Hosting bot token
const token = "7182918972:AAEaabxcPeRSYVH8tYv-PsJ5DsrC4jNnFwg";
// Local bot token
// const token = "7495010409:AAEHGuYvzPifhy3g4P51uaKBqMA0vrvWOVo";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

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

    // /courses command - Inline keyboard
    if (text === "/courses") {
      await bot.sendChatAction(chatId, "typing");
      await bot.sendMessage(chatId, "Kerakli kurslarni o'zingiz tanlang 👇", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Kurslarni ko'rish",
                web_app: {
                  url: "https://abu-telegram-bot.vercel.app",
                },
              },
            ],
          ],
        },
      });
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

// Webhook API
app.post("/web-data", async (req, res) => {
  const { queryID, products } = req.body;

  try {
    // Telegram bot orqali WebApp query’ga javob qaytaramiz
    await bot.answerWebAppQuery(queryID, {
      type: "article",
      id: queryID,
      title: "Muofaqiyatli xarid qildingiz!",
      input_message_content: {
        message_text: `Xaridingiz bilan tabriklaymiz! 😊

        ${products
          .reduce((a, c) => a + c.price * c.quantity, 0)
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} qiymatga ega mahsulot sotib oldingiz 🎉

          ${products
            .map(item => `${item.title} - ${item.quantity} x ${item.price}`)
            .join(", \n")}`,
      },
    });
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Server start
app.listen(process.env.PORT || 8000, () =>
  console.log("Server is running on port 8000...")
);
