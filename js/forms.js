/* ==========================================================================
   VELNORA STUDIO — accessible contact form
   Validates locally. Sends only when a real endpoint is configured.
   ========================================================================== */

(function () {
  "use strict";

  var config = window.VELNORA || {};
  var contact = config.contact || {};
  var brand = config.brand || {};
  var forms = document.querySelectorAll("[data-contact-form]");

  if (!forms.length) return;

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function fieldErrorElement(form, field) {
    return form.querySelector("#" + field.id + "-error");
  }

  function clearError(form, field) {
    var error = fieldErrorElement(form, field);
    var wrapper = field.closest(".field") || field.closest(".checkbox");
    if (wrapper) wrapper.classList.remove("has-error");
    field.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  }

  function setError(form, field, message) {
    var error = fieldErrorElement(form, field);
    var wrapper = field.closest(".field") || field.closest(".checkbox");
    if (wrapper) wrapper.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  }

  function validateField(form, field) {
    var value = String(field.value || "").trim();
    var message = "";

    if (field.name === "name" && value.length < 2) {
      message = "Indiquez votre nom (2 caractères minimum).";
    }

    if (field.name === "email" && !emailPattern.test(value)) {
      message = "Indiquez une adresse email valide.";
    }

    if (field.name === "projectType" && !value) {
      message = "Choisissez un type de projet.";
    }

    if (field.name === "message" && value.length < 20) {
      message = "Décrivez votre projet en quelques mots (20 caractères minimum).";
    }

    if (field.name === "privacy" && !field.checked) {
      message = "Merci d'accepter la politique de confidentialité.";
    }

    if (message) {
      setError(form, field, message);
      return false;
    }

    clearError(form, field);
    return true;
  }

  function validateForm(form) {
    var fields = form.querySelectorAll("[required]");
    var firstInvalid = null;

    fields.forEach(function (field) {
      if (!validateField(form, field) && !firstInvalid) {
        firstInvalid = field;
      }
    });

    return firstInvalid;
  }

  function statusShell(form) {
    return form.querySelector("[data-form-status]");
  }

  function showStatus(form, state, title, body, actions) {
    var status = statusShell(form);
    if (!status) return;

    status.hidden = false;
    status.dataset.state = state;
    status.setAttribute("role", state === "error" ? "alert" : "status");
    status.replaceChildren();

    var heading = document.createElement("h3");
    heading.textContent = title;
    status.appendChild(heading);

    var paragraph = document.createElement("p");
    paragraph.textContent = body;
    status.appendChild(paragraph);

    if (actions && actions.length) {
      var actionsWrap = document.createElement("div");
      actionsWrap.className = "form-status__actions";

      actions.forEach(function (action) {
        var element;

        if (action.href) {
          element = document.createElement("a");
          element.href = action.href;
          element.className = "btn btn--small " + (action.className || "btn--light");
          if (action.external) {
            element.target = "_blank";
            element.rel = "noopener noreferrer";
          }
        } else {
          element = document.createElement("button");
          element.type = "button";
          element.className = "btn btn--small " + (action.className || "btn--outline-light");
        }

        element.textContent = action.label;

        if (action.onClick) {
          element.addEventListener("click", action.onClick);
        }

        actionsWrap.appendChild(element);
      });

      status.appendChild(actionsWrap);
    }

    status.setAttribute("tabindex", "-1");
    status.focus({ preventScroll: true });
    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function buildMessage(data) {
    return [
      "Nouveau projet — " + (brand.full || "VELNORA STUDIO"),
      "",
      "Nom : " + data.name,
      "Email : " + data.email,
      "Entreprise : " + (data.company || "Non renseignée"),
      "Type de projet : " + data.projectType,
      "Budget estimé : " + (data.budget || "À définir"),
      "",
      "Message :",
      data.message,
      "",
      "Page d'origine : " + window.location.href,
      "Date : " + new Date().toISOString()
    ].join("\n");
  }

  function buildWhatsAppMessage(data) {
    return [
      "Bonjour " + (brand.full || "VELNORA STUDIO") + ",",
      "Je suis " + data.name + ".",
      "Type de projet : " + data.projectType,
      "Budget : " + (data.budget || "à définir"),
      "",
      data.message,
      "",
      "Email : " + data.email
    ].join("\n");
  }

  function copyText(text, button) {
    function success() {
      var original = button.textContent;
      button.textContent = "Message copié";
      window.setTimeout(function () {
        button.textContent = original;
      }, 2600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(success).catch(function () {
        fallbackCopy(text, success);
      });
    } else {
      fallbackCopy(text, success);
    }
  }

  function fallbackCopy(text, callback) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      callback();
    } catch (error) {
      callback();
    }

    textarea.remove();
  }

  function fallbackActions(form, data, message) {
    var actions = [];
    var mailtoSubject = encodeURIComponent("Nouveau projet — " + data.name);
    var mailtoBody = encodeURIComponent(message);
    var whatsappText = encodeURIComponent(buildWhatsAppMessage(data));
    var whatsappNumber = String(contact.whatsapp || "").replace(/\D/g, "");
    var whatsappHref = whatsappNumber
      ? "https://wa.me/" + whatsappNumber + "?text=" + whatsappText
      : "https://wa.me/?text=" + whatsappText;

    if (contact.email) {
      actions.push({
        label: "Envoyer par email",
        href: "mailto:" + contact.email + "?subject=" + mailtoSubject + "&body=" + mailtoBody,
        className: "btn--light"
      });
    }

    actions.push({
      label: "Envoyer sur WhatsApp",
      href: whatsappHref,
      className: "btn--outline-light",
      external: true
    });

    actions.push({
      label: "Copier le message",
      className: "btn--outline-light",
      onClick: function (event) {
        copyText(message, event.currentTarget);
      }
    });

    return actions;
  }

  forms.forEach(function (form) {
    var status = statusShell(form);
    var submit = form.querySelector('[type="submit"]');
    var honey = form.querySelector('[name="website"]');
    var submitting = false;

    form.querySelectorAll("[required]").forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(form, field);
      });

      field.addEventListener("input", function () {
        var wrapper = field.closest(".field") || field.closest(".checkbox");
        if (wrapper && wrapper.classList.contains("has-error")) {
          validateField(form, field);
        }
      });

      field.addEventListener("change", function () {
        validateField(form, field);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (submitting) return;

      if (honey && honey.value) {
        form.reset();
        return;
      }

      var firstInvalid = validateForm(form);

      if (firstInvalid) {
        showStatus(
          form,
          "error",
          "Vérifiez les champs indiqués.",
          "Certaines informations sont manquantes ou incomplètes. Votre message n'a pas été envoyé."
        );
        firstInvalid.focus({ preventScroll: false });
        return;
      }

      var formData = new FormData(form);
      var data = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        company: String(formData.get("company") || "").trim(),
        projectType: String(formData.get("projectType") || "").trim(),
        budget: String(formData.get("budget") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        consent: formData.get("privacy") === "on"
      };

      var message = buildMessage(data);

      if (!contact.formEndpoint) {
        showStatus(
          form,
          "ready",
          "Votre message est prêt.",
          "Le formulaire n'est pas encore connecté à un serveur : aucune donnée n'est envoyée automatiquement. Choisissez email ou WhatsApp pour nous transmettre votre demande.",
          fallbackActions(form, data, message)
        );
        return;
      }

      submitting = true;
      if (submit) {
        submit.disabled = true;
        submit.dataset.label = submit.textContent;
        submit.textContent = "Envoi en cours…";
      }

      fetch(contact.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          Object.assign({}, data, {
            source: window.location.href,
            submittedAt: new Date().toISOString()
          })
        )
      })
        .then(function (response) {
          if (!response.ok) throw new Error("HTTP " + response.status);

          form.reset();
          form.querySelectorAll(".has-error").forEach(function (element) {
            element.classList.remove("has-error");
          });
          form.querySelectorAll('[aria-invalid="true"]').forEach(function (field) {
            field.removeAttribute("aria-invalid");
          });

          showStatus(
            form,
            "success",
            "Demande envoyée.",
            "Merci " + data.name + ". Votre message a bien été transmis — nous revenons vers vous personnellement."
          );
        })
        .catch(function () {
          showStatus(
            form,
            "error",
            "L'envoi n'a pas abouti.",
            "Le serveur n'a pas confirmé la réception. Votre message n'a pas été perdu : vous pouvez nous l'envoyer directement par email ou WhatsApp.",
            fallbackActions(form, data, message)
          );
        })
        .finally(function () {
          submitting = false;
          if (submit) {
            submit.disabled = false;
            submit.textContent = submit.dataset.label || "Envoyer la demande";
          }
        });
    });
  });
})();
