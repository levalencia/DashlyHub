// app/components/Column.tsx
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ColumnData } from '../types';
import TweetCard from './TweetCard';

interface ColumnProps {
  data: ColumnData;
}

const Column: React.FC<ColumnProps> = ({ data }) => {
  return (
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{data.title}</Text>
      </View>
      <ScrollView style={styles.tweetList}>
        {data.tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    width: 300,
    backgroundColor: '#192734',
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    height: '100%',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#38444D',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tweetList: {
    flex: 1,
  },
});

export default Column;