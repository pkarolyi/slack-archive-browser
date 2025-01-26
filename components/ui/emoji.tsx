import EmojiConvertor from "emoji-js";

const emoji = new EmojiConvertor();
emoji.replace_mode = "unified";
emoji.allow_native = true;

export default function Emoji({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: emoji.replace_colons(`:${name}:`),
      }}
      className={className}
    />
  );
}
