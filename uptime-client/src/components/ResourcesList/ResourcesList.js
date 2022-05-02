import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Api } from '../../api/apiResources';

import Wrapper from '../Wrapper';
import WrapperNoMargin from '../WrapperNoMargin';
import Loader from '../Loader';

export default function ResourcesList() {
  const resources = useSelector(state => state.resources);
  const [loadingState, setLoadingState] = useState('loading');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingState !== 'loading') {
      return;
    }

    async function callGetResourcesApi() {
      try {
        const api = new Api('');
        const dataResourcesList = await api.getResources();
        const result = dataResourcesList.data;
        dispatch({ type: 'SET_RESOURCES', data: result });
      } catch (err) {
        console.log('something goes wrong with fetching resources');
      } finally {
        setLoadingState('done');
      }
    }

    callGetResourcesApi();
  }, [loadingState, dispatch]);

  function deleteClick(id) {
    async function callDeleteResourceApi(id) {
      try {
        const api = new Api('');
        await api.deleteResource(id);
        dispatch({ type: 'DELETE_RESOURCE', data: id });
      } catch (err) {
        console.log('something goes wrong with deleting resource');
      } finally {
        setLoadingState('loading');
      }
    }

    callDeleteResourceApi(id);
  }

  function viewClick(id) {
    navigate(`/resources/${id}`);
  }

  function editClick(id) {
    navigate(`/resources/edit/${id}`);
  }

  function createClick() {
    navigate('/resources/new');
  }

  return (
    <WrapperNoMargin>
      {loadingState === 'loading' ?
        <Loader />
        :
        <WrapperNoMargin>
          <Wrapper>
            <Button
              size='small'
              variant='outlined'
              onClick={() => createClick()}
            >
              Add new Resource
            </Button>
          </Wrapper>

          {resources.length ?
            <TableContainer component={Paper} sx={{ mt: '1rem', mb: '1rem' }}>
              <Typography variant='h5' sx={{ m: '1rem' }}>Resources</Typography>
              <Table size='small' aria-label='a dense table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>URL</TableCell>
                    <TableCell align='left'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow
                      key={resource.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='left'>
                        {resource.url}
                      </TableCell>
                      <TableCell align='left'>
                        <Button onClick={() => viewClick(resource.id)} size='small' variant='text'>view</Button>
                        <Button onClick={() => editClick(resource.id)} size='small' variant='text'>edit</Button>
                        <Button onClick={() => deleteClick(resource.id)} size='small' variant='text'>delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            :
            <Wrapper>
              <Typography variant='h6'>No resources!</Typography>
            </Wrapper>
          }
        </WrapperNoMargin>
      }
    </WrapperNoMargin>
  );
}
