import EmojiConvertor from "emoji-js";

const emojiConvertor = new EmojiConvertor();
emojiConvertor.replace_mode = "unified";
emojiConvertor.allow_native = true;

export { emojiConvertor };
