import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { styled } from 'styled-components';

import { currentSectorAtom } from '@src/atoms/currentSectorAtom';
import filteredSectors from '@src/functions/filteredSectors';
import { getDefaultSector } from '@src/functions/getDefaultSector';
import useRequiredQuery from '@src/hooks/useRequiredQuery';

export default function SectorList() {
  const [currentSector, setCurrentSector] = useAtom(currentSectorAtom);
  const { site } = useRequiredQuery();
  const sectors = filteredSectors({ site });

  useEffect(() => {
    if (currentSector === '') {
      const initialSector = getDefaultSector({ site });
      setCurrentSector(initialSector);
    }
  }, [site, currentSector, setCurrentSector]);

  return (
    <ListLayout>
      <p>sector:{currentSector}</p>
      <List>
        {sectors?.map(sector => (
          <ListItem key={sector} onClick={() => setCurrentSector(sector)}>
            <ListItemButton>
              <ListItemText primary={sector} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </ListLayout>
  );
}

const ListLayout = styled.div`
  display: inline-block;
  width: 100px;
`;
