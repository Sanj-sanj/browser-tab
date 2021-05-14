export default function search(text) {
  const searchURL = `https://duckduckgo.com/?q=${text.replace(" ", "+")}`;
  if (text.trim() === "") {
    return null;
  }
  return (location.href = searchURL);
}
