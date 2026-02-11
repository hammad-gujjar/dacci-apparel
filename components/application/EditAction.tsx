import { ListItemIcon, MenuItem } from '@mui/material'
import Link from 'next/link'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

type EditActionProps = {
    href: string;
};

const EditAction: React.FC<EditActionProps> = ({ href }) => {
    return (
        <MenuItem key='edit'>
            <Link href={href}>
                <ListItemIcon>
                    <ModeEditOutlineIcon />
                </ListItemIcon>
                Edit
            </Link>
        </MenuItem>
    );
}

export default EditAction