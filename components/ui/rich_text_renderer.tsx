"use client";

import { emojiConvertor } from "@/lib/emoji_convertor";

interface TextElement {
  type: "text";
  text: string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
  };
}

interface EmojiElement {
  type: "emoji";
  name: string;
  unicode?: string;
}

interface UserElement {
  type: "user";
  user_id: string;
}

interface LinkElement {
  type: "link";
  url: string;
  text?: string;
}

type InlineElement = TextElement | EmojiElement | UserElement | LinkElement;

interface RichTextSection {
  type: "rich_text_section";
  elements: InlineElement[];
}

interface RichTextList {
  type: "rich_text_list";
  style: "bullet" | "ordered";
  elements: RichTextSection[];
  indent?: number;
}

interface RichTextQuote {
  type: "rich_text_quote";
  elements: InlineElement[];
}

interface RichTextPreformatted {
  type: "rich_text_preformatted";
  elements: InlineElement[];
}

type BlockElement =
  | RichTextSection
  | RichTextList
  | RichTextQuote
  | RichTextPreformatted;

interface RichTextBlock {
  type: "rich_text";
  elements: BlockElement[];
}

function renderInlineElement(
  element: InlineElement,
  key: number,
): React.ReactNode {
  switch (element.type) {
    case "text": {
      let text = element.text;
      const style = element.style;

      if (style?.code) {
        return (
          <code
            key={key}
            className="rounded bg-stone-300 px-1 py-0.5 font-mono text-sm"
          >
            {text}
          </code>
        );
      }

      if (style?.bold && style?.italic) {
        return (
          <strong key={key}>
            <em>{text}</em>
          </strong>
        );
      }

      if (style?.bold) {
        return <strong key={key}>{text}</strong>;
      }

      if (style?.italic) {
        return <em key={key}>{text}</em>;
      }

      return <span key={key}>{text}</span>;
    }

    case "emoji": {
      if (element.unicode) {
        return (
          <span key={key} className="inline-block">
            {String.fromCodePoint(parseInt(element.unicode, 16))}
          </span>
        );
      }
      return (
        <span key={key} className="inline-block">
          {emojiConvertor.replace_colons(`:${element.name}:`)}
        </span>
      );
    }

    case "user": {
      return (
        <span key={key} className="font-semibold text-cyan-700">
          @{element.user_id}
        </span>
      );
    }

    case "link": {
      const displayText = element.text || element.url;
      return (
        <a
          key={key}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 underline hover:text-cyan-800"
        >
          {displayText}
        </a>
      );
    }

    default: {
      throw new Error(
        `Unknown inline element type: (${(element as any).type})`,
      );
    }
  }
}

function renderBlockElement(
  element: BlockElement,
  key: number,
): React.ReactNode {
  switch (element.type) {
    case "rich_text_section": {
      return (
        <span key={key}>
          {element.elements.map((el, i) => renderInlineElement(el, i))}
        </span>
      );
    }

    case "rich_text_list": {
      const ListTag = element.style === "ordered" ? "ol" : "ul";
      const listClass =
        element.style === "ordered"
          ? "list-decimal list-inside ml-4"
          : "list-disc list-inside ml-4";

      return (
        <ListTag key={key} className={listClass}>
          {element.elements.map((item, i) => (
            <li key={i}>
              {item.elements.map((el, j) => renderInlineElement(el, j))}
            </li>
          ))}
        </ListTag>
      );
    }

    case "rich_text_quote": {
      return (
        <blockquote
          key={key}
          className="border-l-4 border-stone-400 pl-4 text-stone-600 italic"
        >
          {element.elements.map((el, i) => renderInlineElement(el, i))}
        </blockquote>
      );
    }

    case "rich_text_preformatted": {
      return (
        <pre
          key={key}
          className="my-2 overflow-x-auto rounded bg-stone-100 p-2 font-mono text-sm"
        >
          <code>
            {element.elements.map((el, i) => {
              if (el.type === "text") {
                return el.text;
              }
              return null;
            })}
          </code>
        </pre>
      );
    }

    default: {
      throw new Error(`Unknown block element type: (${(element as any).type})`);
    }
  }
}

function renderPlainText(plainText: string) {
  return (
    <p className="text-sm whitespace-pre-line lg:text-base">
      {emojiConvertor.replace_colons(plainText)}
    </p>
  );
}

export default function RichTextRenderer({
  blocks,
  plainText,
}: {
  blocks: any;
  plainText: string;
}) {
  if (!blocks || blocks.length === 0) {
    return renderPlainText(plainText);
  }

  try {
    return (
      <div className="text-sm lg:text-base">
        {(blocks as RichTextBlock[]).map((block, blockIndex) => (
          <div key={blockIndex}>
            {block.elements.map((element, elementIndex) =>
              renderBlockElement(element, elementIndex),
            )}
          </div>
        ))}
      </div>
    );
  } catch (e) {
    console.warn(e);
    return renderPlainText(plainText);
  }
}
