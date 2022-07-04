const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  REGISTER: "/registro",
  ADOPTIONS: "/adopciones",
  CATS: "/gatos",
  DOGS: "/perros",
  OTHER: "/otros",
  INSTRUCTIONS: "/instrucciones-de-adopcion",
  GIVE_PET: "/dar-en-adopcion",
  FORGOT_PASSWORD: "/resetear-contrasenia",
};

const privateRoutes = {
  HOME: "/",
  USERPROFILE: "/perfil-de-usuario",
  ADMIN: "/admin/perfil",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
