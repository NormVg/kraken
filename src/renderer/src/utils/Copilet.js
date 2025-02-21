
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';



const GOOGLE_GENERATIVE_AI_API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY


const google = createGoogleGenerativeAI({
 apiKey: GOOGLE_GENERATIVE_AI_API_KEY,
});





export const Copilet = async (prefix, suffix,language) => {

 console.log(suffix,prefix)
  //  const  JSON.stringify({ prefix, suffix, language: "javascript"
  const prom = `You are a ${language.value + " " }programmer that replaces <FILL_ME> part with the right code. Only output the code that replaces <FILL_ME> part. Do not add any explanation or markdown.

-------------------------------------------------------------
Code

${prefix}<FILL_ME>${suffix}
-------------------------------------------------------------
  `



  const lines = prefix.split('\n'); // Split into lines
  const lastLine = lines[lines.length - 1]?.trim(); // Get last line and trim spaces

  if (lastLine && lastLine.toLowerCase().startsWith('k?')) {
      // callback(); // Run the function if the last line starts with "k?"
      console.log("PUSHING AI")
      const { text } = await generateText({
        model: google('gemini-2.0-flash-exp'),
        prompt: prom
      });
      return text
  }else{
    console.log("NOT PUSHING AI")
    return ""
  }




  // const { text } = await generateText({
  //   model: google('gemini-2.0-flash-exp'),
  //   prompt: prom
  // });


  // return text
}