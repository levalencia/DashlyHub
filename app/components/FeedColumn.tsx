import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedColumn: React.FC<{ feed: { id: number; type: string } }> = ({ feed }) => {
  return (
    <View style={styles.column}>
      <Text style={styles.feedType}>{feed.type}</Text>
      {/* Render feed details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  feedType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedColumn;
