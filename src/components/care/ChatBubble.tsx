import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "bot";
  return (
    <div className={cn("flex gap-2 max-w-[85%]", isBot ? "self-start" : "self-end flex-row-reverse")}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-auto">
          K
        </div>
      )}
      <div
        className={cn(
          "px-3 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
          isBot
            ? "bg-muted text-foreground rounded-tl-sm"
            : "bg-primary text-white rounded-tr-sm"
        )}
        dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
      />
    </div>
  );
}
