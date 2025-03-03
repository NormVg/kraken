import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

var GOOGLE_GENERATIVE_AI_API_KEY = import.meta.env
  .VITE_GOOGLE_GENERATIVE_AI_API_KEY;

window.electron.ipcRenderer.send("read-db", "apiKey");
window.electron.ipcRenderer.on("read-db-reply-apiKey", (e, r) => {
  console.log(r[0].key,'key ofund');

  // GOOGLE_GENERATIVE_AI_API_KEY = r[0].key;
  GOOGLE_GENERATIVE_AI_API_KEY = r[0].key;
});


export const Copilet = async (prefix, suffix, language) => {
  const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_GENERATIVE_AI_API_KEY,
  });

  console.log(suffix, prefix);
  //  const  JSON.stringify({ prefix, suffix, language: "javascript"
  const prom = `You are a ${language.value + " "}programmer that replaces <FILL_ME> part with the right code. Only output the code that replaces <FILL_ME> part. Do not add any explanation or markdown.

-------------------------------------------------------------
Code

${prefix}<FILL_ME>${suffix}
-------------------------------------------------------------
  `;

  const lines = prefix.split("\n"); // Split into lines
  const lastLine = lines[lines.length - 1]?.trim(); // Get last line and trim spaces

  if (lastLine && lastLine.toLowerCase().startsWith("k?")) {
    // callback(); // Run the function if the last line starts with "k?"
    console.log("PUSHING AI");
    const { text } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: prom,
    });
    return text;
  } else {
    console.log("NOT PUSHING AI");
    return "";
  }
};

export const CopiletPrompt = async (prompt, prefix, suffix, language) => {
  console.log(suffix, prefix,GOOGLE_GENERATIVE_AI_API_KEY);

  const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_GENERATIVE_AI_API_KEY,
  });

  //  const  JSON.stringify({ prefix, suffix, language: "javascript"
  const prom = `

   problem statement: ${prompt}

   You are a ${language.value + " "}programmer that replaces <FILL_ME> part with the right code. Only output the code that replaces <FILL_ME> part. Do not add any explanation or markdown.

 -------------------------------------------------------------
 Code

 ${prefix}<FILL_ME>${suffix}
 -------------------------------------------------------------
   `;

  console.log("PUSHING AI");
  const { text } = await generateText({
    model: google("gemini-2.0-flash-exp"),
    prompt: prom,
  });
  return text;
};



export const CopiletPromptSelectedText = async (selectedText,prompt, prefix, suffix, language) => {
  console.log(suffix, prefix,GOOGLE_GENERATIVE_AI_API_KEY);

  const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const prom = `



   problem statement: ${prompt}

   highlighted code: ${selectedText}

   You are a ${language.value + " "}programmer that replaces <FILL_ME> part with the right code. Only output the code that replaces <FILL_ME> part. Do not add any explanation or markdown.

 -------------------------------------------------------------
 Code

 ${prefix}<FILL_ME>${suffix}
 -------------------------------------------------------------
   `;

  console.log("PUSHING AI");
  const { text } = await generateText({
    model: google("gemini-2.0-flash-exp"),
    prompt: prom,
  });
  return text;
};
