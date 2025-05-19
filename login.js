const form = document.getElementById("formLogin");
const mensajeError = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  mensajeError.classList.add("hidden");
  mensajeError.textContent = "";

  const username = document.getElementById("usuario").value.trim();
  const password = document.getElementById("clave").value.trim();

  if (!username || !password) {
    mensajeError.textContent = "Por favor, completa ambos campos.";
    mensajeError.classList.remove("hidden");
    return;
  }

  try {
    const respuesta = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!respuesta.ok) {
      throw new Error("Usuario o contraseña incorrectos.");
    }

    const data = await respuesta.json();

    // Guardar el token y otros datos en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("logueado", "true");
    localStorage.setItem("usuario", username);

    // Redirigir a la página principal
    window.location.href = "index.html";
  } catch (error) {
    mensajeError.textContent = error.message;
    mensajeError.classList.remove("hidden");
  }
});

