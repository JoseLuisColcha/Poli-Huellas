const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  REGISTER: "/registro",
  ADOPTIONS: "/adopciones",
  CATS: "/gatos",
  DOGS: "/perros",
  OTHER: "/otros",
  INSTRUCTIONS: "/instrucciones-de-adopcion",
  FORGOT_PASSWORD: "/contrasenia-olvidada",
};

const privateRoutes = {
  HOME: "/",
  USERPROFILE: "/perfil-de-usuario",
  ADMIN_USERS: "/admin/usuarios",
  GIVE_PET: "/dar-en-adopcion",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
