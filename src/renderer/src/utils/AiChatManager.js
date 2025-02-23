import { useWinBasicStore } from "../stores/basicInfo";

// const CHAT_DIR =  WinBasic.isAppPackaged ?  window.os.homedir()+ `/KrakenCode` + "/db/chat/"  : "./resources/db/chat/"

// const CHAT_DIR = "/home/vishnu/room/kraken/resources/db/chat"
// Ensure the chat directory exists on startup
async function ensureChatDirectory() {
  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  try {
    await window.fs.promises.mkdir(CHAT_DIR, { recursive: true });
  } catch (err) {
    console.error("❌ Error ensuring chat directory:", err);
  }
}

// ✅ CREATE A NEW CHAT
export async function CreateNewChat() {
  const today = new Date();
  const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}/${today.getFullYear().toString().slice(-2)}`;

  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  await ensureChatDirectory();
  const chatId = window.uuidv4();
  const chatFilePath = window.path.join(CHAT_DIR, `${chatId}.json`);

  const chatData = {
    id: chatId,
    name: "Kraken Chat",
    date: formattedDate,
    history: [],
  };

  try {
    await window.fs.promises.writeFile(
      chatFilePath,
      JSON.stringify(chatData, null, 2),
      "utf-8"
    );
    console.log(`✅ Chat created: ${chatId}`);
    return chatData;
  } catch (err) {
    console.error("❌ Error creating chat:", err);
  }
}

// ✅ READ A CHAT
export async function readChat(chatId) {
  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  const chatFilePath = window.path.join(CHAT_DIR, `${chatId}.json`);

  try {
    const data = await window.fs.promises.readFile(chatFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`❌ Error reading chat ${chatId}:`, err);
    return null;
  }
}

// ✅ LIST ALL CHATS
export async function ListAllChat() {
  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  try {
    console.log(CHAT_DIR);
    const files = await window.fs.promises.readdir(CHAT_DIR);
    return files.map((file) => file.replace(".json", ""));
  } catch (err) {
    console.error("❌ Error listing chats:", err);
    return [];
  }
}

// ✅ WRITE CHAT (Overwrites Entire Chat)
export async function writeChat(chatId, newHistory) {
  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  const chatFilePath = window.path.join(CHAT_DIR, `${chatId}.json`);

  try {
    const chatData = await readChat(chatId);
    if (!chatData) return null;

    chatData.history = newHistory;

    await window.fs.promises.writeFile(
      chatFilePath,
      JSON.stringify(chatData, null, 2),
      "utf-8"
    );
    console.log(`✍ Chat ${chatId} rewritten`);
    return chatData;
  } catch (err) {
    console.error(`❌ Error writing chat ${chatId}:`, err);
    return null;
  }
}

// ✅ APPEND MESSAGE (Only Adds New Messages)
export async function appendMessage(chatId, message, type = "user") {
  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  const chatFilePath = window.path.join(CHAT_DIR, `${chatId}.json`);

  try {
    const chatData = await readChat(chatId);
    if (!chatData) return null;

    chatData.history.push({ content: message, role: type });

    await window.fs.promises.writeFile(
      chatFilePath,
      JSON.stringify(chatData, null, 2),
      "utf-8"
    );
    console.log(`✍ Message appended to chat ${chatId}`);
    return chatData;
  } catch (err) {
    console.error(`❌ Error appending message to chat ${chatId}:`, err);
    return null;
  }
}

// ✅ DELETE A CHAT
export async function deleteChat(chatId) {
  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  const chatFilePath = window.path.join(CHAT_DIR, `${chatId}.json`);

  try {
    await window.fs.promises.unlink(chatFilePath);
    console.log(`🗑 Chat ${chatId} deleted.`);
    return true;
  } catch (err) {
    console.error(`❌ Error deleting chat ${chatId}:`, err);
    return false;
  }
}

// ✅ SET CHAT NAME
export async function setChatName(chatId, newName) {
  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  const chatFilePath = window.path.join(CHAT_DIR, `${chatId}.json`);

  try {
    const chatData = await readChat(chatId);
    if (!chatData) return null;

    chatData.name = newName;

    await window.fs.promises.writeFile(
      chatFilePath,
      JSON.stringify(chatData, null, 2),
      "utf-8"
    );
    console.log(`✍ Chat ${chatId} renamed to ${newName}`);
    return chatData;
  } catch (err) {
    console.error(`❌ Error renaming chat ${chatId}:`, err);
    return null;
  }
}

export async function getChatName(chatId) {
  const WinBasic = useWinBasicStore();

  const CHAT_DIR = WinBasic.isAppPackaged
    ? window.os.homedir() + `/KrakenCode` + "/db/chat/"
    : "./resources/db/chat/";
  const chatFilePath = window.path.join(CHAT_DIR, `${chatId}.json`);

  try {
    const chatData = await readChat(chatId);
    if (!chatData) return null;

    console.log(`✍ Chat ${chatId}`);

    return chatData.name;
  } catch (err) {
    console.error(`❌ Error renaming chat ${chatId}:`, err);
    return null;
  }
}

// ✅ EXAMPLE USAGE
async function run() {
  const newChat = await CreateNewChat("How to make chai?", "12/12/2019");
  await appendMessage(newChat.id, "Hello! How can I assist you today?", "bot");
  await appendMessage(newChat.id, "I need some help with my order.", "user");

  console.log(await readChat(newChat.id)); // Read a chat
  console.log(await ListAllChat()); // List all chats

  // await deleteChat(newChat.id); // Delete chat
}
