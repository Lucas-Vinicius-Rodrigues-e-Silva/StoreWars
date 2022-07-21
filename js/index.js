// Selecionando tags que vou usar

const tagUl            = document.querySelector(".mainContentContainer")

const tagUlCart        = document.querySelector("#teste")

const divCartEmpty     = document.querySelector(".itemsQuantityAndValue")

const totalPrice       = document.querySelector(".realPrice")

const totalQuantity    = document.querySelector(".realQuantity")

const total            = document.querySelector("#total")

const searchInput      = document.querySelector(".searchContainer input")

const searchButton     = document.querySelector(".searchContainer button")

const buttonEveryone   = document.querySelector("#todos")

const buttonAcessories = document.querySelector("#acessorios")

const buttonShoes      = document.querySelector("#calcados")

const buttonShirts     = document.querySelector("#camisetas")


//listando Produtos

function listProducts(productList, section){

    section.innerHTML = "";

    for(let i = 0; i < productList.length; i++){

        let products = productList[i]

        let itemCreate = makeProduct(products)

        section.appendChild(itemCreate)
    }
}

listProducts(data,tagUl)

// Fazendo produtos

function makeProduct(products){
    let id                    = products.id;
    let img                   = products.img;
    let itemName              = products.nameItem;
    let description           = products.description;
    let price                 = products.value;
    let categorie             = products.tag;

    let tagLi                 = document.createElement("li");
    let tagImg                = document.createElement("img");
    let tagPCategorie         = document.createElement("p");
    let tagH2                 = document.createElement("h2");
    let tagPDescription       = document.createElement("p");
    let tagSpan               = document.createElement("span");
    let tagButton             = document.createElement("button");

    tagImg.src                = img;
    tagImg.alt                = itemName
    tagPCategorie.innerText   = categorie;
    tagH2.innerText           = itemName
    tagPDescription.innerText = description
    tagSpan.innerText         = `R$ ${price}`.replace(".", ",")
    tagButton.innerText       = "Adicionar ao carrinho"
    tagButton.id              = id

    tagLi.appendChild(tagImg)
    tagLi.appendChild(tagPCategorie)
    tagLi.appendChild(tagH2)
    tagLi.appendChild(tagPDescription)
    tagLi.appendChild(tagSpan)
    tagLi.appendChild(tagButton)
    
    tagLi.classList.add("products")
    tagImg.classList.add("productImage")
    tagPCategorie.classList.add("productCategorie")
    tagH2.classList.add("productName")
    tagPDescription.classList.add("productDescription")
    tagSpan.classList.add("productValue")
    tagButton.classList.add("buyButton")

    return tagLi
}   

// "Escutando" quando o usuário clicka no botão e verificando sé é aquele produto pelo id, além de "esconder" os itens que indicam que o carrinho esta vazio

tagUl.addEventListener("click", takeTheProduct)

let cart = [];

function takeTheProduct(event){

    let buyButton = event.target  
    
    if(buyButton.tagName == "BUTTON"){

        divCartEmpty.classList.add("notEmptyAnymore")
        
        let productId = buyButton.id

        let product = data.find(function(product){

            if(product.id == productId){
                return product
            }

            })

            addToCart(product)
    }
}

// Função de adicionar items no carrinho e chamando a função de listar

function addToCart(product){

    if(product !== undefined){

        cart.push(product)

        listProductsCart(cart, tagUlCart)
    }
}

// função de listar no carrinho, que já soma e mostra a quantidade

function listProductsCart (productList, section){

    section.innerHTML = "";

    if(productList.length >= 1){

        tagUlCart.classList.remove("notEmptyAnymore")

        tagUlCart.classList.add("renderizeCartItems")

        total.classList.remove("notEmptyAnymore")

        total.classList.add("priceContainer")
    }

    let sum = []

    productList.forEach(product => {

        sum.push(product.value)

    });

    let result = sum.reduce((previousValue,currentValue) => previousValue + currentValue, 0);

    totalPrice.innerText = `R$ ${result},00`

    totalQuantity.innerText = productList.length
    
    if(productList == 0){

        tagUlCart.classList.add ("notEmptyAnymore")

        tagUlCart.classList.remove("renderizeCartItems")

        total.classList.add("notEmptyAnymore")

        total.classList.remove("priceContainer")
    }

    for(let i = 0; i < productList.length; i++){

        let products = productList[i]

        let itemInCart = makeProductInCart(products)

        section.appendChild(itemInCart)
    }
}

// função de fazer os produtos do carrinho

