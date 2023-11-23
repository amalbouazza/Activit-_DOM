
function AjouterPays() {
    let pays = document.getElementById("C5").value;
    let listePays = document.getElementById("lepays");
    for (let i = 0; i < listePays.options.length; i++) {
        if (listePays.options[i].value === pays) {
            return;
        }
    }

    let option = document.createElement("option");
    option.value = pays;
    option.text = pays;
    listePays.appendChild(option);
}

function VerifierFormulaire() {
    var nom = document.getElementById("C1").value;
    if (nom.length < 8 || nom.length > 20) {
        document.getElementById("C1").style.color = "red";
        document.getElementById("T2").innerHTML = "Le nom doit contenir entre 8 et 20 caractères.";
        return false;
    } else {
        document.getElementById("C1").style.color = "black";
        document.getElementById("T2").innerHTML = "";
    }

    var adresse = document.getElementById("C2").value;
    if (adresse.length < 20) {
        document.getElementById("C2").style.color = "red";
        document.getElementById("T3").innerHTML = "L'adresse doit contenir au moins 20 caractères.";
        return false;
    } else {
        document.getElementById("C2").style.color = "black";
        document.getElementById("T3").innerHTML = "";
    }

    var no_postal = document.getElementById("C3").value;
    if (no_postal != "3000" && no_postal != "4000") {
        document.getElementById("C3").style.color = "red";
        document.getElementById("T4").innerHTML = "Le code postal doit être 3000 ou 4000.";
        return false;
    } else {
        document.getElementById("C3").style.color = "black";
        document.getElementById("T4").innerHTML = "";
        if (no_postal == "3000") {
            document.getElementById("C4").value = "ville1";
        } else if (no_postal == "4000") {
            document.getElementById("C4").value = "ville2";
        }
    }

    return true;
}

function AfficherAlert() {
    var civilite = getCivilite();
    var nom = document.getElementById("C1").value;
    var adresse = document.getElementById("C2").value;
    var no_postal = document.getElementById("C3").value;
    var localite = document.getElementById("C4").value;
    var pays = document.getElementById("lepays").value;

    if (civilite != "" && nom != "" && adresse != "" && no_postal != "" && localite != "" && pays != "") {
        var plateformes = getPlateformes();
        var applications = getApplications();
        alert("Civilite : " + civilite + "\nNom : " + nom + "\nAdresse : " + adresse + "\nNo postal : " + no_postal + "\nLocalité : " + localite + "\nPays : " + pays + "\nPlateformes : " + plateformes + "\nApplications : " + applications);
    } else {
        alert("Veuillez corriger les erreurs suivantes :\n- Le nom est obligatoire.\n- L'adresse est obligatoire.\n- Le numéro postal est obligatoire.\n- La localité est obligatoire.\n- Le pays est obligatoire.");
    }
}

function Enregistrer() {
    let estValide = VerifierFormulaire();
    if (estValide) {
        let donnees = {
            civilite: getCivilite(),
            nomPrenoms: document.getElementById("C1").value,
            adresse: document.getElementById("C2").value,
            numeroPostal: document.getElementById("C3").value,
            localite: document.getElementById("C4").value,
            pays: document.getElementById("lepays").value,
            plateformes: getPlateformes(),
            applications: getApplications(),
        };

        localStorage.setItem("donnees", JSON.stringify(donnees));
        alert("Les données ont été enregistrées avec succès.");
    }
}

function Recuperer() {
    let donnees = localStorage.getItem("donnees");

    if (donnees) {
        donnees = JSON.parse(donnees);

        document.getElementById("C1").value = donnees.nomPrenoms;
        document.getElementById("C2").value = donnees.adresse;
        document.getElementById("C3").value = donnees.numeroPostal;
        document.getElementById("C4").value = donnees.localite;
        document.getElementById("lepays").value = donnees.pays;

        let civilite = donnees.civilite;
        for (let i = 0; i < civilite.length; i++) {
            const civilites = civilite[i];
            const civiliteRadioButton = document.querySelector('input[type="radio"][name="civilite"][value="' + civilites + '"]');
            if (civiliteRadioButton) {
                civiliteRadioButton.checked = true;
            }
        }

        let plateformes = donnees.plateformes;
        for (let i = 0; i < plateformes.length; i++) {
            const plateforme = plateformes[i];
            const plateformeRadioButton = document.querySelector('input[type="checkbox"][name="materiel"][value="' + plateforme + '"]');
            if (plateformeRadioButton) {
                plateformeRadioButton.checked = true;
            }
        }

        let applications = donnees.applications;
        for (let i = 0; i < applications.length; i++) {
            const application = applications[i];
            const applicationOption = document.querySelector('select[name="applications"] option[value="' + application + '"]');
            if (applicationOption) {
                applicationOption.selected = true;
            }
        }
    } else {
        alert("Aucune donnée enregistrée.");
    }

    
}

function getPlateformes() {
    const plateformesCheckboxes = document.querySelectorAll('input[type="checkbox"][name="materiel"]:checked');
    return Array.from(plateformesCheckboxes).map(checkbox => checkbox.value);
}

function getApplications() {
    const applicationsSelect = document.querySelector('select[name="applications"]');
    return Array.from(applicationsSelect.selectedOptions).map(option => option.value);

    
}

function getCivilite(){
    const civikiteRadio = document.querySelectorAll('input[type="radio"][name="civilite"]:checked');
    return Array.from(civikiteRadio).map(checkbox => checkbox.value);

}
