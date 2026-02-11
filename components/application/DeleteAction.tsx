import { ListItemIcon, MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteActionProps = {
    handleDelete: (ids: string[], deleteType: string) => void;
    row: { original: { _id: string;[key: string]: any } };
    deleteType: string;
};

const DeleteAction: React.FC<DeleteActionProps> = ({ handleDelete, row, deleteType }) => {
    return (
        <MenuItem key='delete' onClick={() => handleDelete([row.original._id], deleteType)}>
            <ListItemIcon>
                <DeleteIcon />
                Delete
            </ListItemIcon>
        </MenuItem>
    )
}

export default DeleteAction