// app/components/TweetCard.tsx
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Tweet } from '../types';
import { Feather } from '@expo/vector-icons';

interface TweetCardProps {
  tweet: Tweet;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  return (
    <View style={styles.tweetCard}>
      <Image source={{ uri: tweet.avatar }} style={styles.avatar} />
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeader}>
          <Text style={styles.authorName}>{tweet.author}</Text>
          <Text style={styles.username}>{tweet.username}</Text>
          <Text style={styles.timestamp}>{tweet.timestamp}</Text>
        </View>
        <Text style={styles.tweetText}>{tweet.content}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={16} color="#8899A6" />
            <Text style={styles.actionText}>{tweet.replies}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="repeat" size={16} color="#8899A6" />
            <Text style={styles.actionText}>{tweet.retweets}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="heart" size={16} color="#8899A6" />
            <Text style={styles.actionText}>{tweet.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tweetCard: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#38444D',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  tweetContent: {
    flex: 1,
  },
  tweetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  authorName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 5,
  },
  username: {
    color: '#8899A6',
    marginRight: 5,
  },
  timestamp: {
    color: '#8899A6',
  },
  tweetText: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 200,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#8899A6',
    marginLeft: 5,
  },
});

export default TweetCard;