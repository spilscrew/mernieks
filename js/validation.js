var validation = {
    messages: {
        emptyFieldError: "<span class='errorSymbol'>x</span>Lūdzu, aizpildiet visus laukus!",
        emailFormatError: "<span class='errorSymbol'>x</span>Lūdzu, ievadiet derīgu e-pasta adresi!",
        sendSuccess: "<span class='successSymbol'>✓</span>Paldies, vēstule tiek aizsūtīta!"
    },
    currentMessages: [],
    //Fields ID's array
    fields: ["vards","epasts","teksts"],
    checkingFields: {
        emptyFields: function () {
            for (var i in validation.fields) {
                var checkingId = document.getElementById(validation.fields[i]);
                if (!checkingId.value) {
                    validation.currentMessages.push(validation.messages.emptyFieldError);
                    break;
                }
            }
        },
        emailFormat: function () {
            var emailId = document.getElementById("epasts").value;
            var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (regExp.test(emailId) == false) {
                validation.currentMessages.push(validation.messages.emailFormatError);
            }
        },
        success: function () {
            if (validation.currentMessages == "") {
                validation.currentMessages.push(validation.messages.sendSuccess);
                for (var i in validation.fields) {
                    var clearingById = document.getElementById(validation.fields[i]);
                    clearingById.value = "";
                }
            }
        }
    },
    clickSubmit: function () {
        document.querySelector("#feedbackForm").onsubmit = function () {
            validation.currentMessages = [];
            document.querySelector(".validationMessage").innerHTML = "";
            validation.checkingFields.emptyFields();
            validation.checkingFields.emailFormat();
            validation.checkingFields.success();
            validation.showMessage();
            return false;
        }
    },
    showMessage: function () {
        for (var i in this.currentMessages) {
            document.querySelector(".validationMessage").insertAdjacentHTML('afterbegin','<div>'+this.currentMessages[i]+'</div>');
        }
    },
    init: function () {
        validation.clickSubmit();
    }
}
validation.init();