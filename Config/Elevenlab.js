
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVEN_LAB_KEY });


export default elevenlabs;

