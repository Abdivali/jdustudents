import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Students() {
    const [students, setStudents] = useState([])
    const navigate = useNavigate();

    const description = (id) => {
        navigate("/description", {state: {id: id}})
    }

    useEffect(() => {
        axios.get("https://jdustudents.vercel.app/")
        .then(student=> {
            const attendences = student.data;
            // console.log(attendences)
                const obj = {}
                for (let i = 0; i < attendences.length; i++) {
                    const attendence = attendences[i];
                    if (!obj[attendence.id]) {
                        obj[attendence.id] = {
                            id: attendence.id,
                            name: attendence.name,
                            absence: Number(attendence.absence),
                            late: Number(attendence.late),
                            lessonCount: Number(attendence.lessonCount),
                            unexcused: Number(attendence.unexcused),
                        }
                    } else {
                        obj[attendence.id].absence += Number(attendence.absence)
                        obj[attendence.id].late += Number(attendence.late)
                        obj[attendence.id].lessonCount += Number(attendence.lessonCount)
                        obj[attendence.id].unexcused += Number(attendence.unexcused)
                    }
                }
                // console.log(obj)
                setStudents(prev => Array.from(Object.values(obj)))
                
        })
        .catch(err=> console.log(err))
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nomer</TableCell>
                        <TableCell>TALABA (ID)</TableCell>
                        <TableCell>TALABA (F.I.SH)</TableCell>
                        <TableCell align="right">DARSLARDA QATNASHISH</TableCell>
                        <TableCell align="right">KECHIKISHLAR</TableCell>
                        <TableCell align="right">SABABLI</TableCell>
                        <TableCell align="right">SABABSIZ</TableCell>
                        <TableCell align="right">Batafsil</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student,index) => (
                        <TableRow
                            key={student.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >   
                        <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {student.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {student.name}
                            </TableCell>
                            <TableCell align="right">{student.lessonCount-(student.unexcused+student.absence)}</TableCell>
                            <TableCell align="right">{student.late}</TableCell>
                            <TableCell align="right">{student.absence}</TableCell>
                            <TableCell align="right">{student.unexcused}</TableCell>
                            <TableCell onClick={() => description(student.id)} >
                           Batafsil
                            </TableCell>

                        </TableRow>
                    ) )}
                </TableBody>
            </Table>
            {
                students.length === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                )
            }
        </TableContainer>
    );
}