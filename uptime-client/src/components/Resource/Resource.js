import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Api } from '../../api/apiResources';

import {
  Button,
  Container,
  Paper,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function Resource() {
  const [loadingState, setLoadingState] = useState('loading');

  const params = useParams();
  const resourceId = params.id;
  const resources = useSelector(state => state.resources);
  const resource = resources.find(({ id }) => id === resourceId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchResource() {
      try {
        const api = new Api('');
        const dataResourcesList = await api.getResource(resourceId);
        const result = dataResourcesList.data;

        dispatch({ type: 'UPDATE_RESOURCE', data: result });
      } catch (err) {
        console.error('something goes wrong with fetching resource');
        console.error(err);
      }
    }

    if (loadingState !== 'loading') {
      return;
    }

    fetchResource().then(() => {
      setLoadingState('done');
    });
  }, [loadingState, resourceId, dispatch]);

  function deleteClick(id) {
    async function callDeleteResourceApi(id) {
      try {
        const api = new Api('');
        await api.deleteResource(id);

        dispatch({ type: 'DELETE_RESOURCE', data: id });
        navigate('/resources');
      } catch (err) {
        console.log('something goes wrong with deleting resource');
      }
    }

    callDeleteResourceApi(id);
  }

  function editClick(id) {
    navigate(`/resources/edit/${id}`);
  }

  return (
    <Container align='center' sx={{ mt: '1rem' }}>
      {
        loadingState === 'done' ?
          <Container align='center' sx={{ mt: '2rem' }}>
            {resource ?
              <TableContainer component={Paper} sx={{ maxWidth: '600px', mt: '1rem' }} size='small'>
                <Typography variant='h5' sx={{ marginBottom: '1em' }}>Resource dashboard</Typography>
                <Table size='small' aria-label='a dense table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='left'>Property</TableCell>
                      <TableCell align='left'>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align='left'>Resource URL</TableCell>
                      <TableCell align='left'>{resource.url}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='left'>HTTP method</TableCell>
                      <TableCell align='left'>{resource.method}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='left'>Is active</TableCell>
                      <TableCell align='left'>{resource.isActive ? 'true' : 'false'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='left'>Date created</TableCell>
                      <TableCell align='left'>{resource.createdAt}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='left'>
                        <Button size='small' variant='text' onClick={() => editClick(resource.id)}>Edit</Button>
                      </TableCell>
                      <TableCell align='left'>
                        <Button size='small' variant='text' onClick={() => deleteClick(resource.id)}>Delete</Button>
                      </TableCell>
                      <TableCell align='left'>
                        <Button size='small' variant='text' onClick={() => navigate('/resources')}>Back</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer> :
              <Card variant='outlined'>
                <Typography variant='h6'>No resource!</Typography>
              </Card>
            }
          </Container>
          :
          <Container align='center' sx={{ mt: '2rem' }}>
            Loading ...
          </Container>
      }
    </Container>
  );
};
