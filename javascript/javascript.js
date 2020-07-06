    //Begin Javascript
    
    //begin JQuery scripts
    $(document).ready(function(){
    
    //global variables
    
    var speakerObj = {id: 1, name: "Type 20 Studio Monitor (single)", image: "<img src='img/type20.jpg' alt='type20'>", price: 1999.00, quantity: 0, weightMultiplier: 3};
    var cableObj = {id: 2, name: "Air Matrix XLR Cables 2.0m (pair)", image: "<img src='img/xlrcables.jpg' alt='xlrCables'>", price: 249.00, quantity: 2, weightMultiplier: 1};
    var cartArray = [speakerObj, cableObj];    
    var shippingBool = false;   
    
    //begin populateCart
    populateCart();
    
    function populateCart() {
        
    //display cart items stored in cartArray
    
    //first item
    $("#cartItems").append(`<div> ${cartArray[0].image} <br> <b>  ${cartArray[0].name} </b> <br /> Price: $${cartArray[0].price} </div> `);
    $("#cartItems").append( `<div> Quantity: 

    <select id="selectOne">
        <option value=""> Select One </option>
        <option value="1"> 1 </option>
        <option value="2"> 2 </option>
        <option value="3"> 3 </option>
        <option value="4"> 4 </option>
  
        <div> <br> <br> `)    
    $("#cartItems").append("<br />")
   
   //second item
    $("#cartItems").append(`<div> ${cartArray[1].image} <br> <b>  ${cartArray[1].name} </b> <br /> Price: $${cartArray[1].price} </div> `);
    $("#cartItems").append( `<div> Quantity: 

    <select id="selectTwo">
        <option value=""> Select One </option>
        <option value="1"> 1 </option>
        <option value="2"> 2 </option>
        <option value="3"> 3 </option>
        <option value="4"> 4 </option>
  
        <div> <br /> <br /> `)    
    }
     $("#cartItems").append("<br />")
   
    //updateQuantity 
    function updateQuantity() {

        //update item quantity in cart array
        cartArray[0].quantity = $("#selectOne").val();  
        cartArray[1].quantity = $("#selectTwo").val();
        
        //record shipping option
        var shippingChoice = $("input[name=shipping]:checked").val();
        console.log(shippingChoice);
        shippingTranslate(shippingChoice);
        
        if (shippingChoice == undefined) {
         $("#shippingValidation").html("Choose a shipping option.");
         
         return;
        }
     
        var itemsTotal = ( (cartArray[0].quantity * cartArray[0].price) + (cartArray[1].quantity * cartArray[1].price) )
        var salesTax = itemsTotal * 0.06
        var shippingTotal = shippingChoice * 10 * ( (cartArray[0].quantity * cartArray[0].weightMultiplier) + (cartArray[1].quantity * cartArray[1].weightMultiplier) )
        shippingBool = true;
        var orderTotal = itemsTotal + shippingTotal + salesTax;
        //save total to local storage
        localStorage.setItem("order_total", orderTotal);
      
        //update item quantity in cart display
        $("#itemsPrice").html(`Items: $ ${itemsTotal}`);
        $("#taxTotal").html(`Tax: $ ${salesTax}`);
        
        $("#shippingCost").html(`Shipping: $ ${shippingTotal} `);
        $("#totalPrice").html(`Order Total: $ ${orderTotal}`);
        
    };
    
    //update order quantity 
    $("#btnQuantity").on("click", function() {
        
    updateQuantity(); 
    });
    
    //place order
     $("#btnOrder").on("click", function() {
         
    if (!shippingBool) {
    $("#shippingValidation").html("Choose a shipping option.");
    
    return;
    }
    
    window.location.href = "orderCompleted.html";
  
         });//


    //open modal 
    $("#addAddress").click(function(){
    $("#myModal").modal();
    });

    //save address button
    $("#saveAddress").on("click", function(){
        
     let name = $("#name").val();
     let phoneNum = $("#phone").val();
     let address_1 = $("#address1").val();
     let address_2 = $("#address2").val();
     let city_State = $("#cityState").val();
     
     localStorage.setItem("customer_name", name);
     localStorage.setItem("customer_phone", phoneNum);
     localStorage.setItem("customer_address_1", address_1);
     localStorage.setItem("customer_address_2", address_2);
     localStorage.setItem("customer_city_state", city_State);
     
     console.log(name);
     $("#cartTitle").html(`${name}'s Shopping Cart`)
        
    });
    
    //associate shipping choice with shipping speed
    function shippingTranslate(arg){
        
        let shippingID = arg;
        let shippingMethod = "";
        
        if (shippingID == "1") {
            shippingMethod = "Ground";
        }
        
        else if (shippingID == "2") {
            shippingMethod = "2nd-Day Shipping";
        }
        
        else {
            shippingMethod = "Overnight";
        }
        
        console.log(shippingMethod);
        localStorage.setItem("customer_shipping_method", shippingMethod);
        
    }
        
    });//document ready
        
        