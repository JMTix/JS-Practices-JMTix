//JMTix
//Code that calculates the price per hour based on the price, hours, and discount provided by the user
// With more hours, the higher the price.
 

const price = document.getElementById("price");
const hours = document.getElementById("hours");
const discount = document.getElementById("discount");

const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

// Private functions
function pricePerHour(price, hours) {
    const subtotal = price * hours;
    return subtotal 
};

function applyDiscount(subtotal, discount) {
     const discountAmount = subtotal * (discount / 100);
    return discountAmount
};

function Validate(valuesTable) { //Validates if all the values are a natural number
    
    const errors = valuesTable.filter(
        value => !Number.isInteger(value) || value <= 0
    );

    const validation = errors.length === 0;

   console.log(validation)
   return [validation, errors]
};

//Main function 
function calculateTotal(price, hours, discount) {
    const valuesTable = [price, hours, discount];
    
    const [validation, errors] = Validate(valuesTable)

    console.log(validation);

    if (!validation ) {
        console.log("Theres an invalid value");
        
        if (errors) {console.log(errors)}
        return
    } 

    const subtotal = pricePerHour(price, hours);
    const discountAmount = applyDiscount(subtotal, discount);

    let total;

    if (discount > 0 ) {
         total = subtotal - discountAmount
    } else {
        total = subtotal
    }

    return total
};

function cleanEntry(inputs) {
    inputs.forEach(input => {
        input.value = "";
    });
};
// Event
submitButton.addEventListener("click", function ()  {
    const total = calculateTotal(Number(price.value), Number(hours.value), Number(discount.value))
     
    if (total === undefined) { //Case error
        result.textContent = "Theres an invalid value"
        result.style.color = "#ff0000";

        cleanEntry([price, hours, discount])
    } else {
        result.textContent = total.toFixed(2)
        console.log("The total is: " + total)
    };

});