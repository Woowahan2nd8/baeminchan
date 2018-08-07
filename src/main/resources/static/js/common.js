const $ = (selector) => {
    return document.querySelector(selector);
}

const $All = (selector) => {
    return document.querySelectorAll(selector);
}

const fetchManager = ({ url, method, body, headers, callback }) => {
    fetch(url, {method,body,headers,credentials: "same-origin"})
        .then((response) => {
        return response.json()
    }).then((result) => {
        callback(result)
    })
}


const fetchAsync = ({ url, method, body, headers} ) => (
 fetch(url, {method,body,headers,credentials: "same-origin"}).then(res => res.json())
);

const customAjax = (u,d) => {
    return $.ajax({
                type: 'post',
                data: JSON.stringify(d),
                url: u,
                dataType : 'json',
                contentType : 'application/json',
    });
};

const getIndex = (elem) => (
    Array.prototype.slice.call(elem.parentElement.children).indexOf(elem)
);

const registClickEvent = (target, whatToDo) => {
    target.addEventListener("click", (event) => {
        event.preventDefault();
        whatToDo();
    });
};

const formatMoney = (number) => ( Number(number).toLocaleString() );