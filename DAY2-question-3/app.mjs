//PART-A

import os from "node:os"

console.log("Free memory:",os.freemem())
console.log("Total number of CPU cores:",os.cpus().length)

//PART-B

import {appendFile, unlinkSync, writeFile} from  "fs"


console.log("hello")
 writeFile("./Data.txt","hello World",()=>{
    console.log("saved")
})
writeFile("./Readme.md","## This is first line in Readme",()=>{
    console.log("saved")
})

appendFile("./Data.txt", "\nThis is second line",()=>{
    console.log("second line added")
})

unlinkSync("./Readme.md")
console.log("next part deleted")
