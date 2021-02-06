
  function deleteRow(row){
   var d = row.parentNode.parentNode.rowIndex-1;
   document.getElementById('content').deleteRow(d);
 
   for (var rep = 0; rep <=3;rep++){
      document.getElementById('taccounts').deleteRow(d);
   }
  
   
   display_accounting();
   calculate(row);
}
     function addData(){
        // td.getAttribute('align','valign');
     var table = document.getElementById("content");

     var row = table.insertRow(table.rows.length-1);
     row.setAttribute("onkeyup","calculate(this)");
     row.setAttribute("onclick","calculate(this)");
     var id = table.rows.length-1;
     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2);
     var cell4 = row.insertCell(3);
     var cell5 = row.insertCell(4);
     var cell6 = row.insertCell(5);     
     var cell7 = row.insertCell(6); 
     var cell8 = row.insertCell(7); 
     cell1.innerHTML = "<textarea class='contentDescription' id ='contentDescription"+id+"'/>";
     cell2.innerHTML = " <input class='contentInput'  id ='quantity" + id +"' type='number' value ='0' >";
     cell3.innerHTML = " <input class='contentInput'  id ='unitprice" + id +"' type='number' value ='0' >";
     cell4.innerHTML = " <input class='contentInput'  id ='amount" + id +"' type='number' value ='0' >";
     cell5.innerHTML = " <input class='contentInput'  id ='tax" + id +"' type='number' value ='0' >";
     cell6.innerHTML = " <input class='contentInput'  id ='total" + id +"' type='number' value ='0' >";
     cell7.innerHTML = " <i  id ='printbtn' class='fa fa-trash icon-white' onclick = 'deleteRow(this)' ></i>";
     cell8.innerHTML = "<input type='checkbox' id='vat"+id+"' >";

     display_accounting();

     var t_table = document.getElementById("taccounts");
     var t_row = t_table.insertRow(t_table.rows.length);
     var t_cell1 = t_row.insertCell(0);
     var t_cell2 = t_row.insertCell(1);
     var t_cell3 = t_row.insertCell(2);
      t_cell1.innerHTML = "<span id ='tcontentDescription"+id+"'/></span>";
      t_cell2.innerHTML =  "<span id ='tamount"+id+"'/> 0  </span>";

      var t_table = document.getElementById("taccounts");
      var t_row = t_table.insertRow(t_table.rows.length);
      var t_cell1 = t_row.insertCell(0);
      var t_cell2 = t_row.insertCell(1);
      var t_cell3 = t_row.insertCell(2);
       t_cell1.innerHTML = "<span id ='tVAT"+id+"'/>VAT</span>";
       t_cell2.innerHTML =  "<span id ='tVATamount"+id+"'/> 0  </span>";
      var t_table = document.getElementById("taccounts");
      var t_row = t_table.insertRow(t_table.rows.length);
      var t_cell1 = t_row.insertCell(0);
      var t_cell2 = t_row.insertCell(1);
      var t_cell3 = t_row.insertCell(2);
      

 t_cell1.innerHTML = "<span id ='tAP"+id+"'/> A / P </span>";
t_cell3.innerHTML ="<span id ='tAPamount"+id+"'/> 0  </span>";

var t_table = document.getElementById("taccounts");
var t_row = t_table.insertRow(t_table.rows.length);
var t_cell1 = t_row.insertCell(0);
var t_cell2 = t_row.insertCell(1);
var t_cell3 = t_row.insertCell(2);


t_cell1.innerHTML = "<span id ='tEWT"+id+"'/> EWT </span>";

t_cell3.innerHTML ="<span id ='tEWTamount"+id+"'/> 0  </span>";



    
    
    
}




