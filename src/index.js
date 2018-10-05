

var user;
var app;
document.addEventListener('DOMContentLoaded', () => {
  let companyList = document.querySelector("#company-list")
  let profile = document.querySelector("#profile")
  let sidebar = document.querySelector('#sidebar')
  let buyForm = document.querySelector("#buy-stock-form")
  let sellForm = document.querySelector("#sell-stock-form")


  if (user){
    //SWAP THIS OUT LATER WITH SIGNED IN USERS
    User.findByUsername(`${user.username}`)
      .then((foundUser) => {
        let user = new User(foundUser)
        user.renderUserProfile();
        console.log('user rendered')
      })
  }

  app = new App(user)
  app.attachEventListeners();
  app.adapter.fetchCompanies().then(app.createCompanies).then(res => {
    $('#loading').hide()})
  //refreshing companies list every 15 minutes
  // setInterval(function() {app.adapter.refreshCompanies().then(app.createCompanies)},900000);

  //if want to test, refresh companies more often, this refreshes every minute
  // setInterval(function() {app.adapter.refreshCompanies().then(app.createCompanies)}, 60000);
  setInterval(function() {app.adapter.refreshCompanies().then(app.createCompanies)}, 300000);


  document.querySelector(".ui.left.icon.input").addEventListener("keypress",function (e){
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
      app.adapter.getStock(e.target.value).then(res => {
        //may need to refactor this
        if(res > 0){
          alert("input not a company symbol!")
        }
        else{
          let c_modal = document.querySelector("#company")
          app.createCompany(res).then((e) => {
            let newCom = new Company(e)
            let com_list = document.querySelector('#company-list')
            let found = Company.all.find(element =>{
              return element == newCom
            })
            if (!found){
              com_list.append(newCom.renderCompany())
            }
            newCom.renderCompanyModal()
          })
        }
      })
    }
  })




  document.querySelector("#home").addEventListener("click", ()=>{
    alert("Work in progress...")
  })

  document.querySelector("#friends").addEventListener("click", ()=>{
    alert("you got no friends...")
  })

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.90
  setInterval(drawClock, 1000);

  function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }

  function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }

  function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius*0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius*0.85);
      ctx.rotate(-ang);
    }
  }

  function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
  }

  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}) //end of DOM content loaded
