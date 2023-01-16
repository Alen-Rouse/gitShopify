$(()=>{
  $('.minicart__close').click(function(){
	$('.mini-card').css('right','-100%');

  })
  $('.product-minilist-item-btn.hover').hover(function(){
		$(this).closest('.product-minilist-item').find('.product-minilist-item-price').animate({
    				opacity: 1,
    
  			}, 500);
		

  },function(){
		$(this).closest('.product-minilist-item').find('.product-minilist-item-price').animate({
    				opacity:0,
    
  			}, 500);

  });	
  
});

function refreshCart() {

    $.ajax({
        url: '/cart.js',
        dataType: "json",
        cache: false,
        success: function (cart) {
          
          var asTotalPrice = cart.original_total_price,
			  asTotalDiscount = cart.total_discount;

            $(".cart-count-bubble").empty();
            $cartBtn = $(".cart-count-bubble");
            var value = $cartBtn.text() || '0';
            var cart_items_html = "";
            var cart_action_html = "";

            var $cart = $(".cart_content form");

            $cartBtn.text(value.replace(/[0-9]+/, cart.item_count));

            if (cart.item_count == 0) {
                $('.js-empty-cart__message').removeClass('hidden');
                $('.js-cart_content__form').addClass('hidden');
            } else {
                $('.js-empty-cart__message').addClass('hidden');
                $('.js-cart_content__form').removeClass('hidden');

                $.each(cart.items, function (index, item) {
                    var line_id = index + 1;
                    cart_items_html += '<div class="mini-cart_item" data-id="'+ item.id +'">';

                    if (item.image) {
                        cart_items_html += '<div class="mini-cart_image">' +
                            '<a href="' + item.url + '">' +
                            '<img src="' + item.image.replace(/(\.[^.]*)$/, "_compact$1").replace('http:', '') + '" alt="' + item.title + '" />' +
                            '</a>' +
                            '</div>';
                    }

                    var item_title = item.title.split(' - ');
                    cart_items_html += '<div class="remove__btn">' +
                        '<a href="#" class="mini-cart_item-remove" data-variant-id="' + item.id + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="presentation" class="icon icon-remove"><path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"/><path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"/></svg></a>' +
                        '</div>' + '<div class="mini-cart_item__wrapper">' +
                        '<div class="mini-cart_item-header">' +
                        '<a href="' + item.url + '" class="mini-cart_item-title">' + item_title[0] + '</a>' +
                        '</div>';

                    /*cart_items_html +='<div class="remove__btn">' + 
                      '<a href="#" class="mini-cart_item-remove" data-variant-id="'+ item.id +'">×</a>' +
                      '</div>';*/
                    cart_items_html += '<div class="mini-cart_item-options">';
                   /* $.each(item.options_with_values, function (index, option) {
                        cart_items_html += '<div class="mini-cart_item-option"><span class="item-option-label">' + option.name + ': </span><span class="item-option-value">' + option.value + '</span></div>';
                    });*/
                    if (item.properties) {
                        $.each(item.properties, function (title, value) {
                            if (value) {
                                cart_items_html += '<div class="line-item">' + title + ': ' + value + '</div>';
                            }
                        });
                    }


                    cart_items_html += '<div class="mini-cart_item-option mini-cart_item-summary">';
                    cart_items_html += '<div class="mini-cart_item-quantity">' +
                        /* '<span class="item-option-label">'+ theme.strings.quantity +': </span>'+*/
                        '<span class="item-option-value">' + item.quantity + '</span>' +
                        '<form action="/cart/add" class="product-form my-product-form" method="post" id="cart">'+
                      	'<quantity-input class="quantity">'+
                      	'<button class="quantity__button no-js-hidden" name="minus" type="button">'	+
                      		
                      			' - '+
                      
                      
                      	'</button>'+
                      	'<input type="number" min="0" class="quantity__input" value="'+ item.quantity +'" id="Quantity- '+ item.index +'" data-index="Quantity- '+ item.index +'" data-id="' + item.id + '">'+
                      
                      
                      	'<button class="quantity__button no-js-hidden" name="plus" type="button">'	+
                      	
                      			' + ' +
                      
                      
                      	'</button>'+
                        '</quantity-input>'+
                      	'</form>'+
                        '</div>';

                    cart_items_html += '<div class="mini-cart_item-price">';
                    var regular_price =  (+item.price * +item.quantity) / 10 ;
                    cart_items_html += '<div class="product__price">' + '<span class =" item-option-label">' + "Price:" + '</span> ₴' + (+regular_price / 10) +'.00</div>'  ;
                    cart_items_html += '</div>'; // .mini-cart_item-price

                    cart_items_html += '</div>'; // .mini-cart_item-summary


                    cart_items_html += '</div>'; // .mini-cart_item-options
                    cart_items_html += '</div>'; // .mini-cart_item__wrapper
                    cart_items_html += '</div>'; // .mini-cart_item


                });
            }

            //var total_price = theme.Currency.formatMoney(cart.total_price, theme.moneyFormat);

            $('.js-mini-cart_items').html(cart_items_html);
           // $('.js-mini-cart_subtotal .money').html(total_price);
          //	$('.money-sale--origin').html(total_price);
           // priceSale();
           // chekedCounterBtn();
          //  nextSizeBox();
		  checkCounter();
          console.log('total: '+asTotalPrice+'; sale: '+asTotalDiscount);

        }

    });

}
function refreshJustAdded(item) {

    $.ajax({
        url: '/cart.js',
        dataType: "json",
        cache: false,
        success: function (cart) {

            var cart_items_html = "";
            cart_items_html += '<div class="mini-cart_item">';

            if (item.image) {
                cart_items_html += '<div class="mini-cart_image">' +
                    '<a href="' + item.url + '">' +
                    '<img src="' + item.image.replace(/(\.[^.]*)$/, "_compact$1").replace('http:', '') + '" alt="' + item.title + '" />' +
                    '</a>' +
                    '</div>';
            }

            var item_title = item.title.split('-');
            cart_items_html += '<div class="mini-cart_item__wrapper">' +
                '<div class="mini-cart_item-header">' +
                '<a href="' + item.url + '" class="mini-cart_item-title">' + item_title[0] + '</a>' +
                '</div>';



            cart_items_html += '<div class="mini-cart_item-options">';
          /*  $.each(item.options_with_values, function (index, option) {

                cart_items_html += '<div class="mini-cart_item-option"><span class="item-option-label">' + option.name + ': </span><span class="item-option-value">' + option.value + '</span></div>';


            });*/
            if (item.properties) {
                $.each(item.properties, function (title, value) {
                    if (value) {
                        cart_items_html += '<div class="line-item">' + title + ': ' + value + '</div>';
                    }
                });
            }


            cart_items_html += '<div class="mini-cart_item-option mini-cart_item-summary">';
            /*cart_items_html +='<div class="mini-cart_item-quantity">'+
              '<span class="item-option-label">'+ theme.strings.quantity +': </span>'+
              '</div>';*/

            cart_items_html += '<div class="mini-cart_item-price">';
            var regular_price = (+item.price * +item.quantity) / 10 ;
            cart_items_html += '<div class="product__price">' + '<span class =" item-option-label">' + "Price:" + '</span>'+ regular_price +'</div>' ;
            cart_items_html += '</div>'; // .mini-cart_item-price

            cart_items_html += '</div>'; // .mini-cart_item-summary


            cart_items_html += '</div>'; // .mini-cart_item-options
            cart_items_html += '</div>'; // .mini-cart_item__wrapper
            cart_items_html += '</div>'; // .mini-cart_item



            console.log(cart);
            //var total_price = theme.Currency.formatMoney(cart.total_price, theme.moneyFormat);

            $('.js-just-added_items').html(cart_items_html);
            //$('.js-just-added_subtotal .money').html(total_price);

            $('.just-added_content').show();
            setTimeout(function () {
                $('.just-added_content').addClass('just-added_show');
            }, 100);

           setTimeout(function () {

                $('.just-added_content').removeClass('just-added_show');
                setTimeout(function () {
                    $('.just-added_content').hide();
                }, 100);
            }, 5000)
            //priceSale();
            //chekedCounterBtn();
            //nextSizeBox();
			checkCounter();
        }
    });

}
function checkCounter(){
		let counter = $('.cart-count-bubble').text();
  		console.log(counter);


}
$(document).on('click', '.product-form__add-to-cart', function (e) {
    e.preventDefault();
    var $addToCartForm = $(this).closest('form');
    var $addToCartBtn = $addToCartForm.find('.product-form__add-to-cart');
	$('.mini-card').css('right','0');
    $.ajax({
        url: '/cart/add.js',
        dataType: 'json',
        cache: false,
        type: 'post',
        data: $addToCartForm.serialize(),
        beforeSend: function () {
            $addToCartBtn.attr('disabled', 'disabled').addClass('disabled');
            //           $addToCartBtn.find('span').text('Adding...');
        },
        success: function (itemData) {
        
            window.setTimeout(function () {
                $addToCartBtn.removeAttr('disabled').removeClass('disabled');
               
            }, 1000);
			
            refreshCart();
            refreshJustAdded(itemData);

        },
        error: function (XMLHttpRequest) {
            var response = eval('(' + XMLHttpRequest.responseText + ')');
            response = response.description;
            $('.warning').remove();

            var warning = '<p class="warning fadeIn">' + response.replace('All 1 ', 'All ') + '</p>';
            $addToCartForm.before(warning);
            $addToCartBtn.removeAttr('disabled').removeClass('disabled');
      
        }
    });

    return false;

});
$(document).on('change', '.mini-cart_item-quantity .quantity__input', function (e) {
    e.preventDefault();
  
  	var $addToCartForm = $(this).closest('form');
  	let value = $(this).attr('data-id');
  	console.log(value);
    $.ajax({
        url: '/cart/add.js',
        dataType: 'json',
        cache: false,
        type: 'post',
        data: $addToCartForm.serialize(),
        success: function (itemData) {
        
          	checkCounter();
            refreshCart();
            refreshJustAdded(itemData);

        },
        error: function (XMLHttpRequest) {
            var response = eval('(' + XMLHttpRequest.responseText + ')');
            response = response.description;
            $('.warning').remove();

            var warning = '<p class="warning fadeIn">' + response.replace('All 1 ', 'All ') + '</p>';
            $addToCartForm.before(warning);
           // $addToCartBtn.removeAttr('disabled').removeClass('disabled');
      
        }
    });

    return false;

});



$(document).on('click', '.mini-cart_item-remove', function (e) {
    e.preventDefault();
  	console.log(1);
    var variant_id = $(this).data('variant-id');
   console.log(variant_id);

    var updates = {
        updates: {}
    };
    updates['updates'][variant_id] = 0;

    $.ajax({
        url: '/cart/update.js',
        dataType: 'json',
        cache: false,
        type: 'post',
        data: updates,
        success: function (data) {
            refreshCart();
            $('.my__btn-add-basked').each(function () {
                $(this).prop('disabled', false);

            });

        }

    })

});

/*$(document).on('change', '.mini-cart_item-quantity .quantity__input', function(e) {
    e.preventDefault();
  	console.log(1);
    var variant_id = $(this).attr('data-id');
    console.log(variant_id);

    var updates = {
        updates: {}
    };
    updates['updates'][variant_id];

    $.ajax({
        url: '/cart/update.js',
        dataType: 'json',
        cache: false,
        type: 'post',
        data: updates,
        success: function (data) {
            refreshCart();
            $('.my__btn-add-basked').each(function () {
                $(this).prop('disabled', false);

            });

        }

    })

});*/