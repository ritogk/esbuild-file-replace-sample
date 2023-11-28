import { moduleA } from "./module-a"
import { moduleB } from "./module-b"
import moment from "moment"

console.log(moduleA().name)
console.log(moduleB().name)
console.log(moment().format("YYYY-MM-DD"))
