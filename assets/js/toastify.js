function toastifyAllGood(textT, durationT) {
    Toastify({
        text: textT,
        duration: durationT,
        destination: "#",
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #09cd08, #0abf2b, #0b8928)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

function toastifyAllGood(textT, durationT) {
    Toastify({
        text: textT,
        duration: durationT,
        destination: "#",
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #09cd08, #0abf2b, #0b8928)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

function toastifyError(textT, durationT) {
    Toastify({
        text: textT,
        duration: durationT,
        destination: "#",
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #830225, #e40e4f, #890b26)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}