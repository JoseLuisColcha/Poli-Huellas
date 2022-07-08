const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  REGISTER: "/registro",
  ADOPTIONS: "/adopciones",
  CATS: "/gatos",
  DOGS: "/perros",
  OTHER: "/otros",
  INSTRUCTIONS: "/instrucciones-de-adopcion",
  FORGOT_PASSWORD: "/resetear-contrasenia",
};

const privateRoutes = {
  HOME: "/",
  USERPROFILE: "/perfil-de-usuario",
  ADMIN: "/admin/perfil",
  GIVE_PET: "/dar-en-adopcion",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
