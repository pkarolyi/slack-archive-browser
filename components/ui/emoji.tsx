import { emojiConvertor } from "@/lib/emoji_convertor";

export default function Emoji({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {emojiConvertor.replace_colons(`:${name}:`)}
    </span>
  );
}
