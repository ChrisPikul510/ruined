
export function getAbsoluteBoundingRect(element) {
    const elBounds = element.getBoundingClientRect()
    //const docBounds = document.body.getBoundingClientRect()

    return {
        top: elBounds.top + window.scrollY,//- docBounds.top,
        bottom: elBounds.bottom + window.scrollY,//- docBounds.top,
        left: elBounds.left + window.scrollX,//- docBounds.left,
        right: elBounds.right + window.scrollX,//- docBounds.left,
        width: elBounds.width || (elBounds.right - elBounds.left),
        height: elBounds.height || (elBounds.bottom - elBounds.top)
    }
}

export function getAbsolutePosition(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left,
    };
};