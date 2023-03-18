import { Stack, TextField } from "@mui/material";

export const Form = (props) => {
    return (
        <form>
            <Stack direction="column" alignItems="center" justifyContent="center" p="5px" mt="40px">
                <Stack direction="column" spacing="20px" width="50%">
                    <TextField id="outlined-basic" label="Nom et prénom" variant="outlined" onChange={(e) => props.setState((oldState) => ({ ...oldState, username: e.target.value }))} />
                    <Stack direction="row" alignItems="center" spacing="5px" width="100%">
                        <TextField id="outlined-basic" label="Ville" variant="outlined" onChange={(e) => props.setState((oldState) => ({ ...oldState, ville: e.target.value }))} fullWidth />
                        <TextField id="outlined-basic" label="Address" variant="outlined" onChange={(e) => props.setState((oldState) => ({ ...oldState, address: e.target.value }))} fullWidth />
                    </Stack>
                    <TextField id="outlined-basic" label="Phone" variant="outlined" onChange={(e) => props.setState((oldState) => ({ ...oldState, phone: e.target.value }))} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => props.setState((oldState) => ({ ...oldState, email: e.target.value }))} />
                </Stack>
            </Stack>
        </form>

    )
}