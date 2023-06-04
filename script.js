// https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json

const jsonLink = `https://avivashishta29.github.io/f2-contest-test/db.json`;
const foodItems = document.getElementById("gallery");


// -----------Fetch Menu from the api and dispay in the UI-----------------

async function getMenu() {
  try {
    const response = await fetch(jsonLink);
    const menu = await response.json();
    displayMenu(menu);
    return menu
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}


// --------------Take Order from the customer return 3 burgers randomly and added them in the object.

function takeOrder(menu) {
  return new Promise(resolve => {
    setTimeout(() => {
      const burger = [];
      for(let i=0; i<3; i++){
        const randomIndex = Math.floor(Math.random() *  menu.length);
        burger.push(menu[randomIndex].name);
      }
      const order = {burgers: burger}
      resolve(order);
    }, 2500);
  });
}


//-----------------Preparing order to the costumer returning {order_status:true; paid:false}----------

function orderPrep() {                      
  const pre = document.getElementById('pre');
  pre.innerHTML = `
      <div class="order-prepare">
      <h3>your order is being prepared</h3>
      <p>Please Wait..!</p>
      </div>
  `;
  return new Promise(resolve => {
    setTimeout(() => {
      const obj = {order_status: true, paid:false};
      pre.innerHTML = '';
      resolve(obj);
    }, 1500);
  });
}


// ------------- waiting for Payment status to return {order_status:true; paid:true}----------

function payOrder() {
  const payment = document.getElementById('payment');
  payment.innerHTML =  `
    <div class="payment">
    <h3>thank you for making the payment</h3>
    </div>
  `;
  return new Promise(resolve => {
    setTimeout(() => {
      const obj = {order_status: true, paid:true};
      payment.innerHTML = '';
      resolve(obj);
    }, 1000);
  });
}


//---------------Wishing Customer ---------------------

function thankyouFn(){
  const thankyou = document.getElementById('thankyou');
  thankyou.innerHTML = `
        <div class="thankyou">
        <h3>thankyou for eating with us today!</h3>
        </div>
    `;
  setTimeout(() => {
    console.log('thankyou for eating with us today!');
    alert('Thankyou For Eating With Us Today!');
    thankyou.innerHTML = '';
  }, 100); 
}


// -----------------Starting to Run the Restaurent---------------------

async function runTheRestaurent(){
  
  const items = await getMenu();
  console.log(items);

  const getOrder = document.querySelectorAll(".food-container");
  console.log(getOrder.length);
  getOrder.forEach(get => {
    get.addEventListener('click', async () => {
      
      const order = await takeOrder(items);
      console.log(order);

      const perpared = await orderPrep(order);
      console.log(perpared);

      const paymentStatus = await payOrder(perpared);
      console.log(paymentStatus);

      if(paymentStatus.paid){
        thankyouFn();
      }

    });
  });
  
};

//------------------Run the Restaurent successfully-----------------

runTheRestaurent();




//----------------Function used to Display the Menu in UI----------------

function displayMenu(datas) {
  foodItems.innerHTML = "";

  datas.forEach((data) => {
    foodItems.innerHTML += `
      <div class="food-container">
        <div class="img-container">
          <img src="${data.imgSrc}" alt="">
        </div>
          <div class="item-name">
              <h2 class="name">${data.name}</h2>
              <div class="order">
                  <p class="price">$${data.price}</p>
                  <span>order now</span>
              </div>
          </div>
      </div>
      `;
  });
}





