import { Fab, Tooltip } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { NextPage } from "next";

type Props = {
    handleCreate: any;
}


const ModalAddButton: NextPage<Props> = ({ handleCreate }) => {
    return (
        <Tooltip title="Add" onClick={handleCreate}>
            <Fab color="secondary">
                <IconPlus width={20} height={20} />
            </Fab>
        </Tooltip>
    )
}

export default ModalAddButton