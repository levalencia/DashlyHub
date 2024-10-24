// components/TwitterUserFeedColumn.tsx
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const TwitterUserFeedColumn = ({ onClose }: { onClose: () => void }) => {
  return (
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Twitter User Feed</Text>
        <Button title="Close" onPress={onClose} />
      </View>
      {/* Add any Twitter User Feed-specific content */}
      <Text>Twitter User Feed Content...</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TwitterUserFeedColumn;
