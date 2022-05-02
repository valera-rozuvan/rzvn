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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Api } from '../../api/apiResources';
import { useDispatch, useSelector } from 'react-redux';

const copyResourceData = ({ id, url, method, isActive, createdAt }) => ({
  id,
  url,
  method,
  isActive,
  createdAt,
});

export default function EditResource() {
  const [loadingState, setLoadingState] = useState('loading');

  let params = useParams();
  const resourceId = params.id;
  const resources = useSelector(state => state.resources);
  const resource = resources.find(({ id }) => id === resourceId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resourceCopy, setResourceCopy] = useState({});

  useEffect(() => {
      if (!resource) {
        return;
      }

      setResourceCopy(copyResourceData(resource));
    },
    [resource],
  );

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

  const updateResource = (event) => {
    async function updateResourceApi(updatedResourceData) {
      try {
        const api = new Api('');
        const result = await api.updatedResource(resourceId, updatedResourceData);
        const updResource = result.data;

        dispatch({
          type: 'UPDATE_RESOURCE',
          data: updResource,
        });
      } catch (err) {
        console.log('ERROR');
      }
      return true;
    }

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const url = data.get('url');
    const method = data.get('method');
    const isActive = data.get('isActive') === 'on';

    updateResourceApi({ url, method, isActive }).then(() => {
      navigate(`/resources/${resourceId}`);
    });
  };

  return (
    <Container align='center' sx={{ mt: '1rem' }}>
      {loadingState === 'done' && resource ?
        <Container align='center' sx={{ mt: '2rem' }}>
          <form onSubmit={updateResource}>
            <TableContainer component={Paper} sx={{ maxWidth: '500px', mt: '1rem' }} size='small'>
              <Typography variant='h5' sx={{ marginBottom: '1em' }}>Update resource</Typography>
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
                      <Input sx={{ width: '300px' }} name='url' id='url' defaultValue={resourceCopy.url} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='left'>method:</TableCell>
                    <TableCell align='left'>
                      <Input sx={{ width: '300px' }} name='method' id='method' defaultValue={resourceCopy.method} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='left'>Is active:</TableCell>
                    <TableCell align='left'>
                      <Checkbox defaultChecked={resourceCopy.isActive} name='isActive' />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button size='small' variant='text' type='submit'>update</Button>
              <Button size='small' variant='text' onClick={() => navigate(`/resources/${resourceId}`)}>cancel</Button>
            </TableContainer>
          </form>
        </Container>
        :
        <Container align='center' sx={{ mt: '2rem' }}>
          Loading ...
        </Container>
      }

    </Container>
  );
}
