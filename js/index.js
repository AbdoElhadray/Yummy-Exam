//&                  Start Loading                &//

$(document).ready(function () {
    $(".loading i").fadeOut(300 ,function(){
      $(".loading").fadeOut(300, function(){
        $('.inner-loading').css({'display':'none'});
      })
    })
    $("body").css({"overflow" : "visible"});
});

function showLoading(){
  $('.inner-loading').css({'display':'flex'});
  $('.inner-loading i').fadeIn(300,function(){
    $('.inner-loading').fadeIn(300);
  });
  $("body").css("overflow", "hidden");
}


function hideLoading(){
  $('.inner-loading i').fadeOut(300,function(){
    $('.inner-loading').fadeOut(300);
  });
  $("body").css("overflow", "visible");
}

  




//&                  End Loading                &//

// ^===========================================================^//

//&                  Start SideBar                 &//


let sidebarWidth = $('.sideBar-content').innerWidth();
$(".sideBar").css({ left: -sidebarWidth })


$(".sideBar-links li").animate({top:300}, 500)


function openSideBar() {
  $(".sideBar").animate({ left: '0px' }, 500);
  $(".openSideBar").css({ "display": "none" });
  $(".closeIcon").css({ "display": "block" });

  for (let i = 0; i < 5; i++) {
    $(".sideBar-links li").eq(i).animate({top:0}, (i + 5) * 100)
    console.log($(".sideBar-links li").eq(i));
  }
}


function closeSideBar(){
  $(".sideBar").animate({ left: -sidebarWidth }, 500)
  $(".openSideBar").css({ "display": "block" });
  $(".closeIcon").css({ "display": "none" });

  $(".sideBar-links li").animate({top:300}, 500)
}


$('.openSideBar').click(function(){
  openSideBar();
})


$('.closeIcon').click(function(){
  closeSideBar();
})

//&                  End SideBar                 &//

// ^ ================================================================= ^ //

//&                  Start Main function          &//


