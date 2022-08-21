import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "@/styles/postsTable.module.css";
import TableRowPosts from "@/components/TableRowPosts";

export default function PostsTable(props) {
  const { posts } = props;

  return (
    <TableContainer component={Paper} sx={{ mt: "1.5rem" }}>
      <Table sx={{ minWidth: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.head_table}>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">Sexo</TableCell>
            <TableCell align="center">Tamaño</TableCell>
            <TableCell align="center">Fecha de creación</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts?.map((post, index) => (
            <TableRowPosts key={index} post={post} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
