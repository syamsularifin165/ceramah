
import React from 'react';

interface Props {
  content: string;
}

const SermonDisplay: React.FC<Props> = ({ content }) => {
  const formatText = (text: string) => {
    // Stage directions: [text] -> styled span
    const withStageDirections = text.replace(/\[([^\]]+)\]/g, `<span class="text-amber-400/70 italic text-sm">[$1]</span>`);
    // Emphasis: *text* -> italic span
    const withEmphasis = withStageDirections.replace(/\*([^*]+)\*/g, `<i class="not-italic text-amber-200 font-semibold">$1</i>`);
    
    // Arabic text block detection and styling
    const arabicRegex = /([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\.,-؛]+)/g;
    const withArabicStyling = withEmphasis.replace(arabicRegex, (match, p1) => {
        // Only apply if it's not part of an HTML tag and has significant length
        if (p1.trim().length > 10 && !p1.includes('<')) {
            return `<span class="font-arabic text-2xl text-right block my-4 text-white leading-loose">${p1.trim()}</span>`;
        }
        return match;
    });

    return withArabicStyling;
  };

  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
      {paragraphs.map((p, index) => {
        const formattedContent = formatText(p);
        // Check if the formatted content is JUST an Arabic span, to avoid wrapping it in a <p>
        if (formattedContent.startsWith('<span class="font-arabic')) {
            return <div key={index} dangerouslySetInnerHTML={{ __html: formattedContent }} />;
        }
        return <p key={index} dangerouslySetInnerHTML={{ __html: formattedContent }} />;
      })}
    </div>
  );
};

export default SermonDisplay;
