//The functions in this file contain the functionality for the 
//Orewa Beach Lodges Booking System such as moving between pages and storing/ getting data from the local storage

//General functions 

//function that allows you to go to the next page
function goToNextPage(startPageID, targetPageID) {
  document.getElementById(startPageID).style.display = "none";
  document.getElementById(targetPageID).style.display = "block";
}

//function that allows you to go back to previous page
function goToPrevious(startPageID, targetPageID) {
  document.getElementById(targetPageID).style.display = "block";
  document.getElementById(startPageID).style.display = "none";
}

// Event Listener functions 
//toggle on and off if a checkbox is checked 
 const parkingYesCheckBox = document.getElementById("parkingYes");
 const parkingNoCheckBox = document.getElementById("parkingNo");
 const cookingYesCheckBox = document.getElementById("cookingYes");
 const cookingNoCheckBox = document.getElementById("cookingNo");
 
// toggle on and off for parking yes and no checkbox
 parkingYesCheckBox.addEventListener('change', () => {
if(parkingYesCheckBox.checked) {
  parkingNoCheckBox.disabled = true;
}
else {
  parkingNoCheckBox.disabled = false; 

}
 });

 parkingNoCheckBox.addEventListener('change', () => {
  if(parkingNoCheckBox.checked) {
    parkingYesCheckBox.disabled = true;
  }
  else {
    parkingYesCheckBox.disabled = false; 
  
  }
  
   });
// toggle on and off for cooking yes and no checkbox 
   cookingYesCheckBox.addEventListener('change', () => {
    if(cookingYesCheckBox.checked) {
      cookingNoCheckBox.disabled = true;
    }
    else {
      cookingNoCheckBox.disabled = false; 
    
    }

   })

   cookingNoCheckBox.addEventListener('change', () => {
    if(cookingNoCheckBox.checked) {
      cookingYesCheckBox.disabled = true;
    }
    else {
      cookingYesCheckBox.disabled = false; 
    
    }
    
     });

//To update the slider value 
let slider = document.getElementById("rateEXP");
let output = document.getElementById("outputValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
  output.innerHTML = this.value;
}


//Page One 
function pgOneNext() {
  // to save to local storage
  let checkIn_Date = document.getElementById("checkIn").value;
  let checkOut_Date = document.getElementById("checkOut").value;
    // we use the interface: localStorage, parameters are key (any word), value
    localStorage.setItem("checkIn_Date", checkIn_Date);
    localStorage.setItem("checkOut_Date", checkOut_Date);

    let checkInString = String(checkIn_Date);
    let checkOutString = String(checkOut_Date);
    let checkIn_converted = new Date(checkInString);
    let checkOut_converted = new Date(checkOutString);
    let todayDate = new Date(); 
    
// checks if the check in and check out dates are valid 
    if(checkInString != "" && checkOutString != ""){
     if(checkOut_converted <= checkIn_converted){
       alert("Invalid check out date. Please re-enter."); 
    }
    else if(checkIn_converted.getTime() >= todayDate.getTime()) {
      goToNextPage("pageOne", "pageTwo");

    }
    else {
      goToNextPage("pageOne", "pageTwo");
    }


  }
  else{
    alert("Please enter a date in all fields"); 
  }
  
  }

