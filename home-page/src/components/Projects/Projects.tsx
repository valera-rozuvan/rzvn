import React from 'react';
// import { Link } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';

import { useNavigate } from 'react-router-dom';

interface EnumProject {
  key: string;
  title: string;
  link: any
}

const projects: EnumProject[] = [
  {
    key: '1',
    title: 'uptime',
    link: '/uptime',
  },
  {
    key: '2',
    title: 'pgm',
    link: '/pgm',
  },
  {
    key: '3',
    title: 'qadmin',
    link: '/qadmin',
  },
  {
    key: '4',
    title: 'qauth',
    link: '/qauth',
  },
];

function Projects() {
  const navigate = useNavigate();

  function handleClickProject(link: string): void {
    navigate(link);
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {projects.map((project) => (
            <ListItem
              key={project.key}
              disablePadding
              onClick={() => handleClickProject(project.link)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DoubleArrowOutlinedIcon />
                </ListItemIcon>
                <ListItemText>{project.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default Projects;
