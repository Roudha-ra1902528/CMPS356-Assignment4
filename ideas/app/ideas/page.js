'use client';

import axios from "axios"
import { useQuery, useMutation } from "react-query"
import Button from '@mui/material/Button';
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Ideas from "./Ideas";
import AddIdea from "./AddIdea";

export default function page() {
    const setUser = useStore(state => state.setUser)
    const user = useStore(state => state.user)
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        if (user == -1)
            axios.get('http://localhost:5000/api/identifier').then(res => setUser(res.data))
    }, [])

    const query = useQuery(['ideas', user], () => axios.get(`http://localhost:5000/api/${user}/ideas`))

    return (
        <Stack spacing={2} alignItems={'center'}>
            <Button variant="outlined" sx={{width: "50px", display: display ? 'none' : 'block'}} onClick={() => setDisplay(true)}>+</Button>
            <AddIdea  setDisplay={setDisplay} display={display}/>
            <Ideas list={query.data?.data} status={query.isLoading && 'loading'} />
        </Stack>
    )
}