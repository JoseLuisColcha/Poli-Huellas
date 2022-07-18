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
} from "@mui/material";
import {Visibility, Delete} from '@mui/icons-material'
import { useRouter } from "next/router";

function Users() {
  const { users, currentUser } = useAuth();
  const router = useRouter()
  return (
    <TableContainer component={Paper} sx={{ mt: '1.5rem' }}>
      <Table sx={{ minWidth: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell align="center">correo</TableCell>
            <TableCell align="right">acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.filter(user => user.uid !== currentUser.uid).map((user) => (
            <TableRow
              key={user.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell sx={{display: 'flex', justifyContent: 'space-around'}}>
                <Visibility sx={{cursor: "pointer"}} color="primary" titleAccess="Ver usuario" onClick={() => router.push(`/perfil-de-usuario/${user.uid}`)}/>
                <Delete sx={{cursor: "pointer"}} color="error" titleAccess="Eliminar"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withAuth(Users);