// Page Two
  function pgTwoNext() {
    let roomAmountPrem = Number(document.getElementById("roomAmountPrem").value);
    let roomAmountStand = Number(document.getElementById("roomAmountStand").value);
    let ratePrem = document.getElementById("ratePrem").value;
    let rateStand = document.getElementById("rateStand").value;
    let numAdultsPrem = Number(document.getElementById("numAdultsPrem").value);
    let numAdultsStand = Number(document.getElementById("numAdultsStand").value);
    let numChildrenPrem = Number(document.getElementById("numChildrenPrem").value);
    let numChildrenStand =
      Number(document.getElementById("numChildrenStand").value);
    //store the inputs from Page Two controls into local storage
    localStorage.setItem("roomAmountPrem", roomAmountPrem);
    localStorage.setItem("roomAmountStand", roomAmountStand);
    localStorage.setItem("ratePrem", ratePrem);
    localStorage.setItem("rateStand", rateStand);
    localStorage.setItem("numAdultsPrem", numAdultsPrem);
    localStorage.setItem("numAdultsStand", numAdultsStand);
    localStorage.setItem("numChildrenPrem", numChildrenPrem);
    localStorage.setItem("numChildrenStand", numChildrenStand);
    let result = [];

let totalGuestPrem = numAdultsPrem + numChildrenPrem;
let totalGuestStand = numAdultsStand + numChildrenStand; 

    if(roomAmountPrem != 0) {
      if(numAdultsPrem !=0){
        if((roomAmountPrem * 6) >= totalGuestPrem)
        {
          result[0] = 1;
        }
        else {
          result[0] = 0;
        }
      }
      else {
        result[0] = 0; 
      }
    }
    else{
      result[0] = 0; 
      
    }
    
    if(roomAmountStand != 0) {
      if(numAdultsStand != 0){
        if((roomAmountStand * 2) >= totalGuestStand){
          result[1] = 1;
        }
        else {
          result[1] = 0;
        }
      }
      else {
        result[1] = 0;
      }
    }
    else{
      result[1] = 0; 
    }
  
  function checkValidRooms(arrayInput) {
    let validRoom = false; 
    if((arrayInput[0] == 1)&&(arrayInput[1] == 1)){
      validRoom = true;  
    }
      else if((arrayInput[0] == 0 && roomAmountPrem == 0)||(arrayInput[1] == 0 && roomAmountStand == 0))
      {
        if(arrayInput[1] != 0 && roomAmountStand != 0 && numAdultsStand != 0){
          if(roomAmountPrem == 0 && numAdultsPrem == 0){

        validRoom = true;
          }
          else {
            validRoom = false; 
          }
        }
        else if(arrayInput[0] != 0 && roomAmountPrem != 0 && numAdultsPrem != 0) {
          if(roomAmountStand == 0 && numAdultsStand == 0)
          {
          validRoom = true; 
          } 
          else {
            validRoom = false; 
          }
        }
        else {
          validRoom = false; 
        }
       
      }
      else {
        validRoom = false; 
      }
    return validRoom; 
  }

   if(checkValidRooms(result)){
     //go from page two to page three
     goToNextPage("pageTwo", "pageThree");
    }
    else {
      alert("Please enter valid guest and/or room numbers");
    }
  
}

  function pgTwoPrev() {
    let checkIn_Date_stored = localStorage.getItem("checkIn_Date");
    let checkOut_Date_stored = localStorage.getItem("checkOut_Date");
    //go to previous page from page Two
    goToPrevious("pageTwo", "pageOne");
    // get checkInDate and checkOutDate from local storage
    document.getElementById("checkIn").value = checkIn_Date_stored;
    document.getElementById("checkOut").value = checkOut_Date_stored;
  }

  //Page Three
  function pgThreePrev() {
    let roomAmountPrem_stored = localStorage.getItem("roomAmountPrem");
    let roomAmountStand_stored = localStorage.getItem("roomAmountStand");
    let ratePrem_stored = localStorage.getItem("ratePrem");
    let rateStand_stored = localStorage.getItem("rateStand");
    let numAdultsPrem_stored = localStorage.getItem("numAdultsPrem");
    let numAdultsStand_stored = localStorage.getItem("numAdultsStand");
    let numChildrenPrem_stored = localStorage.getItem("numChildrenPrem");
    let numChildrenStand_stored =
     localStorage.getItem("numChildrenStand");
     //go from page three to page two
    goToPrevious("pageThree", "pageTwo");
    document.getElementById("roomAmountPrem").value = roomAmountPrem_stored;
    document.getElementById("roomAmountStand").value = roomAmountStand_stored;
    document.getElementById("ratePrem").value = ratePrem_stored;
    document.getElementById("rateStand").value = rateStand_stored;
    document.getElementById("numAdultsPrem").value = numAdultsPrem_stored;
    document.getElementById("numAdultsStand").value = numAdultsStand_stored;
    document.getElementById("numChildrenPrem").value = numChildrenPrem_stored;
    document.getElementById("numChildrenStand").value = numChildrenStand_stored;

  }

  function pgThreeNext() {
    //set personal Information 
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let dateOfBirth = document.getElementById("DOB").value;
    let streetAddress = document.getElementById("streetAddress").value;
    let suburb = document.getElementById("suburb").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    let eta = document.getElementById("eta").value;
    let purpose = document.getElementById("purpose").value;
    let requiredInfo = [firstName, lastName, dateOfBirth, streetAddress, suburb, city, email];

    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("dateOfBirth", dateOfBirth);
    localStorage.setItem("streetAddress", streetAddress);
    localStorage.setItem("suburb", suburb);
    localStorage.setItem("city", city);
    localStorage.setItem("email", email);
    localStorage.setItem("ETA", eta);
    localStorage.setItem("purpose", purpose);

   //set preferences
   let parkingYes = document.getElementById("parkingYes");
   let parkingNo = document.getElementById("parkingNo");
  
   let cookingYes = document.getElementById("cookingYes");
  
   let cookingNo = document.getElementById("cookingNo");
  
   let equipGoggle = document.getElementById("equipGoggles");
   let equipEScoot = document.getElementById("equipEScoot");
   let equipBike = document.getElementById("equipBike");
   let equipNone = document.getElementById("equipNone");
   let colorChoose = document.getElementById("colorChoose").value; 
   let ratingValue = document.getElementById("outputValue").textContent; 
  
  
  let parking = {yes: 0, no: 0};
  let cooking = {yes: 0, no: 0};
  let equipmentBook = {goggle: 0, escooter: 0, bike: 0, none: 0};

  parking["yes"] = (parkingYes.checked) ? 1: 0;
  parking["no"] = (parkingNo.checked) ? 1: 0; 
  cooking["yes"] = (cookingYes.checked) ? 1: 0;
  cooking["no"] = (cookingNo.checked) ? 1:0;

  equipmentBook["goggle"] = (equipGoggle.checked) ? 1:0;
  equipmentBook["escooter"] = (equipEScoot.checked) ? 1:0;
  equipmentBook["bike"] = (equipBike.checked) ? 1:0;
  equipmentBook["none"] = (equipNone.checked) ? 1:0;  

  localStorage.setItem("parking", JSON.stringify(parking));
  localStorage.setItem("cooking", JSON.stringify(cooking));
  localStorage.setItem("equipmentBook", JSON.stringify(equipmentBook));
  localStorage.setItem("colorChoose", colorChoose);
  localStorage.setItem("ratingValue", ratingValue); 

  function checkRequired(arrayCheck) {
    let result = false;
    let dateOfBirthCheck = String(dateOfBirth);
  for(let i=0; i < arrayCheck.length; i++) {
    if(arrayCheck[i] != "" && dateOfBirthCheck != ""){
      result = true;
    }
  }
  return result; 
  }

  let checkResult = checkRequired(requiredInfo);
  
  if(checkResult){
      goToNextPage("pageThree", "pageFour");
      let firstName_stored = localStorage.getItem("firstName");
      let lastName_stored = localStorage.getItem("lastName");
      let dateOfBirth_stored = localStorage.getItem("dateOfBirth");
      let streetAddress_stored = localStorage.getItem("streetAddress");
      let suburb_stored = localStorage.getItem("suburb");
      let city_stored = localStorage.getItem("city");
      let email_stored = localStorage.getItem("email");
      let eta_stored = localStorage.getItem("ETA");
      let purpose_stored = localStorage.getItem("purpose");
        

      document.getElementById("firstNameStored").innerHTML = firstName_stored;
      document.getElementById("lastNameStored").innerHTML = lastName_stored;
      document.getElementById("dateOfBirthStored").innerHTML = dateOfBirth_stored;
      document.getElementById("streetAddressStored").innerHTML = streetAddress_stored;
      document.getElementById("suburbStored").innerHTML = suburb_stored;
      document.getElementById("cityStored").innerHTML = city_stored;
      document.getElementById("emailStored").innerHTML = email_stored;
      document.getElementById("etaStored").innerHTML = eta_stored;
      document.getElementById("purposeStored").innerHTML = purpose_stored;

      let parking_stored = localStorage.getItem("parking");
      let cooking_stored = localStorage.getItem("cooking");
      let equipmentBook_stored = localStorage.getItem("equipmentBook");
      let colorChoose_store = localStorage.getItem("colorChoose");
      let ratingValue_stored = localStorage.getItem("ratingValue"); 

      let parkingObj = JSON.parse(parking_stored);
      let cookingObj = JSON.parse(cooking_stored);
      let equipmentObj = JSON.parse(equipmentBook_stored);

      document.getElementById("colorChooseResult").value = colorChoose_store; 
      document.getElementById("colorValue").innerHTML = String(colorChoose_store);
      document.getElementById("ratingStored").innerHTML = ratingValue_stored;
      document.getElementById("parkingStored").innerHTML = (parkingObj["yes"] == 1) ? "yes" : "no";
      document.getElementById("cookingStored").innerHTML = (cookingObj["yes"] == 1) ? "yes" : "no";
    
      for(let value in equipmentObj) {
        if(equipmentObj[value] == 1) {
            document.getElementById("equipmentStored").innerHTML = String(value); 
        }
      }
      //get check in summary details
      let checkIn_Date_stored = localStorage.getItem("checkIn_Date");
      let checkOut_Date_stored = localStorage.getItem("checkOut_Date");
        
      // get checkInDate and checkOutDate from local storage
      document.getElementById("checkInDateStored").innerHTML = String(checkIn_Date_stored);
      document.getElementById("checkOutDateStored").innerHTML = String(checkOut_Date_stored);

      // To set two dates to two variables
      let date1 = new Date(String(checkIn_Date_stored));
      let date2 = new Date(String(checkOut_Date_stored));
            
      // To calculate the time difference of two dates
      let Difference_In_Time = date2.getTime() - date1.getTime();
            
      // To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      document.getElementById("totalStay").innerHTML = Difference_In_Days;

      //get room summary details
      let roomAmountPrem_stored = Number(localStorage.getItem("roomAmountPrem"));
      let roomAmountStand_stored = Number(localStorage.getItem("roomAmountStand"));
      let numAdultsPrem_stored = Number(localStorage.getItem("numAdultsPrem"));
      let numAdultsStand_stored = Number(localStorage.getItem("numAdultsStand"));
      let numChildrenPrem_stored = Number(localStorage.getItem("numChildrenPrem"));
      let numChildrenStand_stored =
        Number(localStorage.getItem("numChildrenStand"));

      // populate room type and amount of rooms   
      if(roomAmountPrem_stored > 0 && roomAmountStand_stored == 0) {
      document.getElementById("roomTypePrem").innerHTML = "Premium";
      document.getElementById("amountRmPrem").innerHTML = String(roomAmountPrem_stored); 
      }
      else if(roomAmountStand_stored > 0 && roomAmountPrem_stored == 0) {
      document.getElementById("roomTypePrem").innerHTML = "Standard";
      document.getElementById("amountRmPrem").innerHTML = String(roomAmountStand_stored);
      }
      else if(roomAmountPrem_stored > 0 && roomAmountStand_stored > 0) {
      document.getElementById("roomTypePrem").innerHTML = "Premium & Standard";
      document.getElementById("amountRmPrem").innerHTML = String(roomAmountPrem_stored + roomAmountStand_stored);
      }
      else {
      document.getElementById("roomTypePrem").innerHTML = "none";
      }

      //populate total adults
      if(numAdultsPrem_stored > 0 && numAdultsStand_stored == 0) {
      document.getElementById("amountAdultsPrem").innerHTML = String(numAdultsPrem_stored);
      }
      else if( numAdultsStand_stored > 0 && numAdultsPrem_stored == 0) {
      document.getElementById("amountAdultsPrem").innerHTML = String(numAdultsStand_stored);

      }
      else if(numAdultsPrem_stored > 0 && numAdultsStand_stored > 0) {
      document.getElementById("amountAdultsPrem").innerHTML = "Premium: " + String(numAdultsPrem_stored) + " & " + "Standard: " + String(numAdultsStand_stored);
      }
      else{
      document.getElementById("amountAdultsPrem").innerHTML = "none";
      }

      //populate total children
      if(numChildrenPrem_stored > 0 && numChildrenStand_stored == 0) {
      document.getElementById("amountChildPrem").innerHTML = String(numChildrenPrem_stored);
      }
      else if(numChildrenStand_stored > 0 && numChildrenPrem_stored == 0) {
      document.getElementById("amountChildPrem").innerHTML = String(numChildrenStand_stored);
      }
      else if(numChildrenPrem_stored > 0 && numChildrenStand_stored > 0) {
      document.getElementById("amountChildPrem").innerHTML = "Premium: " + String(numChildrenPrem_stored) + " & " + "Standard: " + String(numChildrenStand_stored);
      }
      else{
          document.getElementById("amountChildPrem").innerHTML = "none"; 
        }

        //populate total guests
        document.getElementById("guestTotalPrem").innerHTML = String(numAdultsPrem_stored + numAdultsStand_stored + numChildrenPrem_stored + numChildrenStand_stored);

        //populate total cost of stay
        let totalCostStay = (roomAmountPrem_stored * 220) + (roomAmountStand_stored * 180);
        document.getElementById("totalCost").innerHTML = "$" + parseFloat(String(totalCostStay)).toFixed(2); 

    }
    else{
        alert("Please fill in all personal information");
    }

}


