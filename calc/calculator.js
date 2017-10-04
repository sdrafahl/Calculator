window.onload = function() {
  for(let x = 0; x < 10; x++) {
    id = "" + x
    button = document.getElementById(id)
    button.onclick = function() { updateScreen(x) }
  }
  button = document.getElementById("=")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    val = compute(textScreen.value)
    textScreen.value = val
  }
}

function updateScreen(string) {
  textScreen = document.getElementById("input")
  textScreen.value = textScreen.value + string
}

function compute(infix) {
  post = shuntingYard(infix)
  val = computePostFix(post)
  return val
}

function shuntingYard(infix) {
  infix += " "
  output = [] // queue
  operator = [] // stack

    character = ""
    x = 0
    pre = false
    while(x < infix.length) {
      if((infix.charAt(x) == " " || infix.charAt(x) == "+" || infix.charAt(x) == "-" || infix.charAt(x) == "*") && character != " " && character != "" ) {
        output.push(character)
        if(pre) {
          output.push(operator.pop())
        }
        character = ""
      } else {
        if(infix.charAt(x) == "+" || infix.charAt(x) == "-" || infix.charAt(x) == "*") {
          if(infix.charAt(x) == "*") {
            pre = true
          }
          operator.push(infix.charAt(x))
          console.log(operator)
        }
      }
      if(infix.charAt(x) != " " && infix.charAt(x) != "+" && infix.charAt(x) != "-" && infix.charAt(x) != "*") {
        character += infix.charAt(x)
      }
      x++
    }
  length = operator.length
  for(i = 0;i < length; i++) {
    output.push(operator.pop())
  }

  return output
}

function computePostFix(postFix) {
  stack = []
  length = postFix.length
  for(x = 0; x < length ; x++) {
    charactor = postFix[x]
    if(charactor == "+" || charactor == "*" || charactor == "-") {
      val1 = stack.pop()
      val2 = stack.pop()
      val1 = parseInt(val1)
      val2 = parseInt(val2)
      if(charactor == "+") {
        stack.push(val1 + val2)
      }
      if(charactor == "-") {
        stack.push(val2 - val1)
      }
      if(charactor == "*") {
        stack.push(val1 * val2)
      }
    } else {
      stack.push(charactor)
    }
  }
  return stack.pop()
}
