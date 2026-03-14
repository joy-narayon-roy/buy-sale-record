import { Box, Tab, Tabs } from '@mui/material';
import { Link, useLocation, } from 'react-router-dom';

type PageNavProps = {
    paths: {
        path: string,
        lable: string
    }[]
}
export default function PageNav(props: PageNavProps) {
    const { paths = [] } = props
    const location = useLocation();
    const current =
        paths.find((p) => location.pathname.includes(p.path))?.lable.toLowerCase() ||
        false;

    return (
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs value={current}>
                {paths.map(p => <Tab
                    key={p.path}
                    label={p.lable}
                    value={p.lable.toLowerCase()}
                    component={Link}
                    to={p.path}
                />)}
            </Tabs>
        </Box>
    );

}