//Page Four 

function pgFourPrev() {
 
  let firstName_stored = localStorage.getItem("firstName");
  let lastName_stored = localStorage.getItem("lastName");
  let dateOfBirth_stored = localStorage.getItem("dateOfBirth");
  let streetAddress_stored = localStorage.getItem("streetAddress");
  let suburb_stored = localStorage.getItem("suburb");
  let city_stored = localStorage.getItem("city");
  let email_stored = localStorage.getItem("email");
  let eta_stored = localStorage.getItem("ETA");
  let purpose_stored = localStorage.getItem("purpose");
    
  document.getElementById("firstName").value = firstName_stored;
  document.getElementById("lastName").value = lastName_stored;
  document.getElementById("DOB").value = dateOfBirth_stored;
  document.getElementById("streetAddress").value = streetAddress_stored;
  document.getElementById("suburb").value = suburb_stored;
  document.getElementById("city").value = city_stored;
  document.getElementById("email").value = email_stored;
  document.getElementById("eta").value = eta_stored;
  document.getElementById("purpose").value = purpose_stored;
  
  let parking_stored = localStorage.getItem("parking");
  let cooking_stored = localStorage.getItem("cooking");
  let equipmentBook_stored = localStorage.getItem("equipmentBook");
  let colorChoose_store = localStorage.getItem("colorChoose");
  let ratingValue_stored = localStorage.getItem("ratingValue"); 

// re-check parking checkboxes
let parkingObj = JSON.parse(parking_stored);

document.getElementById("parkingYes").checked = (parkingObj["yes"] == 1) ? true: false; 
document.getElementById("parkingNo").checked =  (parkingObj["no"] == 1) ? true: false; 

//re-check cooking checkboxes
let cookingObj = JSON.parse(cooking_stored);
document.getElementById("cookingYes").checked = (cookingObj["yes"] == 1) ? true: false; 
document.getElementById("cookingNo").checked =  (cookingObj["no"] == 1) ? true: false; 

//re-check equipment radio boxes
let equipmentObj = JSON.parse(equipmentBook_stored);
document.getElementById("equipGoggles").checked = (equipmentObj["goggle"] == 1) ? true:false; 
document.getElementById("equipEScoot").checked =  (equipmentObj["escooter"] == 1) ? true: false; 
document.getElementById("equipBike").checked  =  (equipmentObj["bike"] == 1) ? true: false; 
document.getElementById("equipNone").checked = (equipmentObj["none"] == 1) ? true: false; 

//set back color value from store
document.getElementById("colorChoose").value = colorChoose_store; 

//set back rating value from store
document.getElementById("outputValue").value = ratingValue_stored; 
  

goToPrevious("pageFour", "pageThree"); 
  
}

function pgFourNext() {
  document.getElementById("pageFour").style.display = "none";
  document.getElementById("pageFive").style.display = "block";
}

// Page Five

function pgFiveFinish() {
  sessionStorage.clear();
  localStorage.clear(); 
  document.getElementById("formOne").reset();
  document.getElementById("formTwo").reset();
  document.getElementById("formThree").reset();
  document.getElementById("formFour").reset();
  goToNextPage("pageFive", "pageOne");
}

