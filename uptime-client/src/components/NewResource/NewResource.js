import {
  Input,
  Checkbox,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api/apiResources';
import { useDispatch } from 'react-redux';


export default function NewResource() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create Resource
  function createResource(event) {
    async function createResourceApi(data) {
      let newResource;

      try {
        const api = new Api('');
        const response = await api.createResource(data);
        newResource = response.data;

        dispatch({ type: 'CREATE_RESOURCE', data: newResource });
      } catch (err) {
        console.error('error while creating the resource');
        console.error(err);

        return;
      }

      return newResource;
    }

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const url = data.get('url');
    const method = data.get('method');
    const isActive = data.get('isActive') === 'on';

    createResourceApi({ url, method, isActive }).then((newResource) => {
      if (!newResource) {
        return;
      }

      navigate(`/resources/${newResource.id}`);
    });
  }

  return (
    <Container align='center' sx={{ mt: '1rem' }}>
      <Container align='center' sx={{ mt: '2rem' }}>
        <form onSubmit={createResource}>
          <TableContainer component={Paper} sx={{ maxWidth: '500px', mt: '1rem' }} size='small'>
            <Typography variant='h5' sx={{ marginBottom: '1em' }}>Create resource</Typography>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Property</TableCell>
                  <TableCell align='left'>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='left'>url of resource:</TableCell>
                  <TableCell align='left'>
                    <Input sx={{ width: '300px' }} name='url' id='url' />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>method:</TableCell>
                  <TableCell align='left'>
                    <Input sx={{ width: '300px' }} name='method' id='method' />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>Is active:</TableCell>
                  <TableCell align='left'>
                    <Checkbox name='isActive' />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button size='small' variant='text' type='submit'>Create</Button>
            <Button size='small' variant='text' onClick={() => navigate('/resources')}>Cancel</Button>
          </TableContainer>
        </form>
      </Container>
    </Container>
  );
}
