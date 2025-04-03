
import logo from './logo.png'
import searchIcon from './search-icon.png'
import shoppingBasket  from './shopping_basket.png'
import header from './header-img.png'
import fruit1 from './fruit1.png'
import fruit2 from './fruit2.png'
import fruit3 from './fruit3.png'
import vegetable1 from './vegetable1.png'
import vegetable2 from './vegetable2.png'
import vegetable3 from './vegetable3.png'
import vegetable4 from './vegetable4.png'
import menu1 from './menu1.png'
import menu2 from './menu2.png'
import menu3 from './menu3.png'
import menu4 from './menu4.png'
import egg1 from './egg1.jpg'
import milk1 from './milk1.png'
import addiconwhite from './addiconwhite.png'
import removeiconred from './removeiconred.png'
import cross_icon from './cross_icon.png'


export const assets = {
    logo, searchIcon, shoppingBasket, header, addiconwhite, removeiconred, cross_icon
}


export const menu_list = [
{
    menu_name: "Fruits",
    menu_image: menu1
},
{
    menu_name: "Vegetables",
    menu_image: menu2
},{
    menu_name: "Eggs",
    menu_image: menu3

},
{
    menu_name: "Dairy",
    menu_image: menu4
}



]

export const product_list = [
    {
        _id: "1",
        name: "Apple Granny Smith",
        image: fruit1,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Fruits"
    },
    {
        _id: "2",
        name: "Peach",
        image: fruit2,
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Fruits"
    }, {
        _id: "3",
        name: "Pear Viljamovka",
        image: fruit3,
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Fruits"
    }, {
        _id: "4",
        name: "Chili Pepper",
        image: vegetable1,
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Vegetables"
    }, {
        _id: "5",
        name: "Cucumber",
        image: vegetable2,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Vegetables"
    }, {
        _id: "6",
        name: "Tomato",
        image: vegetable3,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Vegetables"
    }, {
        _id: "7",
        name: "Red Onion",
        image: vegetable4,
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Vegetables"
    },{
        
            _id: "8",
            name: "Yellow egg",
            image: egg1,
            price: 21,
            description: "Food provides essential nutrients for overall health and well-being",
            category: "Eggs"
        
    },
    {
        _id: "9",
        name: "Cow's milk",
        image: milk1,
        price: 200,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Dairy"
    }
]

