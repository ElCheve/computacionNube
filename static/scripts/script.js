document.addEventListener('DOMContentLoaded', function() {
  var loginModal    = document.getElementById('loginModal');
  var registerModal = document.getElementById('registerModal');
  var toastContainer = document.getElementById('toast-container');
  var loginLink   = document.getElementById('loginLink');
  var userMenu    = document.getElementById('userMenu');
  var usernameDisplay = document.getElementById('usernameDisplay');
  var logoutLink = document.getElementById('logoutLink');

  function toggleModalVisibility(modal, isVisible) {
      modal.style.display = isVisible ? 'flex' : 'none';
  }

  function closeModal() {
      toggleModalVisibility(loginModal, false);
      toggleModalVisibility(registerModal, false);
      resetForms();
  }

  function showLoginModal() {
      toggleModalVisibility(loginModal, true);
      toggleModalVisibility(registerModal, false);
      resetForms();
  }

  function showRegisterModal() {
      toggleModalVisibility(loginModal, false);
      toggleModalVisibility(registerModal, true);
      resetForms();
  }

  function resetForms() {
      document.getElementById('loginForm').reset();
      document.getElementById('registerForm').reset();
  }

  function addEventListeners() {
      loginLink.addEventListener('click', function(event) {
          event.preventDefault();
          showLoginModal();
      });

      var closeButtons = document.querySelectorAll('.modal_close');
      closeButtons.forEach(function(element) {
          element.addEventListener('click', function(event) {
              event.preventDefault();
              closeModal();
          });
      });

      document.getElementById('showRegister').addEventListener('click', function(event) {
          event.preventDefault();
          showRegisterModal();
      });

      document.getElementById('showLogin').addEventListener('click', function(event) {
          event.preventDefault();
          showLoginModal();
      });

      document.getElementById('loginForm').addEventListener('submit', function(event) {
          event.preventDefault();
          handleLogin();
      });

      document.getElementById('registerForm').addEventListener('submit', function(event) {
          event.preventDefault();
          handleRegister();
      });

      logoutLink.addEventListener('click', function(event) {
          event.preventDefault();
          handleLogout();
      });
  }

  function createToast(message, type) {
      var toast = document.createElement('div');
      toast.className = 'toast ' + type;
      toast.innerHTML = '<span class="toast-icon">' + (type === 'success' ? '&#x2714;' : '&#x26A0;') + '</span>' + message;
      toastContainer.appendChild(toast);

      setTimeout(function() {
          toast.style.opacity = '0';
          toast.style.transform = 'translateY(-20px)';
          setTimeout(function() {
              toastContainer.removeChild(toast);
          }, 500);
      }, 3000);
  }

  function handleLogin() {
      var username = document.querySelector('#loginForm .modal_username').value.trim();
      var password = document.querySelector('#loginForm .modal_userpassword').value.trim();

      if (!username || !password) {
          createToast('Por favor, complete todos los campos.', 'error');
          return;
      }

      fetch('http://127.0.0.1:8001/api/v1/login/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username, password: password })
      })
      .then(function(response) {
          return response.json().then(function(data) {
              if (!response.ok) {
                  var error = new Error(data.message || 'Error al iniciar sesión');
                  error.status = response.status;
                  throw error;
              }
              return data;
          });
      })
      .then(function(data) {
          if (data.success) {
              createToast('Inicio de sesión exitoso', 'success');
              closeModal();
              updateUserInterface(username);
          } else {
              createToast('Error al iniciar sesión: ' + data.message, 'error');
          }
      })
      .catch(function(error) {
          handleError(error, 'Error al iniciar sesión');
      });
  }

  function handleRegister() {
      var username = document.querySelector('#registerForm .modal_username').value.trim();
      var password = document.querySelector('#registerForm .modal_userpassword').value.trim();

      if (!username || !password) {
          createToast('Por favor, complete todos los campos.', 'error');
          return;
      }

      fetch('http://127.0.0.1:8001/api/v1/login/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username, password: password })
      })
      .then(function(response) {
          return response.json().then(function(data) {
              if (!response.ok) {
                  var error = new Error(data.message || 'Error al registrarse');
                  error.status = response.status;
                  throw error;
              }
              return data;
          });
      })
      .then(function(data) {
          if (data.success) {
              createToast('Registro exitoso', 'success');
              showLoginModal();
          } else {
              createToast('Error al registrarse: ' + data.message, 'error');
          }
      })
      .catch(function(error) {
          handleError(error, 'Error al registrarse');
      });
  }

  function handleError(error, contextMessage) {
      console.error(contextMessage, error);
      createToast(contextMessage + ': ' + error.message, 'error');
  }

  function updateUserInterface(username) {
      loginLink.style.display = 'none';
      usernameDisplay.textContent = 'Bienvenido, ' + username;
      userMenu.style.display = 'flex';
  }

  function handleLogout() {
      loginLink.style.display = 'block';
      userMenu.style.display = 'none';
      createToast('Has cerrado sesión.', 'success');
  }

  addEventListeners();
});
