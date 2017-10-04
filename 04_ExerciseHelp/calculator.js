// CALCULATOR.JS
//   Note: Look at 03_Sample program first
//
//

// 
class Calculator {

    constructor(elementId) {
        this.Model = {
        };
    
        this.View = {
          textRow : {id: "textRow", type: "text", value: "", onclick:""},
          button7 : {id: "button7", type: "button", value: 7, onclick:""},
          button8 : {id: "button8", type: "button", value: 8, onclick:""},
          container : document.getElementById(elementId)
        };
    
        this.Controller = {
          viewClickHandler : function(e) {
             let target = e.target;
             if (target.id == "button7") {
               this.button7Handler();
             }
          }
        }; 

        this.attachButtonHandlers();
        let htmlString = this.createHTMLforView();
        console.log(htmlString);
        this.View.container.innerHTML = htmlString;
        return this;
    
    } // end of constructor
    
    
    
    //
    // attachButtonHandlers
    // determines what action is taken when a button is clicked
    // makes sure that when we click on a button or cell, the "this"
    // reference is fixed to that cell
    //
    attachButtonHandlers() {
       this.View.container.onclick 
          = this.Controller.viewClickHandler.bind(this);
    }


    //
    // button7Handler
    //
    button7Handler() {
      alert("Hi this is button7 in " + this.View.container.id);
    }

    //
    // createHTMLforView
    // Utility. creates HTML formatted text for the entire view
    //
    createHTMLforView() {
      var s;
      s = "<table id=\"myTable\" border=2>"

      // row for results
      s += "<tr><td>" + this.createHTMLforElement(this.View.textRow) + "</td></tr>";
      s += "<tr><td>";

      // thisulator buttons
      s += this.createHTMLforElement(this.View.button7);
      s += this.createHTMLforElement(this.View.button8);
      s += "</tr></td></table>";
      return s;
    }


    //
    // createHTMLforElement
    // utility. creates html formatted text for an element
    //
    createHTMLforElement(element) {
      var s = "<input ";
      s += " id=\"" + element.id + "\"";
      s += " type=\"" + element.type + "\"";
      s += " value= \"" + element.value + "\"";
      s += " onclick= \"" + element.onclick + "\"";
      s += ">";
      return s;
    }

} // end of Calculator;