async function fetchMealsData(){
  let fetchData = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=`);
  // console.log(fetchData);

  let {meals:data} = await fetchData.json();
  // console.log(mealData);
  return data;
}


async function displayMealData(){
  let mealData = await fetchMealsData();
   console.log(mealData);

  displayMainData(mealData);
}

displayMealData();

// ^ ==================================================================  ^ //


async function mainDetails(mealId){

  showLoading();

  closeSideBar();
  let fetchData = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  let {meals:data} = await fetchData.json();
  console.log(data);


 
  let tagsList = [];

  if(data[0].strTags != null){
    tagsList = data[0].strTags.split(",");  
  }
  else{
    tagsList = [];  
  }

  let tags = '';
  for (let i = 0; i < tagsList.length; i++) {
    tags += `<li class="alert alert-danger p-1 m-2">${tagsList[i]}</li>`
    // console.log(tags);
  }


  let recipesData = '';
  for (let i = 1; i <= 20; i++) {
    if (data[0][`strIngredient${i}`]) { 
      recipesData += `<li class="alert alert-info m-2 p-1">${data[0][`strMeasure${i}`]} ${data[0][`strIngredient${i}`]}</li>`
    }
  }


  let cartona = `<div class="col-md-4">
                  <img src="${data[0].strMealThumb}" class="w-100 rounded-3">
                  <h2>${data[0].strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${data[0].strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${data[0].strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${data[0].strCategory}</h3>
                    <h3>Recipes :</h3>
                  
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${recipesData}
                    </ul>

                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex flex-wrap">
                        ${tags}
                    </ul>

                    <a href="${data[0].strSource}" target="_blank" class="btn btn-success source">Source</a>
                    <a href="${data[0].strYoutube}" target="_blank" class="btn btn-danger youtube">Youtube</a>
                </div>`
  $('#rowData').html(cartona)
  hideLoading();
}

//&                  End Main function            &//

// ^ ================================================================= ^ //

//&                  Start Search  By Name               &//


$("#Search").click(function(){
  closeSideBar();
  $("#rowData").css({"display" : "none"});
  $("#searchContainer").css({"display" : "block"});
  $(".contact").css({"display" : "none"});
})


$("#searchByName").keyup(function(e){
  let searchNameValue = e.target.value;
  
  displaySearchByName(searchNameValue);
  closeSideBar();
  // console.log(searchNameValue);
})


async function getSearchByNameData(searchValue) {
  $(".loading i").fadeIn(300 ,function(){
    $(".loading").fadeIn(300, function(){
      $('.inner-loading').css({'display':'none'});
    })
  })

  let getData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
  let {meals:searchNameData} = await getData.json();

  // console.log(searchNameData);
  $(".loading i").fadeOut(300 ,function(){
    $(".loading").fadeOut(300, function(){
      $('.inner-loading').css({'display':'none'});
    })
  })
  return searchNameData;
}


async function displaySearchByName(searchValue) {
  let searchData = await getSearchByNameData(searchValue);

  console.log("search Data",searchData);
  display(searchData);

  $("#rowData").css({"display" : "flex"});
  

}

//&                  End Search  By Name                    &//

// ^ ================================================================= ^ //

//&                  Start Search  By First Letter           &//

$("#searchByFirstLetter").keyup(function(e){
  let searchFirstLett = e.target.value;
  // console.log(searchFirstLett);


  displayFirstLettData(searchFirstLett? searchFirstLett : "a");

  closeSideBar();
})

async function getSearchByFirstLett(searchLettValue){
  $(".loading i").fadeIn(300 ,function(){
    $(".loading").fadeIn(300, function(){
      $('.inner-loading').css({'display':'none'});
    })
  })
  let fetchData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLettValue}`)

  let {meals:searchFirstLettData} = await fetchData.json();
  // console.log(searchFirstLettData);

  $(".loading i").fadeOut(300 ,function(){
    $(".loading").fadeOut(300, function(){
      $('.inner-loading').css({'display':'none'});
    })
  })
  
  return searchFirstLettData;
}

async function displayFirstLettData(searchLettValue){
  let firstLettData = await getSearchByFirstLett(searchLettValue);
  // console.log(firstLettData);

  display(firstLettData);
  $("#rowData").css({"display" : "flex"});
}

//&                  End Search  By First Letter             &//

// ^ ================================================================= ^ //

//&                 Start Categories             &//

$("#Categories").click(function(){
  closeSideBar();
  $("#searchContainer").css({"display" : "none"});
  $(".contact").css({"display" : "none"});
  displayCategories();
})

// * To get Categories Data From API
async function getCategoriesData(){

  showLoading();

  let getData = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

  let {categories:categoriesData} = await getData.json();

  // console.log(categoriesData);
  
  hideLoading();

  return categoriesData;
}

async function displayCategories(){
  let categoriesMeal = await getCategoriesData();

  console.log(categoriesMeal);

  let cartona = '';
  for (let i = 0; i < categoriesMeal.length; i++) {
    cartona += `<div class="col-md-3">
                  <div onclick="displayCategoriesMeals('${categoriesMeal[i].strCategory}')" class="meal position-relative rounded-2 overflow-hidden">
                      <img src="${categoriesMeal[i].strCategoryThumb}" class="w-100">
                      <div class="meal-layer position-absolute w-100 h-100 p-2 text-black text-center">
                          <h3>${categoriesMeal[i].strCategory}</h3>
                          <p>${categoriesMeal[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                      </div>
                  </div>
                </div>`
                // console.log(categoriesMeal[i].idCategory);
  }
 
 
  $("#rowData").html(cartona);
  $("#rowData").css({"display" : "flex"});
}

// * To get Categories Of Diff type from API
async function getCategoriesMeals(category){
  showLoading();

  let getData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

  // console.log(getData);

  let {meals:categoriesMeals} = await getData.json();

  hideLoading();
  // console.log(categoriesMeals);
  return categoriesMeals;
}


async function displayCategoriesMeals(category){
  closeSideBar();
  let differentCat = await getCategoriesMeals(category);
  // console.log(differentCat);

  display(differentCat);
}
//&                  End  Categories             &//

// ^ ================================================================= ^ //

//&                    Start Area                &//

$("#Area").click(function(){
  closeSideBar();
  $("#searchContainer").css({"display" : "none"});
  $(".contact").css({"display" : "none"});
  displayGetArea();
})


async function getArea(){
  
 showLoading();

  let getData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

  let {meals:getArea} = await getData.json();
  // console.log(getArea);

  hideLoading();
  
  return getArea;
}

async function displayGetArea(){

  let Area = await getArea();
  // console.log(Area);

  let cartona = '';
  for (let i = 0; i < Area.length; i++) {
    cartona += `<div class="col-md-3">
                  <div onclick = "displayMealsOfArea('${Area[i].strArea}')" class="meal rounded-2 text-center text-white">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${Area[i].strArea}</h3>
                  </div>
                </div>`
    
  }
  $("#rowData").html(cartona);
  $("#rowData").css({"display" : "flex"});
  closeSideBar();

}


async function getMealsOfArea(Area){
  showLoading();

  let getData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);

  let {meals:getArea} = await getData.json();
  // console.log(getArea);
  hideLoading();
  return getArea;
}


async function displayMealsOfArea(Area){
  let area = await getMealsOfArea(Area);
  console.log(area);

  display(area); 
  closeSideBar();
}

//&                    End Area                 &//

// ^ ==================================================================  ^ //

//&                    Start Ingredients                 &//

$("#Ingredients").click(function(){
  closeSideBar();
  $("#searchContainer").css({"display" : "none"});
  $(".contact").css({"display" : "none"});
  displayIngredients();
})


async function getIngredientsData(){

  showLoading();

  let getData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);

  let {meals:ingredientsData} = await getData.json();

  // console.log(ingredientsData);

  hideLoading();

  return ingredientsData;
}


