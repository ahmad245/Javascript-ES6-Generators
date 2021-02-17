// simple example
// function* generator(i){
//   let x=  yield i;
//   console.log('x',x);

//    let y= yield i+1;
//    console.log('y',y);


// }

// let generatorValue=generator(1);
// console.log(generatorValue.next());//{value:1,done:false}
// console.log(generatorValue.next()); // {value:2 ,done:false}
// console.log(generatorValue.next()); // {value:undefined,done:true}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// example passing argument to next yield
function* generatorArgumentToNext(i) {
    console.log('i', i);
    const j = 5 * (yield (i * 10))
    console.log('j', j);
    const k = yield (2 * j / 4)
    //yield j;
    console.log('k', k);
    return (i + j + k);
    //return (i+j)
}

let generatorArgumentToNextValue = generatorArgumentToNext(10);
console.log(generatorArgumentToNextValue.next(20));// parameter 20 will replace previous yield with 20 (if there are not previous yield will discard); and the next function tell the generator to execute the first yield (yield(i * 10 ))  {value=i*10 : 10*10 , done:false}
console.log(generatorArgumentToNextValue.next(10));// parameter 10 will replace the previous yield (yield(i*10)) by 10 =>(j=5*(10)) => j=50 and execute the second yield (yield(2*j/4)) =>2*50 / 4 =>25 => {value:25,done:false}
console.log(generatorArgumentToNextValue.next(5));// parameter 5 will replace the previous yield (yield(2*j/4)) by 5 =>k=5 and execute the return (10+50+5)=> 65 => {value:65 ,done:true}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Passing Yield as an Argument of a Function

console.log('<<....Passing Yield as an Argument of a Function............................>>');
function *generatorArgumentOfFuncton(){
  yield;
  foo(yield "I am usless");
}
function foo(x){
    console.log('Just printing argument passed',x)
}
let generatorArgumentOfFunctonValue=generatorArgumentOfFuncton();
console.log(generatorArgumentOfFunctonValue.next());// execute first yield => print undefined because there are not value
console.log(generatorArgumentOfFunctonValue.next()); // execute the second yield =>print I am usless 
console.log(generatorArgumentOfFunctonValue.next()); // exectue the function foo and next() method without any argument  essentially mean the previous yield expression is undefind => print undefined
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('<<................................Yield with a Function Call.................>>');
//Yield with a Function Call

function *fetchUser(){
 yield getData()
}
function getData(){
   return {name:'ahmad',age:35};
}
const fetchGen=fetchUser();
console.log(fetchGen.next())
console.log(fetchGen.next())
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('<<................................Yield with Promises.................>>');
//Yield with Promises

function* fetchUserPromise(){
  const user=yield apiCall();
}
function apiCall(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve({name:'ahmad',age:35})
        }, 2000);
    })
}
let fetchGenPromise=fetchUserPromise();
console.log(fetchGenPromise.next().value.then((data)=>console.log(data)));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('<<................................Yield*........................>>');
//Yield* delegete another generator function

function  *g1(){
    yield 2;
    yield 3;
    yield 4;
}
function *g2(){
    yield 1;
    yield* g1();
    yield 5;
}

let iterator=g2();
console.log(iterator.next());// {value:1,done:false}
console.log(iterator.next());//{value:2,done:false} // from g1() first yield
console.log(iterator.next());//{value:3,done:false} // from g1() second yield
console.log(iterator.next());//{value:4,done:false} // from g1() third yield
console.log(iterator.next());//{value:5,done:false} // from g2() third yield
console.log(iterator.next());//{value:undefined,done:true} 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('<<...............................Yield* with a Built-in Iterable Object........................>>');
//Yield* with a Built-in Iterable Object
//There is one more interesting yield* property worth-mentioning, similar to the return value, yield* can also iterate over iterable objects like Array, String and Map.
function* genFunction(){
  yield* [1,2];
  yield* 'HI';
  yield arguments;
}

let genIterator=genFunction(5,6);
console.log(genIterator.next());//1 first element from [1,2]
console.log(genIterator.next());//2 second element from [1,2]
console.log(genIterator.next());//H
console.log(genIterator.next());//I
console.log(genIterator.next());//5
console.log(genIterator.next());//6
