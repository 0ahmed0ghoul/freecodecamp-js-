const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let text = markdownInput.value;
  // Headings (h1, h2, h3)
  text = text.replace(/^\s*### (.+)$/gm, "<h3>$1</h3>");
  text = text.replace(/^\s*## (.+)$/gm, "<h2>$1</h2>");
  text = text.replace(/^\s*# (.+)$/gm, "<h1>$1</h1>");

  // Blockquotes
  text = text.replace(/^\s*> (.+)$/gm, "<blockquote>$1</blockquote>");

  // Images
  text = text.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img alt="$1" src="$2">'
  );

  // Links
  text = text.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2">$1</a>'
  );

  // Bold (**text** or __text__)
  text = text.replace(
    /\*\*(.*?)\*\*|__(.*?)__/g,
    (_, g1, g2) => `<strong>${g1 || g2}</strong>`
  );

  // Italic (*text* or _text_)
  text = text.replace(
    /\*(.*?)\*|_(.*?)_/g,
    (_, g1, g2) => `<em>${g1 || g2}</em>`
  );

  return text;
}

markdownInput.addEventListener("input", () => {
  const converted = convertMarkdown();

  // Show raw HTML code
  htmlOutput.textContent = converted;

  // Render HTML preview
  preview.innerHTML = converted;
});