export const obtenerTareas = async (req, res) => {
  try {
    const respuesta = await fetch("http://localhost:3030/tasks");
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const agregarTarea = async (req, res) => {
  const info = {
    title: req.title,
    description: req.description,
  };
  console.log("Info a enviar:", info);
  try {
    const peticion = await fetch("http://localhost:3030/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    return peticion.json();
  } catch {
    console.log("Error al enviar la tarea");
  }
};
