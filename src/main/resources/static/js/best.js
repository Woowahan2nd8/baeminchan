document.addEventListener('DOMContentLoaded', () =>{
   templateInit();
}, false);

const templateInit = () => {
    //call bestCategory
    const randomIdx = Math.floor(Math.random()*6);
    bestCategory(randomIdx);

    //call bestBanchan

}

const insertHtml = ( {id, title} ) => `<li>
    <a data-category-id="${id}" href="#">${title}</a>
    </li>`;

const categoryInit = (data) => {
    const innerList = data.reduce( (accum, cur) => {
        return accum + insertHtml(cur);
    }, '');
    $('.tab-btn-box').insertAdjacentHTML('beforeend', innerList);
}

const banchanInit = (data) => {
    const innerList = data.reduce((accum, cur) => {
        return accum + banchanInnerHTML(cur);
    }, '');

    $('.tab-content-group-box').insertAdjacentHTML('beforeend', banchanOuterHtml(innerList));
}

const bestBanchan = (id) => {
    fetchManager({
            url:  '/api/banchan/best/' + id,
            method: 'GET',
            headers: { 'content-type': 'application/json'},
            callback: banchanInit,

        });
}

const bestCategory = (onIndex) => {
    fetchManager({
        url:  '/api/banchan/best',
        method: 'GET',
        headers: { 'content-type': 'application/json'},
        callback: (data) => {
            categoryInit(data);
            $('.tab-btn-box').children[onIndex].classList.add('on');
            bestBanchan( onIndex + 1);
        }
    });

}


const banchanOuterHtml = ( inner ) =>
//todo on class 붙이고 빼는건 자바스크립트로 처리
  `<li class="on"> <ul class="tab-content-box">${inner}</ul></li>`;
const banchanInnerHTML = ( {description, title, imgUrl, originalPrice, realPrice} ) => `<li>
                                 <a class="thumbnail-box" href="#">
                                     <div class="thumbnail">
                                         <img src="${imgUrl}" alt="${title}" />
                                         <div class="badge-wrapper">
                                         </div>
                                     </div>

                                     <dl class="content">
                                         <dt class="title">${title}</dt>
                                         <dd class="desc">${description}</dd>
                                         <dd class="price-wrapper">
                                             <span class="original-price">${originalPrice}</span>
                                             <span class="final-price">
                                               <span class="number">${realPrice}</span>
                                               <span class="unit">원</span>
                                             </span>
                                         </dd>
                                     </dl>
                                 </a>
                             </li>`