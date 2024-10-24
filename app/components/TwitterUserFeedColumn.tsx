import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Hardcoded tweet data, representing a Twitter feed of an influencer in deep learning.
const tweets = [
  {
    id: '1',
    author: 'Sebastian Raschka',
    username: '@rasbt',
    content: 'The Llama 3.2 1B and 3B models are my favorite LLMs — small but very capable.',
    image: require('../../assets/images/sebastian1.jpeg'), // Use an image from your assets folder for visuals
    timestamp: 'Oct 5',
    likes: 3100,
    retweets: 578,
    comments: 26,
  },
  {
    id: '2',
    author: 'Sebastian Raschka',
    username: '@rasbt',
    content: '"What Matters In Transformers?" is an interesting paper...',
    image: require('../../assets/images/sebastian2.jpeg'),
    timestamp: 'Oct 22',
    likes: 2900,
    retweets: 544,
    comments: 70,
  },
];
// Get device screen width to calculate appropriate column size
const screenWidth = Dimensions.get('window').width;
const columnWidth = screenWidth * 0.2; // Set column width to 90% of the screen width

const TwitterUserFeedColumn = () => {
  const [feedData, setFeedData] = useState(tweets);

  const handleLike = (tweetId: string) => {
    const updatedFeed = feedData.map((tweet) => {
      if (tweet.id === tweetId) {
        return { ...tweet, likes: tweet.likes + 1 }; // Increment likes
      }
      return tweet;
    });
    setFeedData(updatedFeed);
  };

  const handleRetweet = (tweetId: string) => {
    const updatedFeed = feedData.map((tweet) => {
      if (tweet.id === tweetId) {
        return { ...tweet, retweets: tweet.retweets + 1 }; // Increment retweets
      }
      return tweet;
    });
    setFeedData(updatedFeed);
  };

  const handleComment = (tweetId: string) => {
    const updatedFeed = feedData.map((tweet) => {
      if (tweet.id === tweetId) {
        return { ...tweet, comments: tweet.comments + 1 }; // Increment comments
      }
      return tweet;
    });
    setFeedData(updatedFeed);
  };

  const renderTweet = ({ item }: { item: any }) => {
    return (
      <View style={[styles.tweetCard, { width: columnWidth }]}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
          <View style={styles.tweetInfo}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.username}>{item.username}</Text>
          </View>
        </View>
        <Text style={styles.content}>{item.content}</Text>
        {item.image && (
          <Image
            source={item.image}
            style={[styles.tweetImage, { width: '100%', height: undefined, aspectRatio: 16 / 9 }]} // Aspect ratio 16:9
            resizeMode="cover"
          />
        )}
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleComment(item.id)} style={styles.actionButton}>
            <Feather name="message-circle" size={20} color="#8899A6" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRetweet(item.id)} style={styles.actionButton}>
            <Feather name="repeat" size={20} color="#8899A6" />
            <Text style={styles.actionText}>{item.retweets}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionButton}>
            <Feather name="heart" size={20} color="#E0245E" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="share" size={20} color="#8899A6" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={feedData}
      renderItem={renderTweet}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.feedContainer}
    />
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    paddingHorizontal: 10,
  },
  tweetCard: {
    backgroundColor: '#192734',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center', // Center the tweet card within the container
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tweetInfo: {
    marginLeft: 10,
  },
  author: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  username: {
    color: '#8899A6',
  },
  content: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  tweetImage: {
    borderRadius: 10,
    marginBottom: 10,
  },
  timestamp: {
    color: '#8899A6',
    fontSize: 12,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default TwitterUserFeedColumn;