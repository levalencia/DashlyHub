// app/components/Column.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ColumnData } from '../types';

interface ColumnProps {
  data: ColumnData;
  onClose: (id: string) => void; // Add onClose prop
}

const Column: React.FC<ColumnProps> = ({ data, onClose }) => {
  return (
    <View style={styles.columnContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.title}</Text>
        <Button title="X" onPress={() => onClose(data.id)} /> {/* Close button */}
      </View>
      {/* Render tweets here */}
      {data.tweets.length === 0 ? (
        <Text style={styles.emptyMessage}>No tweets available</Text>
      ) : (
        data.tweets.map((tweet) => (
          <View key={tweet.id} style={styles.tweet}>
            <Text>{tweet.content}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    width: 300,
    marginRight: 10,
    backgroundColor: '#1DA1F2',
    padding: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tweet: {
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 5,
  },
  emptyMessage: {
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
});

export default Column;
