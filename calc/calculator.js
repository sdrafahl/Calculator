function setup() {
  localStorage.setItem("mem", 0)
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

  button = document.getElementById("C")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    textScreen.value = ""
  }

  button = document.getElementById("+")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    textScreen.value = textScreen.value + " + "
  }

  button = document.getElementById("-")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    textScreen.value = textScreen.value + " - "
  }

  button = document.getElementById("*")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    textScreen.value = textScreen.value + " * "
  }

  button = document.getElementById("/")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    textScreen.value = textScreen.value + " / "
  }

  button = document.getElementById("MR")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    textScreen.value = localStorage.getItem("mem")
  }

  button = document.getElementById("MC")
  button.onclick = function() {
    localStorage.setItem("mem", 0)
  }

  button = document.getElementById("M+")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    val = localStorage.getItem("mem") * 1.0
    val2 = compute(textScreen.value) * 1.0
    localStorage.setItem("mem", val + val2)
  }

  button = document.getElementById("M-")
  button.onclick = function() {
    textScreen = document.getElementById("input")
    val = localStorage.getItem("mem") * 1.0
    val2 = compute(textScreen.value) * 1.0
    localStorage.setItem("mem", val - val2)
  }

}

function updateScreen(string) {
  textScreen = document.getElementById("input")
  textScreen.value = textScreen.value + string
}

function compute(infix) {
  short = true
  infix += " "
  for(x = 0;x<infix.length;x++) {
      if(infix.charAt(x) == "+" || infix.charAt(x) == "-" || infix.charAt(x) == "*" || infix.charAt(x) == "/") {
        short = false
        break
      }
  }
  if(short) {
    return infix.trim()
  }
  post = shuntingYard(infix)
  console.log(post)
  val = computePostFix(post)
  return val
}

function shuntingYard(infix) {
  output = [] // queue
  operator = [] // stack

    character = ""
    expression = false
    for(x=0;x<infix.length;x++) {
      ch = infix.charAt(x)
      if(ch == "-" && infix.charAt(x+1) != " ") {
        character += ch
      } else {
        if(ch == "-" || ch == "+" || ch == "/" || ch == "*") {
          if(ch == "*" || ch == "/") {
            expression = true
          }
          operator.push(ch)
        }
        if(ch != " ") {
          if(ch != "+" && ch != "-" && ch != "*" && ch != "/") {
            character += ch
          }
        } else {
            if(character != "") {
              output.push(character)
              if(expression) {
                output.push(operator.pop())
                expression = false
              }
              character = ""
            }
        }
      }
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
    if(charactor == "+" || charactor == "*" || charactor == "-" || charactor == "/") {
      val1 = stack.pop()
      val2 = stack.pop()
      val1 = val1 * 1.0
      val2 = val2 * 1.0
      if(charactor == "+") {
        stack.push(val1 + val2)
      }
      if(charactor == "-") {
        stack.push(val2 - val1)
      }
      if(charactor == "*") {
        stack.push(val1 * val2)
      }
      if(charactor == "/") {
        stack.push(val2 / val1)
      }
    } else {
      stack.push(charactor)
    }
  }
  return stack.pop()
}
