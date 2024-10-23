// app/index.tsx
import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import Column from './components/Column';
import Sidebar from './components/Sidebar';
import { ColumnData } from './types';

export default function App() {
  const columns: ColumnData[] = [
    {
      id: '1',
      title: 'Home Timeline',
      tweets: [
        {
          id: '1',
          author: 'John Doe',
          username: '@johndoe',
          content: 'Just setting up my Twitter clone!',
          timestamp: '2m',
          likes: 5,
          retweets: 2,
          replies: 1,
          avatar: 'https://via.placeholder.com/40'
        },
      ]
    },
    {
      id: '2',
      title: 'Notifications',
      tweets: [
        {
          id: '2',
          author: 'Jane Smith',
          username: '@janesmith',
          content: 'Mentioned you in a tweet',
          timestamp: '5m',
          likes: 3,
          retweets: 1,
          replies: 0,
          avatar: 'https://via.placeholder.com/40'
        }
      ]
    },
    {
      id: '3',
      title: 'Messages',
      tweets: []
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Sidebar />
        <View style={styles.columnsWrapper}>
          <ScrollView horizontal={true} style={styles.columnsContainer}>
            {columns.map((column) => (
              <Column key={column.id} data={column} />
            ))}
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