function makeProductInCart(products){
    
    let id                      = products.id;
    let img                     = products.img;
    let itemName                = products.nameItem;
    let price                   = products.value;

    let tagLi                   = document.createElement("li");
    let tagImg                  = document.createElement("img");
    let tagH2                   = document.createElement("h2");
    let tagSpan                 = document.createElement("span");
    let trashButton             = document.createElement("img")

    tagImg.src                  = img;
    tagImg.alt                  = itemName;
    tagH2.innerText             = itemName;
    tagSpan.innerText           = `R$ ${price}`.replace(".", ",");
    trashButton.id              = id;
    trashButton.src             = "../img/trash.svg"

    tagLi.appendChild(tagImg)
    tagLi.appendChild(tagH2)
    tagLi.appendChild(tagSpan)
    tagLi.appendChild(trashButton)
    
    tagLi.classList.add("productsCart")
    tagImg.classList.add("productImageCart")
    tagH2.classList.add("productNameCart")
    tagSpan.classList.add("productValueCart")
    trashButton.classList.add("trash")


    return tagLi
}



// "escutando" o botão de remover itens do carrinho

tagUlCart.addEventListener("click", removeItemsFromCart)


// Removendo do carrinho (usando o id para verificar se é mesmo o produto) e removendo a classe que "esconde" os itens de aviso do carrinho vazio

function removeItemsFromCart(event){

    let removeButton = event.target

    if(removeButton.classList == "trash"){

        let productId = removeButton.id

        let removeProduct = cart.find(function(removeProduct){

            if(removeProduct.id == productId){

              return removeProduct
            }
        })

        let index = cart.indexOf(removeProduct)
         
        cart.splice(index,1)

        if(cart.length == 0){

            divCartEmpty.classList.remove("notEmptyAnymore")
    
        }

        listProductsCart(cart, tagUlCart)

    }
        
}

// "Escutando" quando o usuário clicka no botão pesquisar

searchButton.addEventListener("click", searchItems)

// Pegando o que o usuário digitou, enviando para uma função tratar e limpando o campo após a pesquisa

function searchItems(){

    let userSearch = searchInput.value

    let searchResult = search(userSearch)

    listProducts(searchResult,tagUl)

    searchInput.value = ""
}

// Tratando o que o usuário digitou e enviando para um novo array, que será renderizado no lugar dos atuais itens

function search(userSearchValue){

    let userSearchResult = []

    for(let i = 0; i < data.length; i++){

        console.log(data[i])

        let search = userSearchValue.toLowerCase()

        let productName = data[i].nameItem.toLowerCase()

        let categorie = data[i].tag[0].toLowerCase()

        if(productName.includes(search) || categorie.includes(search)){

            userSearchResult.push(data[i])
        }

    }
    return userSearchResult
}

//"Escutando" o click no botão de navegação "Todos"

buttonEveryone.addEventListener("click", everyone)

// Fazendo retornar todos os produtos

function everyone(){
    
    listProducts(data,tagUl)
}

// "Escutando" o click do usuário no botão "Acessórios"

buttonAcessories.addEventListener("click", acessories)

// Verificando qual item tem a tag acessórios, e listando os mesmos

function acessories(){
    
    let acessories = []

    for(let i = 0; i < data.length; i++){

        if(buttonAcessories.innerText == data[i].tag[0]){

            acessories.push(data[i])
        }
    }

    listProducts(acessories,tagUl)
}

// "Escutando" o click do usuário no botão "Calçados"

buttonShoes.addEventListener("click", shoes)

// Verificando qual item tem a tag calçados, e listando os mesmos

function shoes(){
    
    let shoes = []

    for(let i = 0; i < data.length; i++){

        if(buttonShoes.innerText == data[i].tag[0]){

            shoes.push(data[i])
        }
    }

    listProducts(shoes,tagUl)
}

// "Escutando" o click do usuário no Camisetas ""

buttonShirts.addEventListener("click", shirts)

// Verificando qual item tem a tag camisetas, e listando os mesmos

function shirts(){

    let shirts = []

    for(let i = 0; i < data.length; i++){

        if(buttonShirts.innerText == data[i].tag[0]){

            shirts.push(data[i])
        }
    }

    listProducts(shirts,tagUl)
}

// Extra: Dark Mode

const buttonDarkMode = document.querySelector("#switch-shadow")

const body = document.querySelector(".body")

const header = document.querySelector(".boxShadow")

const tittle = document.querySelector(".tittle")

const buttonAll = document.querySelector("#todos")

const buttonOfAcessories = document.querySelector("#acessorios")

const buttonDecoration = document.querySelector("#calcados")

const buttonOfShirts = document.querySelector("#camisetas")

const cardItens = document.querySelector(".mainContentContainer")

const section = document.querySelector(".cart")



buttonDarkMode.addEventListener("click", darkMode)


function darkMode(){

body.classList.toggle("bodyDarkMode")

header.classList.toggle("headerDarkMode")

tittle.classList.toggle("tittleDarkMode")

buttonAll.classList.toggle("buttonsDarkMode")

buttonOfAcessories.classList.toggle("buttonsDarkMode")

buttonDecoration.classList.toggle("buttonsDarkMode")

buttonOfShirts.classList.toggle("buttonsDarkMode")

cardItens.classList.toggle("productsDarkMode")

section.classList.toggle("cartDarkMode")

}