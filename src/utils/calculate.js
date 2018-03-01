
export function calculate(list_number, list_sign) {
  let result = list_number[0]
  list_sign.map((item, index) => {
    if (item == '+') {
      result = result * 1 + list_number[index + 1] * 1
    } else if (item == '-') {
      result = result * 1 - list_number[index + 1] * 1
    } else if (item == '×') {
      result = result * 1 * list_number[index + 1] * 1
    } else if (item == '÷') {
      result = result * 1 / list_number[index + 1] * 1
    }
  })
  return result
}
