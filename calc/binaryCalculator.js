window.onload = function() {
  localStorage.setItem("mem", 0)
  display = document.getElementById("input2")

  button0 = document.getElementById("b0")
  button0.onclick = function() {
    display = document.getElementById("input2")
    display.value = display.value + 0
  }

  button1 = document.getElementById("b1")
  button1.onclick = function() {
    display = document.getElementById("input2")
    display.value = display.value + 1
  }

  plus = document.getElementById("b+")
  plus.onclick = function() {
    display = document.getElementById("input2")
    display.value = display.value + " + "
  }

  mult = document.getElementById("b*")
  mult.onclick = function() {
    display = document.getElementById("input2")
    display.value = display.value + " * "
  }

  mult = document.getElementById("b/")
  mult.onclick = function() {
    display = document.getElementById("input2")
    display.value = display.value + " / "
  }

  mult = document.getElementById("b%")
  mult.onclick = function() {
    display = document.getElementById("input2")
    display.value = display.value + " % "
  }

  lshift = document.getElementById("b<<")
  lshift.onclick = function() {
    display = document.getElementById("input2").value
    shift = binaryToDecimal(display * 1)
    shift = shift << 1
    document.getElementById("input2").value = decToBinary(shift)
  }

  rshift = document.getElementById("b>>")
  rshift.onclick = function() {
    display = document.getElementById("input2").value
    shift = binaryToDecimal(display * 1)
    shift = shift >> 1
    document.getElementById("input2").value = decToBinary(shift)
  }

  mult = document.getElementById("b&")
  mult.onclick = function() {
    display = document.getElementById("input2")
    display.value = display.value + " & "
  }

  or = document.getElementById("b|")
  or.onclick = function() {
    display = document.getElementById("input2")
    display.value = display.value + " | "
  }

  mr = document.getElementById("bMR")
  mr.onclick = function() {
    display = document.getElementById("input2")
    display.value = decToBinary(localStorage.getItem("mem"))
  }

  clear = document.getElementById("bMC")
  clear.onclick = function() {
    localStorage.setItem("mem", 0)
  }

  bminus = document.getElementById("bM-")
  bminus.onclick = function() {
    value = computeBinary() * 1
    memVal = localStorage.getItem("mem") * 1
    decVal = binaryToDecimal(value) * 1
    localStorage.setItem("mem", memVal - decVal)
  }

  bplus = document.getElementById("bM+")
  bplus.onclick = function() {
    value = computeBinary() * 1
    memVal = localStorage.getItem("mem") * 1
    decVal = binaryToDecimal(value) * 1
    localStorage.setItem("mem", memVal + decVal)
  }


  not = document.getElementById("b~")
  not.onclick = function() {
    display = document.getElementById("input2").value
    newBinary = ""
    for(x=0;x<display.length;x++) {
      if(display.charAt(x) == "1") {
        newBinary += 0
      } else {
        newBinary += 1
      }
    }
    document.getElementById("input2").value = newBinary
  }

  clear = document.getElementById("bC")
  clear.onclick = function() {
    document.getElementById("input2").value = ""
  }

  equal = document.getElementById("b=")
  equal.onclick = function() {
    display = document.getElementById("input2")
    second = false
    left = ""
    operator = ""
    right = ""
    for(x=0; x<display.value.length; x++) {
      ch = display.value.charAt(x)
      if(ch == "+" || ch == "%" || ch == "/" || ch == "*" || ch == "&" || ch == "|") {
        operator = ch
        break
      }
    }
    display.value = computeBinary()
  }
  setup()
}

function computeBinary() {
  display = document.getElementById("input2")
  second = false
  left = ""
  operator = ""
  right = ""
  single = true
  for(x=0; x<display.value.length; x++) {
    ch = display.value.charAt(x)
    if(second) {
      if(ch == "+" || ch == "%" || ch == "/" || ch == "*" || ch == "&" || ch == "|") {
        single = false
        operator = ch
      } else {
        if(ch != " ") {
          right += ch
        }
      }
    } else {
      if(ch == " ") {
        second = true
      } else {
        left += ch
      }
    }
  }
  if(single) {
    return display.value.trim()
  }

  leftDec = binaryToDecimal(left) * 1
  rightDec = binaryToDecimal(right) * 1
  console.log(leftDec)
  console.log(rightDec)
  if(operator == "+") {
    return decToBinary(leftDec - rightDec)
  }
  if(operator == "*") {
    return decToBinary(leftDec * rightDec)
  }
  if(operator == "/") {
    return decToBinary(leftDec / rightDec)
  }
  if(operator == "%") {
    return decToBinary(leftDec % rightDec)
  }
  if(operator == "&") {
    return decToBinary(leftDec & rightDec)
  }
  if(operator == "|") {
    return decToBinary(leftDec | rightDec)
  }
}

function decToBinary(dec) {
  return Number(dec).toString(2)
}

function binaryToDecimal(binary) {
  return parseInt((binary + '').replace(/[^01]/gi, ''), 2)
}
