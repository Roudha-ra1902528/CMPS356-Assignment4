import { TextField, Stack, IconButton } from "@mui/material"
import { useQueryClient, useMutation } from "react-query";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useStore } from "../../stores/store";
import { useState } from "react";
import axios from "axios";

export default function AddIdea({ setDisplay, display }) {
    const user = useStore(state => state.user)
    const [idea, setIdea] = useState({ user: '', name: '', desc: '', date: '' })
    const [errors, setErrors] = useState(false)

    function ideaValidation() {
        let flag = false;

        if (idea.name == "") {
            setErrors(true);
            return !flag
        }

        return flag
    }

    const queryClient = useQueryClient();
    const ideasMutation = useMutation((obj) => axios.post(`http://localhost:5000/api/${user}/ideas`, obj)
        , {
            onSuccess: () => {
                queryClient.refetchQueries('ideas')
            },
        })

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        setIdea({ ...idea, [name]: value });
    };

    function mutate() {
        setErrors(false);

        if (ideaValidation()) return;

        ideasMutation.mutate({ user, name: idea.name, desc: idea.desc, date: `${new Date().toDateString().substring(4)} - ${new Date().toLocaleTimeString()}` });
        setIdea({ user: '', name: '', desc: '', date: '' })
    }

    return (<>
        <Stack borderColor={'black'} sx={{ width: '100%', border: "1px solid lightgray", padding: "30px", borderRadius: "10px", display: display ? 'block' : 'none' }} spacing={5}>
            {ideasMutation.isLoading && <h1>Loading...</h1>}

            <TextField
                name="name"
                label="Title"
                variant="outlined"
                value={idea.name}
                onChange={handleChange}
                helperText={errors && "please specify your idea's title"}
                error={errors && true}
                fullWidth />

            <TextField name="desc"
                label="Description"
                variant="outlined"
                value={idea.desc}
                onChange={handleChange}
                rows={6}
                multiline
                fullWidth />

            <Stack direction={'row'}>
                <IconButton
                    sx={{ marginRight: "10px"}}
                    edge="end"
                    aria-label="delete"
                    onClick={mutate}
                >
                    <SaveIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    onClick={() => setDisplay(false)}
                >
                    <CancelIcon />
                </IconButton>
            </Stack>
        </Stack></>
    )
}