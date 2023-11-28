import { moduleA } from "./module-a"
import { moduleB } from "./module-b"
import moment from "moment"

export const handler = async () => {
  console.log(moduleA().name)
  console.log(moduleB().name)
  console.log(moment().format("YYYY-MM-DD"))
}
