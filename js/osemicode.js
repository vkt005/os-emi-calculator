// EMI = (P * R/12) * [ (1+R/12)^N] / [ (1+R/12)^N-1]       
var emcntnt='<h2 id="osemi-header">EMI Calculator</h2><div class="emi-form"><table class="table table-bordered"><tr class="outstanamount"><td>Outstanding Principle</td> <td><div> <input type="text" placeholder="0.00" id="outstanding_principle" value="2500000" onchange="calculateEMI();"><span class="WebRupee">Rs.</span></div><div id="osp_range"></div></td></tr><tr class="intrate"><td>Interest Rate (%)</td><td><input type="text" placeholder="0.00" id="interest_rate" value="10" onchange="calculateEMI();"><span>%</span><div id="osir_range"></div></td></tr><td>Tenure (in Months)</td><td><div class="osemi-term"><input type="hidden" id="itm" name="itm" value="mth"/><input type="text" placeholder="0.00" id="tenure" value="20" onchange="calculateEMI();"></div><div class="osemi-tenurechoice"><div id="osemi-lyear"><input name="osemi-loantenure" id="osemi-loanyears" class="osemiloanperiod" value="osemi-loanyears" type="radio"><label id="osemi-loanyearslabel" for="osemi-loanyears">Years</label></div><div id="osemi-lmths"><input name="osemi-loantenure" class="osemiloanperiod" id="osemi-loanmonths" value="osemi-loanmonths" checked="checked" type="radio"><label id="osemi-loanmonthslabel" for="osemi-loanmonths">Months</label></div></div></td></table></div><div id="osemi-summary"><div id="osemi-monthlypayment"><h4>Monthly Payment(EMI)</h4><p>Rs. <span id="emi"></span></p></div><div id="osemi-totalinterest"><h4>Total Interest Payable</h4><p>Rs. <span id="tipay"></span></p></div><div id="osemi-totalamount"><h4>Total of Payments (Principal + Interest)</h4><p>Rs. <span id="totpay"></span></p></div></div><div class="clear-style"></div><div id="container"></div>';
google.load("visualization", "1", {packages:["corechart"]});  
var month=new Array();
 month[0]="Jan",month[1]="Feb",month[2]="Mar",month[3]="Apr",month[4]="May",month[5]="Jun",month[6]="Jul",month[7]="Aug",month[8]="Sep",month[9]="Oct",month[10]="Nov",month[11]="Dec";
var f=jQuery.noConflict( false ); 
f(document).ready(function () { 
     f('.emi-container').html(emcntnt);
      f('.osemiloanperiod').click(function(){
            if(f(this).is(':checked')){
                 var cd=f(this).val(),
                     tp=f('#tenure'),
                     tpv=tp.val(),
                     gh=f('#itm'),
                     ghv=f('#itm').val(),
                     zx='';
                 if(cd=='osemi-loanyears'){
                     zx=(tpv/12).toFixed(2);tp.val(zx);
                     gh.val('yth');
                 }
                 if(cd=='osemi-loanmonths'&& ghv !='mth' ){zx=Math.round(tpv*12);tp.val(zx);}
            }             
         });
        calculateEMI();  
f( "#osp_range" ).slider({
    range: "min",
    value: 2500000,
    min: 1,
    max: 100000000,
    slide: function( event, ui ) {
        f( "#outstanding_principle" ).val(ui.value);  calculateEMI();  
    }
});
f( "#osir_range" ).slider({
    range: "min",
    value: 10.5,
    min: 1,
    max: 100,
    slide: function( event, ui ) {
        f( "#interest_rate" ).val(ui.value);  calculateEMI();  
    }
});
        });
function calculateEMI(obj) {  
 var op=f("#outstanding_principle").val(),
        ir=f("#interest_rate").val(),
        ten=f("#tenure").val(),
        ipp=pap=tp=ip='',
        em=f('#emi'),
        tipay=f('#tipay'),
        totpay=f('#totpay');
    // isNaN(isNotaNumber): Check whether the value is Number or Not                
    if ((!isNaN(op) && op !== 0)||(!isNaN(ir) && ir !== 0)||(!isNaN(ten) && ten !== 0)) {
        var emi = 0,P = 0,n = 1,r = 0;                                       
    // parseFloat: This function parses a string and returns a floating point number
       P = parseFloat(op);
       r = parseFloat(parseFloat(ir) / 100);
       n = parseFloat(ten);
       if(f('#osemi-loanyears').is(':checked')) { n=n*12; }
       if (P !== 0 && n !== 0 && r !== 0)
       emi = parseFloat((P * r / 12) * [Math.pow((1 + r / 12), n)] / [Math.pow((1 + r / 12), n) - 1]);
       em.text(CommaFormatted(Math.round(emi)));
       tp=(emi*n).toFixed();
       ip=(tp-P);
       ipp=((ip/tp)*100).toFixed(2);
       pap=(100-ipp).toFixed(2);
       tipay.text(CommaFormatted(Math.round(ip)));
       totpay.text(CommaFormatted(((tp*100)/100)));
       ipp=parseFloat(ipp);         
       pap=parseFloat(pap);          emibreakup(emi,P,r,n);
       var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Total Interest',     ipp],
      ['Principal load amount',      pap]          
    ]);
    var options = {
      width: 500,
      height: 240,
      title: 'EMI Breakup',
      colors: ['#f7b850', '#b6e745'],
      is3D: true
      };
    var chart = new google.visualization.PieChart(document.getElementById('container'));
    chart.draw(data, options);
    }
}
/*code to format currency*/    
function CommaFormatted(amount) {
var numberStr = amount.toString();
    var thousandsMatcher = /(\d+)(\d{3})$/;
    var thousandsAndRest = thousandsMatcher.exec(numberStr);
    if (!thousandsAndRest) return numberStr;
    return thousandsAndRest[1].replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + thousandsAndRest[2];
}
function emibreakup(E,P,r,n){
    var start=new Date(),myArray = [], mir=r/12, mi='', map='',lP=P,
    xd='',
    tempDate = start, 
    monthCount = 1,
    fdr='<h2 id="osemi-mthbrekup">EMI Monthly Breakup</h2><table><thead><tr><th class="mthy">Month-Year</th><th class="pa">Principal(A)</th><th class="int">Interest(B)</th><th class="tp">Total Payment(A + B)</th><th class="tbal">Balance</th></tr></thead><tbody>';
    for(var i=0;i<n;i++){
        var e=tempDate.getMonth()+1;
        mi=lP*mir;
        map=E-mi;
        lP=lP-map;
        fdr+='<tr><td class="mthy">'+month[tempDate.getMonth()]+'-'+tempDate.getFullYear()+'</td><td class="pa"><span class="WebRupee"> Rs. </span>'+CommaFormatted(Math.round(E-mi))+'</td><td class="int"><span class="WebRupee">Rs. </span>'+CommaFormatted(Math.round(mi))+'</td><td class="tp"><span class="WebRupee">Rs. </span>'+CommaFormatted(Math.round(E))+'</td><td class="tbal"><span class="WebRupee"> Rs. </span>'+CommaFormatted(Math.round(lP))+'</td></tr>';
        tempDate.setMonth(e);
    }
    fdr+='</tbody></table>';
    f('#emipaymenttable').html(fdr);
}
