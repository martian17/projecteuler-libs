/* Table of contents            | return values
 * Array-related functions
   |-repeat(v,n);               | arr
   |-unique(arr);               | arr
   |-arreq(arr1,arr2);          | bool
   |-rotr(arr);                 | arr
   |-concat_destroy(arr1,arr2); | none
   |-splice(arr,n);             | arr
   |-bytesToString(arr)         | str
   |-stringToBytes(str)         | arr
   
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
   |-isPrime_conseq(n);         | bool
   |-primeFactor(n);            | arr
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

let concat_destroy = function(a1,a2){
    for(let i = 0; i < a2.length; i++){
        a1.push(a2[i]);
    }
};

let splice = function(arr,i){
    arr = [...arr];//clone
    arr.splice(i,1);
    return arr;
};

let bytesToString = function(arr){
    return String.fromCharCode(...arr);
};

let stringToBytes = function(s){
    let result = [];
    for(let i = 0; i < s.length; i++){
        result.push(s.charCodeAt(i));
    }
    return result;
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


//tables, used by a lot of functions
let primeTable = [false,false,true];
let primes = [2];

//efficeint version of prime function
let isPrime = function(n){
    if(n < primeTable.length){
        return primeTable[n];
    }
    
    //contingency: square root loop
    let originalLength = primes.length;
    let tail = primes[originalLength - 1];
    let sqrt = Math.floor(Math.sqrt(n));
    
    //common case fast, check the existing list first
    for(let i = 0; i < primes.length; i++){
        let prime = primes[i];
        if(prime > sqrt){
            return true;
        }
        if((n/prime)%1 === 0){//not prime
            return false;
        }
    }
    
    
    if(n > tail*tail){//need to find more primes
        for(let i = primeTable.length; i <= sqrt; i++){
            let primeFlag = true;
            let isqrt = Math.floor(Math.sqrt(n));
            for(let j = 0; j < primes.length; j++){
                let prime = primes[j];
                if(prime > isqrt){
                    break;
                }
                if((i/prime)%1 === 0){//i is not prime
                    primeFlag = false;
                    break;
                }
            }
            if(primeFlag){
                primes.push(i);
            }
            primeTable.push(primeFlag);
        }
    }
    
    //console.log(primes);
    //console.log(primeTable);
    //console.log(sqrt);
    //square root test
    for(let i = originalLength; i < primes.length; i++){
        let prime = primes[i];
        if(prime > sqrt){
            return true;
        }
        if((n/prime)%1 === 0){//not prime
            return false;
        }
    }
    return true;
};


//adaptive isprime function
let isPrime_conseq = function(n){
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

let primeFactor = function(n){
    if(n < 2)return [];
    let sqrt = Math.sqrt(n);
    let factors = [];
    for(let i = 0; i < primes.length; i++){
        let prime = primes[i];
        if(prime > sqrt){
            //console.log(primes[i],n);
            //n is probably a prime, add to factors
            factors.push(n);
            return factors;
        }
        while((n/prime)%1 === 0){
            factors.push(prime);
            n /= prime;
            let sqrt = Math.sqrt(n);
        }
        if(n === 1)return factors;
    }
    for(let i = primes[primes.length-1]+1; i <= sqrt; i++){
        if(isPrime_conseq(i)){
            let prime = i;
            while((n/prime)%1 === 0){
                factors.push(prime);
                n /= prime;
                let sqrt = Math.sqrt(n);
            }
            if(n === 1)return factors;
        }
    }
    //console.log(sqrt,n);
    factors.push(n);
    return factors;
};


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
    concat_destroy,
    splice,
    bytesToString,
    stringToBytes,
    
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
    isPrime_conseq,
    primeFactor,
    fact,
    
    //* internal values
    primeTable,
    primes
};


