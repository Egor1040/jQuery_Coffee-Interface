'use strict'

let variants = $('.variants');
let cupBlock = $('.cup-block')

fetch('kindcoffee.json')
    .then(response => response.json())
    .then(response => {
        $.each(response, function(index,elem) {
            variants.append(`<li class="variant__coffee">${elem.name}</li>`)
        })
        return response;
    })
    .then(response => {
        cupBlock.html('<img class="cup-block__img" src="./img/cup.png" alt="cup">');
        cupBlock.append('<div class="ingridients"></div>');

        variants.delegate('li', 'click', function() {
            cupBlock.html('<img class="cup-block__img" src="./img/cup.png" alt="cup">');
            cupBlock.append('<div class="ingridients"></div>');
            
            $('.variant__coffee').removeClass('active');
            $(this).addClass('active');
            let temp = $(this).text();
            let recept = response.filter(elem => elem.name === temp);
            let receptArr = recept[0].recipe;

            $.each(receptArr, function(index,elem) {
                $('.ingridients').prepend(`<div class="${elem.className}" style="height: ${elem.volume * 40}px"><p class="ingridients__name">${elem.ingredient}</p></div>`)
            })
        })
    })