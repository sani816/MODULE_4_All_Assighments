export default function checkPrime(number){
if(number<=1) return false
else if(number==2) return true
for(let i=2;i<number;i++){
    if(number%i==0) return false

    else return true
}
}

