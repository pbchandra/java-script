//object.create
/*
var personproto={
    calculateage:function(){
    document.writeln(2019-this.yearofbirth)
}
};

var john=Object.create(personproto);
john.name='bhuvana';
john.yearofbirth=1995;
john.calculateage();*/

/*
var age=20;
var obj={
    name : 'bhuvan',
    city: 'Hyderabad'
}

function change(a,b){
    a=88;
    b.city="Rajahmundry";
}

change(age,obj);

document.writeln(age);
document.write(obj.city);*/
/*

var years=[2008,1980,1963,1962];
//call back function
function arraycalc(arr,fn){
    var arrayResult=[];
    for(var i=0;i<arr.length;i++){
        arrayResult.push(fn(arr[i]));
}
    return arrayResult;
}


function calculateage(a){
      
        return (2019-a);
        }


function fullage(a){
            document.writeln(a>18);
        }

var ages=arraycalc(years,calculateage);*/
 document.writeln("1" - - "1");