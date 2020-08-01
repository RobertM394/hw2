$(document).ready(function(){
    
    //global variables
    var itemsPrice = 0.00;
    var tax = 0;
    var shipping = 0;
    var total = 0;
    
    var albumsArray = [];
    var customerCart = [];
    
    //retrieve album IDs and cart length from index.ejs
    cartAlbumIDs = localStorage.getItem('customerCart');
    
    //API call using Ajax to populate albums array from database. Uses app.get("/api/populateAlbumsArray") route in App.js
    populateAlbumArray();
    function populateAlbumArray(){
        
        $.ajax({
            method: "GET",
            url: "/api/populateAlbumsArray",
            type: "JSON",
            async: false,
            
            success: function(data, status){

                data.forEach(function(elem, i){
                  albumObject = {albumID: elem.albumID, title: elem.title, artist: elem.artist, coverImage: elem.coverImage, price: elem.price};
                  albumsArray[i] = albumObject;
                });
            } 
        });//ajax
        
    }//populateAlbumArray()
    
    //populate customerCart based on album IDs added to cart in index.ejs and stored in localStorage
    populateCart();
    function populateCart(){
        
        for (let i = 0; i < cartAlbumIDs.length; i++) {
            customerCart.push(albumsArray[cartAlbumIDs[i]-1]);
            i++;
        }
    };//populateCart
    
    customerCart.forEach(function(elem){
       console.log("Cart contains: " + elem.albumID); 
        
    });
    
    //update cart
    updateCart();
    function updateCart() {
        
        // Clear contents of cart.
        $("#cartList").html("");
        
        customerCart.forEach(function(element, i){
            $("#cartList").append(`${element.coverImage} <br /> Artist: ${element.artist} Title: ${element.title} Price: $${element.price} <br />`);   
            $("#cartList").append(`<button value=${i} type="button" class="btn btn-warning remove"> Remove Item </button> <br /> <br />`);
        });
        // Update total of all displayed elements.
        calculateTotals();
    } //update cart
    
    //function to calculate and display cart price totals
    function calculateTotals(){
        
        itemsPrice = 0.00;
        tax = 0;
        shipping = 0;
        total = 0;
    
        //iterate through customer cart and add price of each element in cart
        customerCart.forEach(function(element){    
            itemsPrice = itemsPrice += element.price;
        });
            
        tax = Math.round((itemsPrice * 0.06), 2);
        shipping = Math.round((itemsPrice * 0.00), 2);
        total = Math.round((itemsPrice + tax + shipping), 2);
        
        $("#itemsTotal").html(`Items: $${itemsPrice}`);
        $("#taxTotal").html(`Tax: $${tax}`);
        $("#shippingTotal").html(`Tax: $${shipping}`);
        $("#orderTotal").html(`Total Price: $${total}`);
    }//calculate totals
    
    //add function to remove items from cart
    $("#cartList").on("click",".remove", function() {
        itemID = $(this).val();
        
        delete customerCart[itemID];
        console.log( $(this).val() );
        
        // Update cart with new display and totals.
        updateCart();
    });//remove items from cart
});//document ready
    