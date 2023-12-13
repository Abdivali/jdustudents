import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from 'axios';


function description() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  // console.log(location.state.id);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [students, setStudents] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios.get("http://localhost:3001/getStudents")
        .then(student=> {
          let vars = student.data.filter(user => user.id == location.state.id);
              setStudents(prev => Array.from(Object.values(vars)));
                  })
            .catch(err=>console.log(err))
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>TALABA (F.I.SH)</TableCell>
            <TableCell align="right">FAN NOMI VA GURUHI</TableCell>
            <TableCell align="right">DARSDA QATNASHISH</TableCell>
            <TableCell align="right">KECHIKISHLAR SONI </TableCell>
            <TableCell align="right">SABABLI DARS QOLDIRILISHI </TableCell>
            <TableCell align="right">SABABSIZ DARS QOLDIRILISHI </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) =>
            <TableRow
              key={student.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {" "}{index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell align="right">
                {student.subject}
              </TableCell>
              <TableCell align="right">
                {student.lessonCount-(student.unexcused+student.absence)}
              </TableCell>
              <TableCell align="right">
                {student.late}
              </TableCell>
              <TableCell align="right">
                {student.absence}
              </TableCell>
              <TableCell align="right">
                {student.unexcused}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {students.length === 0 &&
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <CircularProgress />
        </Box>}
    </TableContainer>
  );
}

export default description;
