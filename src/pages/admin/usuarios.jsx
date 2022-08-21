import withAuth from "@/hocs/withAuth";
import { useAuth } from "@/lib/auth";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "@/styles/usersTable.module.css";
import { convertDate } from "@/lib/dates";

function Users() {
  const { users, currentUser } = useAuth();
  const router = useRouter();
  return (
    <>
      <Typography className={styles.title_text}>
        Lista de <span className={styles.span_text}>usuarios</span>
      </Typography>
      <TableContainer component={Paper} sx={{ mt: "1.5rem" }}>
        <Table sx={{ minWidth: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow className={styles.head_table}>
              <TableCell>Usuario</TableCell>
              <TableCell align="center">Correo</TableCell>
              <TableCell align="center">Teléfono</TableCell>
              <TableCell align="center">Fecha de registro</TableCell>

              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              ?.filter((user) => user?.uid !== currentUser?.uid)
              .map((user) => (
                <TableRow
                  key={user.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.displayName}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phoneNumber}</TableCell>
                  <TableCell align="center">
                    {convertDate(user.createdAt)}
                  </TableCell>
                  <TableCell
                    sx={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Visibility
                      sx={{ cursor: "pointer" }}
                      color="primary"
                      titleAccess="Ver usuario"
                      onClick={() =>
                        router.push(`/perfil-de-usuario/${user.uid}`)
                      }
                    />
                    <Delete
                      sx={{ cursor: "pointer" }}
                      color="error"
                      titleAccess="Eliminar"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default withAuth(Users);
