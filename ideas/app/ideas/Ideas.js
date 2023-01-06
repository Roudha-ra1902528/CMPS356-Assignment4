'use client';

import { Card, Stack, CardActions, Typography, CardContent, IconButton } from '@mui/material'
import { useQueryClient, useMutation } from "react-query";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from "../../stores/store";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Ideas({ list, status }) {
    const user = useStore(state => state.user)

    const queryClient = useQueryClient();
    const ideasMutation = useMutation((ideaId) => {
        return axios.delete(`http://localhost:5000/api/${user}/ideas?ideaId=${ideaId}`)
    }, {
        onSuccess: () => {
            queryClient.refetchQueries('ideas')
        },
    })

    return (
        <Stack spacing={2} sx={{ width: '100%' }} direction={'column-reverse'}>
            {status == 'loading' ? <CircularProgress size={100} sx={{marginLeft: "45%", marginTop:"20%"}}/> :
                list?.map((user, i) =>
                    <Card variant="outlined" key={i}>
                        <CardContent>
                            <Typography sx={{ fontSize: 23 }} color="text.primary" gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {user.desc || "-"}
                            </Typography>
                            <Typography sx={{ fontSize: 10, fontStyle: "italic", marginTop: '10px' }} color="text.secondary" gutterBottom>
                                {user.date}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton
                                sx={{ marginLeft: "12px" }}
                                edge="end"
                                aria-label="delete"
                                onClick={() => ideasMutation.mutate(user.ideaId)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                )}
        </Stack>)
}