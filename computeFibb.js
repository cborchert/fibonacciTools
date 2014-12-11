//A recursive function to determine the nth fibonacci number
function fibonacci(term){
    if(term < 3){
        return 1;
    }
    else{
        return fibonacci(term-2) + fibonacci(term-1);
    }
}

//A function to determine the nth fibonacci number
function fibonacci_smart(term){
    var horizon = Math.pow(2,53)
    alert("horizon set at:" + horizon);
    var current = 0;
    var last = 0;
    var placeholder;
    for(var i=1; i<=term; i++){
        placeholder = current;
        current += last;
        last = placeholder;
        if(current<1){ current = 1};
        if(current >= horizon){ alert("HORIZON BREACHED at iteration " + i);}
        console.log("Current:"+current+" Last:"+last+" Placeholder:"+placeholder);
    }
    console.log(current);
    return current;

}

//A function to determine and return the nth fibonacci number using bigInt
function fibonacci_bigInt(term){
    var horizon = Math.pow(2,53)
    var current = "0";
    var last = "0";
    var placeholder;
    for(var i=1; i<=term; i++){
        placeholder = current;
        current = bigInt(current).add(bigInt(last)).toString();
        last = placeholder;
        if(bigInt(current).compare(1)==-1){ current = "1"};
        //console.log("Current:"+current+" Last:"+last+" Placeholder:"+placeholder);
    }
    return current;
}

//returns the first n fibonacci numbers as an array
function fibonacci_toArray_bigInt(term){
   var current = "0";
    var last = "0";
    var placeholder;
    var sequence = Array();
    for(var i=1; i<=term; i++){
        placeholder = current;
        current = bigInt(current).add(bigInt(last)).toString();
        last = placeholder;
        if(bigInt(current).compare(1)==-1){ current = "1"};
        //console.log("Current:"+current+" Last:"+last+" Placeholder:"+placeholder);
        sequence.push(current);
    }
    return sequence;
}

//returns an array mod d
function modArray(array, divisor){
    var moduli = Array();
    array.forEach( function (element, index){
        moduli.push(bigInt(element).divmod(divisor)["remainder"].toString());
    });

    return moduli;
}

//Searches the Fibonacci sequence for multiples of the factor, and returns the least multiple but not past the nth fibonacci term
function search_fib_mult(factor, n){
    n = typeof n !== 'undefined' ?  n : 1000;
    var match = false;
    var i = 0;
    var term = 1;
    while (i<=n && !match){
        i++;
        term = fibonacci_bigInt(i);
        if(term%factor === 0){
           match = true;
        }
    }
    return i;
}

//returns the length of the given remainder sequence
function lengthOfModSequence(divisor, searchLength){
    searchLength = typeof searchLength !== 'undefined' ?  searchLength : 1000;
    var n = search_fib_mult(divisor, searchLength);
    var l =(n*6+3);
    var array = modArray(fibonacci_toArray_bigInt(l), divisor)
    for(var i = 0; i<array.length; i++){
        //find a one, save the index value of that one
        //console.log(array[i]);
        if(array[i] == 1){
             //console.log("Found a one");
            //check to see if the next number is a 0
            if (array[i+1] == 0){
                //console.log("Found a zero!");
                return (i + 2);
            }
        }
    }
    return false;
}

//tests our prediction
function testPrediction(searchLength){
    searchLength = typeof searchLength !== 'undefined' ?  searchLength : 1000;
    for(var i=1; i<=searchLength; i++){
        //Determine predicted L
        var n = search_fib_mult(i);
        var predicted = n%2==0?n*2:n*4;
        //console.log(predicted);
        //Determine actual L
        var actual = lengthOfModSequence(i);
        //console.log(actual);

        //If they are not equal, output d, predicted l, and actual
        if(predicted!==actual){
            console.log("FALSE d=" + i + " p="+predicted+" l="+actual);
        }
    }
}