async function displayIngredients(){
  let ingredientData = await getIngredientsData();
  console.log(ingredientData);
  let cartona = '';

  for (let i = 0; i < ingredientData.length; i++) {
    if(i<20){
      cartona += `<div class="col-md-3">
                    <div onclick="displayMealsIngredients('${ingredientData[i].strIngredient}')"  class="meal rounded-2 text-center text-white">
                      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                      <h3>${ingredientData[i].strIngredient}</h3>
                      <P>${ingredientData[i].strDescription.split(" ").slice(0,20).join(" ")}</P>
                    </div>
                  </div>`
    }
    else{
      break;
    } 
}
  $("#rowData").html(cartona);
  $("#rowData").css({"display" : "flex"});
  
}


async function getMealsIngredients(ingredientsMeals){

  showLoading();
  let getData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsMeals}`);

  let {meals:ingredientData} = await getData.json();

  console.log(ingredientData);
  hideLoading();

  return ingredientData;
}


async function displayMealsIngredients(ingredientMealData){
  let ingredientMeal = await getMealsIngredients(ingredientMealData);

  display(ingredientMeal);
  closeSideBar();
}
//&                     End Ingredients                  &//




function displayMainData(data){
  let cartona = '';

  for (let i = 0; i< data.length; i++) {
      cartona += `<div class="col-md-3">
                  <div onclick="mainDetails(${data[i].idMeal})" class="meal position-relative rounded-2 overflow-hidden">
                      <img src="${data[i].strMealThumb}" class="w-100">
                      <div class="meal-layer position-absolute w-100 h-100 p-2 d-flex align-items-center text-black">
                          <h3>${data[i].strMeal}</h3>
                      </div>
                  </div>
                </div>`
  }
  // console.log(cartona);
  $("#rowData").html(cartona);
  $("#rowData").css({"display" : "flex"});
}



function display(data){

  let cartona = '';

 
  if(data == null){
    $("#rowData").html(cartona);  
    return 0;
  }

  for (let i = 0; i< data.length; i++) {
    if(i<20){
      cartona += `<div class="col-md-3">
                  <div onclick="mainDetails(${data[i].idMeal})" class="meal position-relative rounded-2 overflow-hidden">
                      <img src="${data[i].strMealThumb}" class="w-100">
                      <div class="meal-layer position-absolute w-100 h-100 p-2 d-flex align-items-center text-black">
                          <h3>${data[i].strMeal}</h3>
                      </div>
                  </div>
                </div>`
  }
  else{
    break;
  }
  // console.log(cartona);
}
  $("#rowData").html(cartona);
  $("#rowData").css({"display" : "flex"});
}



// ^ ==================================================================  ^ //

//&                    Start Contact                 &//

$("#Contact").click(function(){
  closeSideBar();
  $("#searchContainer").css({"display" : "none"});
  $("#mainData").css({"display" : "none"})
  $(".contact").css({"display" : "flex"});
})


$("#nameInput").keyup(function(e){
  let nameValue = e.target.value;
  // console.log(nameValue);
  validateName(nameValue);
})

function validateName(nameValue){
  let regex = /^([a-zA-Z ]+)$/gi;

  if(regex.test(nameValue) == true){
    $(".nameAlert").css({"display" : "none"});
    return true;
  }
  else{
    $(".nameAlert").css({"display" : "block"});
    return false;
  }
}


$("#emailInput").keyup(function(e){
  let emailValue = e.target.value;
  // console.log(emailValue);
  validateEmail(emailValue)
})

function validateEmail(emailValue){
  let regex = /^([a-z]+[0-9]*\.*[a-z]*[0-9]*@[a-z]+\.[a-z]{2,})$/gi;

  if (regex.test(emailValue)) {
    $(".emailAlert").css({"display" : "none"});
    return true;
  } else {
    $(".emailAlert").css({"display" : "block"});
    return false;
  }
}



$("#phoneInput").keyup(function(e){
  let phoneValue = e.target.value;
  phoneValidate(phoneValue);
})

function phoneValidate(phoneValue){
  let regex = /^((\+\d{1,3})?\s?\d{11})$/g;

  if (regex.test(phoneValue)) {
    $(".phoneAlert").css({"display" : "none"});
    return true;
  } else {
    $(".phoneAlert").css({"display" : "block"});
    return false;
  }

}


$("#ageInput").keyup(function(e){
  let ageValue = e.target.value;
  ageValidate(ageValue)
})


function ageValidate(ageValue){
  let regex = /^([1-9]\d{0,2})$/g;

  if (regex.test(ageValue)) {
    $(".ageAlert").css({"display" : "none"});
    return true;
  } else {
    $(".ageAlert").css({"display" : "block"});
    return false;
  }

}




let passwordValue = '';
$("#passwordInput").keyup(function(e){
  passwordValue = e.target.value;
  passwordValidate(passwordValue);
})


function passwordValidate(passwordValue){
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;

  if (regex.test(passwordValue)) {
    $(".passwordAlert").css({"display" : "none"});
    return true;
  } else {
    $(".passwordAlert").css({"display" : "block"});
    return false;
  }
}




$("#rePasswordInput").keyup(function(e){
  let rePasswordValue = e.target.value;
  rePasswordValidate(rePasswordValue);
})

function rePasswordValidate(rePasswordValue){

  if (rePasswordValue == passwordValue) {
    $(".rePasswordAlert").css({"display" : "none"});
    return true;
  } else {
    $(".rePasswordAlert").css({"display" : "block"});
    return false;
  }
}

function submitBtn(){
  if(validateName($("#nameInput").val()) && validateEmail($("#emailInput").val())
   && phoneValidate($("#phoneInput").val()) && ageValidate($("#ageInput").val()) 
  && passwordValidate($("#passwordInput").val())
   && rePasswordValidate($("#rePasswordInput").val())){
    // console.log("done");
    $(".contact button").attr("disabled",false);
  }
  else{
    // console.log("no");
    $(".contact button").attr("disabled",true);
  }
}

function check(){
  if($("#nameInput").val()!="" && $("#emailInput").val() != ""
   && $("#phoneInput").val() != "" && $("#ageInput").val() != ""
   && $("#passwordInput").val() != "" && $("#rePasswordInput").val()){
    return true;
  }
}

$(".contact input").keyup(function(){
  if(check()){
    submitBtn();
  }
})

$(".contact button").click(function(){
  $(".contact button").css({"border" : "none"});
  $(".contact button").css({"box-shadow" : "0 0 0 0.25rem rgba(220,53,69, .5)"});
})
//&                     End Contact                  &//