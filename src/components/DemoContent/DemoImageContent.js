export default function getImageContent(content) {
    let parser = new DOMParser();
    let parsedDoccument = parser.parseFromString(content, "text/html");
    let contentImage = parsedDoccument.getElementsByTagName("img");
    return [contentImage]
}