function calculate(index){
 
   var q = document.getElementById("content").rows[index.rowIndex-1].cells[1].getElementsByTagName("input")[0].value;
   var u = document.getElementById("content").rows[index.rowIndex-1].cells[2].getElementsByTagName("input")[0].value;
   
   var va = q *u;
   document.getElementById("content").rows[index.rowIndex-1].cells[3].getElementsByTagName("input")[0].value=va;

   var t = document.getElementById("content").rows[index.rowIndex-1].cells[4].getElementsByTagName("input")[0].value;
   var tt = va * t;
   var a = va - tt;
   document.getElementById("content").rows[index.rowIndex-1].cells[5].getElementsByTagName("input")[0].value=a;
   
   Subtotal();
  VAT();
  display_accounting();
  description(index.rowIndex);

}
      
function Subtotal(){
 
  
   var x = document.getElementById("content").rows.length;
   var subtotal = 0.0;

   for(var total_row=0;total_row<x-1;total_row++){
     
      var y = document.getElementById("content").rows[total_row].cells[5].getElementsByTagName("input")[0].id;
      var total_temp = parseFloat (document.getElementById(y).value);
      subtotal +=  total_temp;
      document.getElementById("Subtotal").innerHTML=subtotal;
   }
   
}

function VAT(){
   var x = document.getElementById("content").rows.length;
   var tax = 0;
   for (var tax_row = 0; tax_row<x-1;tax_row++){
      var checkBox = document.getElementById(document.getElementById("content").rows[tax_row].cells[7].getElementsByTagName("INPUT")[0].id);
      var y = document.getElementById("content").rows[tax_row].cells[3].getElementsByTagName("INPUT")[0].id;
      var amount_temp = parseFloat (document.getElementById(y).value);
      if (checkBox.checked == true){
        tax += amount_temp;
      } 
   }
   tax *= 0.12;
   document.getElementById("Tax").innerHTML=tax;
   Total_Amount();
}

function Total_Amount(){
   var subtotal= parseFloat (document.getElementById("Subtotal").innerHTML);
   var vat=parseFloat(document.getElementById("Tax").innerHTML);
   Total_amount = subtotal+vat;
   document.getElementById("Total").innerHTML = Total_amount;
}

function display_accounting(){
   var x = document.getElementById("content").rows.length-1;
   var div_accounting = document.getElementById("accounting");
   if (x>0){
      div_accounting.style.display = "block";
   }
   else {
      div_accounting.style.display = "none";
   }   
}

function description(index){
   document.getElementById("taccounts").rows[(index-1)*4].cells[0].getElementsByTagName("span")[0].innerHTML = document.getElementById("content").rows[index-1].cells[0].getElementsByTagName("textarea")[0].value;
   document.getElementById("taccounts").rows[(index-1)*4].cells[1].getElementsByTagName("span")[0].innerHTML =  document.getElementById("content").rows[index-1].cells[3].getElementsByTagName("input")[0].value;
   
   var checkBox = document.getElementById(document.getElementById("content").rows[index-1].cells[7].getElementsByTagName("INPUT")[0].id);

      if (checkBox.checked == true){
          document.getElementById("taccounts").rows[((index-1)*4)+1].cells[1].getElementsByTagName("span")[0].innerHTML =parseFloat( document.getElementById("content").rows[index-1].cells[3].getElementsByTagName("input")[0].value) * .12;
  
      }
      else if (checkBox.checked == false){
         document.getElementById("taccounts").rows[((index-1)*4)+1].cells[1].getElementsByTagName("span")[0].innerHTML ="0";
            } 
      
   document.getElementById("taccounts").rows[((index-1)*4)+2].cells[2].getElementsByTagName("span")[0].innerHTML =  document.getElementById("content").rows[index-1].cells[5].getElementsByTagName("input")[0].value;
   document.getElementById("taccounts").rows[((index-1)*4)+3].cells[2].getElementsByTagName("span")[0].innerHTML =parseFloat( document.getElementById("content").rows[index-1].cells[3].getElementsByTagName("input")[0].value) * parseFloat( document.getElementById("content").rows[index-1].cells[4].getElementsByTagName("input")[0].value);
  
   
}




function check(){
   var y = document.getElementById("content").rows[0].cells[5].getElementsByTagName("input")[0].value;
   alert(y);
   alert("aw");
}