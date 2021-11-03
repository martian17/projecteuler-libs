/* Table of contents            | return values
 * Array-related functions
   |-repeat(v,n);               | arr
   |-unique(arr);               | arr
   |-arreq(arr1,arr2);          | bool
   |-rotr(arr);                 | arr
   
 * mapper, reducer
   |-mapper{}
   |-reducer{
         sum,
         product
     }
   
 * Combination functions
   |-permutate(pool,cb);        | none, cb(composedArray)
   |-choose(pool,n,cb);         | none, cb(composedArray)
   |-compose(pool,n,cb);        | none, cb(composedArray)
   
 * Digital operations
   |-num_to_digits(n);          | arr
   |-digits_to_num(arr);        | n
   |-num_to_digits_base(n,b);   | arr
   |-digits_to_num_base(n,b);   | n
   
 * Math functions
   |-gcd(a,b);                  | n
   |-isPrime(n);                | bool
   |-fact(n);                   | n
 */


//array-related funcions
let repeat = function(v,n){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr.push(v);
    }
    return arr;
};

let unique = function(arr){//selects out unique element from array
    let hash = {};
    for(let i = 0; i < arr.length; i++){
        hash[arr[i]] = arr[i];
    }
    return Object.values(hash);
};

let arreq = function(a1,a2){
    if(a1.length !== a2.length)return false;
    for(let i = 0; i < a1.length; i++){
        if(a1[i] !== a2[i]){
            return false;
        }
    }
    return true;
};

let rotr = function(arr){
    return [arr.pop(),...arr];
};


//mapper and reducer
let mapper = {
    
};

let reducer = {
    sum:(a,b)=>a+b,
    product:(a,b)=>a*b
};

//combination functons

let permutate = (function(){//pool,cb
    let permutate = function(chosen,pool,cb){
        if(pool.length === 0)cb(chosen);
        let prev = NaN;
        for(let i = 0; i < pool.length; i++){
            if(prev === pool[i])continue;
            prev = pool[i];
            permutate([...chosen,pool[i]],splice(pool,i),cb);
        }
    };
    return function(pool,cb){
        return permutate([],pool,cb);
    }
}());


let choose = (function(){//pool,n,cb
    let choose = function(chosen,pool,n,cb){
        if(n === 0){
            cb(chosen);
            return false;
        }
        for(let i = 0; i < pool.length-n+1; i++){
            choose([...chosen,pool[i]],pool.slice(i+1),n-1,cb);
        }
    };
    return function(pool,n,cb){
        return choose([],pool,n,cb);
    }
}());

let compose = (function(){//pool,n,cb
    let compose = function(composed,pool,n,cb){
        pool = [...pool];
        if(n === 0){
            cb(composed);
            return;
        }
        let v = pool.pop();
        if(pool.length === 0){
            compose([...composed,...repeat(v,n)],pool,0,cb);
            return;
        }
        for(let i = 0; i <= n; i++){
            compose([...composed,...repeat(v,i)],pool,n-i,cb);
        }
    };
    return function(pool,n,cb){
        compose([],pool,n,cb);
    }
}());





//digit operations
let num_to_digits = function(n){//returns digits in reverse
    let digits = [];
    while(n !== 0){
        let d = n%10;
        digits.push(d);
        n = (n-d)/10;
    }
    return digits;
};

let digits_to_num = function(arr){//from reverse digits to number
    let n = 0;
    for(let i = 0; i < arr.length; i++){
        n = n*10+arr[arr.length-i-1];
    }
    return n;
};

let num_to_digits_base = function(n,b){//returns digits in reverse
    let digits = [];
    while(n !== 0){
        let d = n%b;
        digits.push(d);
        n = (n-d)/b;
    }
    return digits;
};

let digits_to_num_base = function(arr,b){//from reverse digits to number
    let n = 0;
    for(let i = 0; i < arr.length; i++){
        n = n*b+arr[arr.length-i-1];
    }
    return n;
};



//math functions
let gcd = function(a,b){
    [a,b] = a>b?[a,b]:[b,a];
    while(b !== 0){
        a = a-b;
        [a,b] = a>b?[a,b]:[b,a];
    }
    return a;
};

//adaptive isprime function
let isPrime = (function(){
    let primeTable = [false,false,true];
    let primes = [2];
    return function(n){
        if(n < primeTable.length){
            return primeTable[n];
        }
        
        for(let i = primeTable.length; i <= n; i++){
            let sqrt = Math.ceil(Math.sqrt(n));
            let primeFlag = true;
            for(let j = 0; j < primes.length; j++){
                let prime = primes[j];
                if((i/prime)%1 === 0){
                    primeFlag = false;
                    break;
                }
                if(prime >= sqrt){
                    break;
                }
            }
            if(primeFlag){
                primes.push(i);
            }
            primeTable[i] = primeFlag;
        }
        return primeTable[n];
    };
}());


let fact = function(n){//factorial
    let f = 1;
    for(let i = 1; i <= n; i++){
        f *= i;
    }
    return f;
};

module.exports = {
    //* Array-related functions
    repeat,
    unique,
    arreq,
    rotr,
    
    //* mapper, reducer
    mapper,
    reducer,
      
    //* Combination functions
    permutate,
    choose,
    compose,
      
    //* Digital operations
    num_to_digits,
    digits_to_num,
    num_to_digits_base,
    digits_to_num_base,
      
    //* Math functions
    gcd,
    isPrime,
    fact
};


