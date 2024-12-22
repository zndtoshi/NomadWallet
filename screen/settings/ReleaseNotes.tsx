import React from 'react';
import { ScrollView } from 'react-native';

import { NomadCard, NomadText } from '../../NomadComponents';

const ReleaseNotes: React.FC = () => {
  const notes = require('../../release-notes');

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
      <NomadCard>
        <NomadText>{notes}</NomadText>
      </NomadCard>
    </ScrollView>
  );
};

export default ReleaseNotes;
