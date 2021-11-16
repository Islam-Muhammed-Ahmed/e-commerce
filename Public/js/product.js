let productImages = document.querySelectorAll(".product-images img");
let productImgsSlide = document.querySelector(".image-slider");
let activeImage = 0;

productImages.forEach((item, i)=>{
    item.addEventListener("click",(eo)=>{
        productImages[activeImage].classList.remove("active");
        item.classList.add("active");
        productImgsSlide.style.backgroundImage = `url("${item.src}")`;
        activeImage = i;
    });
});

// toggle size buttons

let sizeBtns = document.querySelectorAll(".size-radio-btn");
let checkBtn = 0;

sizeBtns.forEach((item, i)=>{
    item.addEventListener("click",()=>{
        sizeBtns[checkBtn].classList.remove("check");
        item.classList.add("check");
        checkBtn = i;
    });
});

// fetch data
// let fetchProductData = ()=>{
//     fetch("/get-products",{
//         method: 'post',
//         headers: new Headers({'content-type':"application/json"}),
//         body: JSON.stringify({id:productId})
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     // .catch(err=>{
//     //     location.replace('/404')
//     // })
// }
// let productId = null;

// if(location.pathname != '/products'){
//     productId = decodeURI(location.pathname.split('/').pop());
//     // console.log(productId);
//     fetchProductData();  
// }
