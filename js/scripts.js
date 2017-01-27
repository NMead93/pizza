var totalPrice = 0;

function pizza (size, quantity, toppings) {
    this.size = size;
    this.quantity = quantity;
    this.toppings = toppings;
    this.price = 0;
}

pizza.prototype.cost = function () {
    var sizePrice = 0;
    if (this.size === "Small") {
        sizePrice = 10.00;
    } else if (this.size === "Medium") {
        sizePrice = 12.00;
    } else if (this.size === "Large") {
        sizePrice = 14.00;
    } else {
        sizePrice = 16.00;
    }
    this.price = this.quantity * (sizePrice + this.toppings.length)
    return this.price;
}

pizza.prototype.toppingToString = function () {
    var toppingString = ""
    for (i = 0; i < this.toppings.length - 1; i++) {
        toppingString += this.toppings[i] + ", ";
    }
    toppingString += this.toppings[this.toppings.length - 1];
    return toppingString;
}

$(function() {
    $('.input').submit(function(event) {
        event.preventDefault()
        var toppings = []
        $('input:checkbox[name=toppings]:checked').each(function() {
            toppings.push($(this).val())
            $('#toppingResult').append("<li>" + $(this).val() + "</li>")
        })

        var newPizza = new pizza($("#size").val(), $('#quantity').val(), toppings)
        $('#orderList').append("<li value=" + newPizza.cost() + ">" + "Size: (" + newPizza.size + ") Toppings: (" + newPizza.toppingToString() + ")  Quantity: (" + newPizza.quantity + ") at $" + newPizza.price + ".00</li>")
        totalPrice += newPizza.price;
        $('#total').text(totalPrice)

        $('li').click(function() {
            totalPrice -= parseInt($(this).val());
            console.log
            $('#total').text(totalPrice)
            $(this).remove();
        })
    })
})
