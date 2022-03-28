function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements: Récupération des élèments de DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const form = document.getElementById('form');

const formData = document.getElementById("form-model");
const modalSubmit = document.getElementById('confirmation-model');
const closeConfirmation = document.getElementById('close-btn-confirmation');
const closeConfirmationSpan = document.getElementById('close-btn-confirmation-span');

const birthdate = document.getElementById("birthdate");
const nom = document.getElementById("last");
const prenom = document.getElementById("first");
const email = document.getElementById("email");
const quantity = document.getElementById("quantity");
const condition = document.getElementById("conditionDUtilisation");

// Patern de validation
const patternName = new RegExp("^[a-zA-Z\s]{2,}$");
const patternMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

// Ouvrire la modal, en ajoutant un évènement à ModalBtn
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// fonction ouvrire le model
function launchModal() {
  modalbg.style.display = "block";
}

// fermer le model close Model
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
})

// Fonction de vrification de la date de naissance
function verifyBirth(){
  if (birthdate.value.trim().length !== 10 || (new Date(birthdate.value.trim()) > new Date())) {
    birthdate.parentElement.setAttribute('data-error-visible', 'true');
    birthdate.classList.add("err_input");
    birthdate.classList.remove("success_input");
    return false;
  }
  birthdate.parentElement.setAttribute('data-error-visible', 'false');
  birthdate.classList.add("success_input");
  birthdate.classList.remove("err_input");
  return true;
}


// Fonction de vrification du nom
function verifyNom(){
  if (patternName.test(nom.value)) {
    nom.parentElement.setAttribute('data-error-visible', 'false');
    nom.classList.add("success_input");
    nom.classList.remove("err_input");
    return true;
  }
  nom.parentElement.setAttribute('data-error-visible', 'true');
  nom.classList.add("err_input");
  nom.classList.remove("success_input");
  return false;
}


// Fonction de vrification du prénom
function verifyPrenom(){
  if (patternName.test(prenom.value)) {
    prenom.parentElement.setAttribute('data-error-visible', 'false');
    prenom.classList.add("success_input");
    prenom.classList.remove("err_input");
    return true;
  }
  prenom.parentElement.setAttribute('data-error-visible', 'true');
  prenom.classList.add("err_input");
  prenom.classList.remove("success_input");
  return false;
}


// Fonction de vrification d'email
function verifyEmail(){
  if (patternMail.test(email.value)) {
    email.parentElement.setAttribute('data-error-visible', 'false');
    email.classList.add("success_input");
    email.classList.remove("err_input");
    return true;
  }
  email.parentElement.setAttribute('data-error-visible', 'true');
  email.classList.add("err_input");
  email.classList.remove("success_input");
  return false;
}


// Fonction de vrification du quantity
function verifyQuantity(){
  if (quantity.value.trim().length === 0 || isNaN(quantity.value.trim()) === true || parseInt(quantity.value) < 0) {
    quantity.parentElement.setAttribute('data-error-visible', 'true');
    quantity.classList.add("err_input");
    quantity.classList.remove("success_input");
    return false;
  }
  quantity.parentElement.setAttribute('data-error-visible', 'false');
  quantity.classList.add("success_input");
  quantity.classList.remove("err_input");
  return true;
}

// Fonction de vrification du tournoi
function verifyTournoi(){
  const allLocations = document.getElementById('locations');
  const locations = document.querySelectorAll('#locations .checkbox-input');
  allLocations.setAttribute('data-error-visible', 'true');
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      allLocations.setAttribute('data-error-visible', 'false');
      return true;
    }
  }
  return false;
}


// Fonction de vrification des conditions d'utilisation
function verifyConditionUtilisation() {
  if (condition.checked) {
    condition.parentElement.setAttribute('data-error-visible', 'false');
    condition.classList.add("success_input");
    condition.classList.remove("err_input");
    return true;
  }
  condition.parentElement.setAttribute('data-error-visible', 'true');
  condition.classList.add("err_input");
  condition.classList.remove("success_input");
  return false;
}

// La fonction qui execute toutes les autres fonctions de validation
function forAllFieldsValidation() {
  verifyPrenom();
  verifyNom();
  verifyBirth();
  verifyEmail();
  verifyQuantity();
  verifyTournoi();
  verifyConditionUtilisation();
}


// la fonctionne qui valide le formulaire
function formValidation() {
  return verifyPrenom() === true &&
      verifyNom() === true &&
      verifyBirth() === true &&
      verifyEmail() === true &&
      verifyQuantity() === true &&
      verifyTournoi() === true &&
      verifyConditionUtilisation() === true;
}

// Permet de supprmier les classe CSS dans les champs
function resetFormulaire() {
  document.querySelector('form').reset();
  nom.classList.remove("err_input", "success_input");
  prenom.classList.remove("err_input", "success_input");
  birthdate.classList.remove("err_input", "success_input");
  email.classList.remove("err_input", "success_input");
  quantity.classList.remove("err_input", "success_input");
  condition.classList.remove("err_input", "success_input");
}

// Ajouter un evenement de submit au formulaire, etappliquer les traitement naicessaire
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (formValidation() === true) {
    displayModalSubmit();
    resetFormulaire();
  } else {
    forAllFieldsValidation();
  }
});


// la fonction qui affiche le model de la confirmation d'envoie
function displayModalSubmit() {
  form.style.display = 'none';
  modalSubmit.style.display = 'block';
}

// La fonction qui ferme le modal de la confirmation d'envoie
function closeConfirmationModel() {
  modalSubmit.style.display = 'none';
  formData.style.display = 'none';
  form.style.display = 'block';
}

// Ajouter des evenement au bouton de la fermeture de modal
closeConfirmation.addEventListener('click', closeConfirmationModel);
closeConfirmationSpan.addEventListener('click', closeConfirmationModel);
