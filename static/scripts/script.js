// Obtener el elemento de la lista
var loginLink = document.getElementById("loginLink");

// Crear el div para la ventana emergente
var modal = document.createElement("div");
modal.className = "modal";
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.zIndex = "1";
modal.style.left = "0";
modal.style.top = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.overflow = "auto";
modal.style.backgroundColor = "rgba(0, 0, 0, 0.4)";

var modalContent = document.createElement("div");
modalContent.className = "modal-content";
modalContent.style.backgroundColor = "#fff";
modalContent.style.margin = "auto";
modalContent.style.padding = "20px";
modalContent.style.borderRadius = "10px";
modalContent.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
modalContent.style.maxWidth = "400px";
modalContent.style.width = "90%";
modalContent.style.textAlign = "center";
modalContent.style.position = "absolute";
modalContent.style.top = "50%";
modalContent.style.left = "50%";
modalContent.style.transform = "translate(-50%, -50%)";

modal.appendChild(modalContent);
document.body.appendChild(modal);

// Función para mostrar el formulario de inicio de sesión
function showLoginForm() {
  modalContent.innerHTML = `
    <span class="close" style="color: #aaa; float: right; font-size: 24px; font-weight: bold; cursor: pointer;">&times;</span>
    <h2 style="margin-bottom: 20px; font-size: 1.5rem; color: #333;">Iniciar sesión</h2>
    <form id="loginForm">
      <label for="username" style="margin-bottom: 10px; font-weight: bold; color: #555;">Usuario:</label>
      <input type="text" id="username" name="username" style="padding: 10px; margin-bottom: 15px; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px;">
      <br>
      <label for="password" style="margin-bottom: 10px; font-weight: bold; color: #555;">Contraseña:</label>
      <input type="password" id="password" name="password" style="padding: 10px; margin-bottom: 15px; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px;">
      <br>
      <button type="submit" style="background-color: #007bff; color: #fff; border: none; padding: 10px; cursor: pointer; width: 100%;">Iniciar sesión</button>
    </form>
    <p style="margin-top: 15px; font-size: 0.9rem;">¿Todavía no tienes cuenta? <a href="#" id="registerLink" style="color: #007bff;">Haz click aquí</a></p>
  `;

  var closeBtn = modalContent.querySelector(".close");
  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  var registerLink = modalContent.querySelector("#registerLink");
  registerLink.onclick = function(event) {
    event.preventDefault();
    showRegisterForm();
  };

  var loginForm = document.getElementById("loginForm");
  loginForm.onsubmit = function(event) {
    event.preventDefault(); // Asegurarse de que el formulario no se envíe de manera tradicional
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log('Intentando iniciar sesión con:', { username, password });

    fetch('http://127.0.0.1:8001/api/v1/login/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Datos recibidos del servidor:', data);
      if (data.access_token) {
        alert('Inicio de sesión exitoso');
        modal.style.display = "none";
        handleLoginSuccess(username);
      } else {
        alert('Error en el inicio de sesión: ' + data.detail);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
}

// Función para mostrar el formulario de registro
function showRegisterForm() {
  modalContent.innerHTML = `
    <span class="close" style="color: #aaa; float: right; font-size: 24px; font-weight: bold; cursor: pointer;">&times;</span>
    <h2 style="margin-bottom: 20px; font-size: 1.5rem; color: #333;">Registrarse</h2>
    <form id="registerForm">
      <label for="newUsername" style="margin-bottom: 10px; font-weight: bold; color: #555;">Usuario:</label>
      <input type="text" id="newUsername" name="newUsername" style="padding: 10px; margin-bottom: 15px; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px;">
      <br>
      <label for="newPassword" style="margin-bottom: 10px; font-weight: bold; color: #555;">Contraseña:</label>
      <input type="password" id="newPassword" name="newPassword" style="padding: 10px; margin-bottom: 15px; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px;">
      <br>
      <button type="submit" style="background-color: #007bff; color: #fff; border: none; padding: 10px; cursor: pointer; width: 100%;">Registrarse</button>
    </form>
    <p style="margin-top: 15px; font-size: 0.9rem;">¿Ya tienes cuenta? <a href="#" id="loginLinkInRegister" style="color: #007bff;">Inicia sesión aquí</a></p>
  `;

  var closeBtn = modalContent.querySelector(".close");
  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  var loginLinkInRegister = modalContent.querySelector("#loginLinkInRegister");
  loginLinkInRegister.onclick = function(event) {
    event.preventDefault();
    showLoginForm();
  };

  var registerForm = document.getElementById("registerForm");
  registerForm.onsubmit = function(event) {
    event.preventDefault(); // Asegurarse de que el formulario no se envíe de manera tradicional
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;

    console.log('Intentando registrar con:', { newUsername, newPassword });

    fetch('http://127.0.0.1:8001/api/v1/login/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername, password: newPassword }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Datos recibidos del servidor:', data);
      if (data.success) {
        alert('Registro exitoso');
        showLoginForm();
      } else {
        alert('Error en el registro: ' + data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
}

// Función para manejar el éxito del inicio de sesión
function handleLoginSuccess(username) {
  var nav = document.querySelector("nav ul");
  
  // Eliminar el enlace de iniciar sesión
  var loginLink = document.getElementById("loginLink");
  if (loginLink) {
    loginLink.parentNode.removeChild(loginLink);
  }
  
  // Crear el elemento de saludo
  var greetingItem = document.createElement("li");
  greetingItem.id = "greeting";
  greetingItem.textContent = `Hola, ${username}`;
  nav.appendChild(greetingItem);
  
  // Crear el enlace de cerrar sesión
  var logoutItem = document.createElement("li");
  var logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.textContent = "Cerrar sesión";
  logoutLink.onclick = function(event) {
    event.preventDefault();
    handleLogout();
  };
  logoutItem.appendChild(logoutLink);
  nav.appendChild(logoutItem);
}

// Función para manejar el cierre de sesión
function handleLogout() {
  var nav = document.querySelector("nav ul");
  
  // Eliminar el saludo y el enlace de cerrar sesión
  var greetingItem = document.getElementById("greeting");
  if (greetingItem) {
    nav.removeChild(greetingItem);
  }
  var logoutItem = nav.querySelector("li a[href='#']").parentNode;
  if (logoutItem) {
    nav.removeChild(logoutItem);
  }
  
  // Restaurar el enlace de iniciar sesión
  var loginItem = document.createElement("li");
  var loginLink = document.createElement("a");
  loginLink.href = "#";
  loginLink.id = "loginLink";
  loginLink.textContent = "Iniciar sesión";
  loginLink.onclick = function(event) {
    event.preventDefault();
    createModal();
  };
  loginItem.appendChild(loginLink);
  nav.appendChild(loginItem);
}

// Asignar la función createModal al evento clic del enlace
loginLink.onclick = function(event) {
  event.preventDefault();
  createModal();
};

// Inicialmente mostrar el formulario de inicio de sesión
function createModal() {
  showLoginForm();
  modal.style.display = "block";
}
