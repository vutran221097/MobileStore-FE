export default function getBodyContent(content) {
    let parser = new DOMParser();
    let parsedDoccument = parser.parseFromString(content, "text/html");
    let contentText = parsedDoccument.getElementsByTagName("*");

    let demoContent = "";
    for (var i = 0; i < contentText.length; i++) {
        var current = contentText[i];
        if (
            current.children.length === 0 &&
            current.textContent.replace(/ |\n/g, "") !== ""
        ) {
            // Check the element has no children && that it is not empty
            demoContent = demoContent + " " + current.textContent;
        }
    }
    return demoContent
}