import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import Sidebar from './components/Sidebar';
import TwitterUserFeedColumn from './components/TwitterUserFeedColumn';
import TwitterHashtagFeedColumn from './components/TwitterHashtagFeedColumn';
import LinkedInUserFeedColumn from './components/LinkedInUserFeedColumn';
import LinkedInHashtagFeedColumn from './components/LinkedInHashtagFeedColumn';

export default function App() {
  const [columns, setColumns] = useState<Array<{ id: string; type: string }>>([]);

  // Function to add a column based on the selected feed type
  const addColumn = (feedType: string) => {
    const newColumn = {
      id: `${Date.now()}`, // unique ID for each column
      type: feedType, // the type of the feed column (e.g., 'twitterUser', 'linkedinHashtag')
    };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  const renderColumn = (column: { id: string; type: string }) => {
    switch (column.type) {
      case 'twitterUser':
        return <TwitterUserFeedColumn key={column.id} onClose={() => removeColumn(column.id)} />;
      case 'twitterHashtag':
        return <TwitterHashtagFeedColumn key={column.id} onClose={() => removeColumn(column.id)} />;
      case 'linkedinUser':
        return <LinkedInUserFeedColumn key={column.id} onClose={() => removeColumn(column.id)} />;
      case 'linkedinHashtag':
        return <LinkedInHashtagFeedColumn key={column.id} onClose={() => removeColumn(column.id)} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Sidebar onAddColumn={addColumn} />
        <View style={styles.columnsWrapper}>
          <ScrollView horizontal={true} style={styles.columnsContainer}>
            {columns.map((column) => renderColumn(column))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  columnsWrapper: {
    flex: 1,
  },
  columnsContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
